'use strict';

const AWS = require('aws-sdk');

const { PLANET_TABLE, IS_OFFLINE } = process.env

const dynamoDb =
  IS_OFFLINE === 'true'
    ? new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      })
    : new AWS.DynamoDB.DocumentClient()

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: PLANET_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'El planeta no existe',
      });
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};