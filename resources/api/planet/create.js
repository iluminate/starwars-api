'use strict';

const uuid = require('node-uuid')
const AWS = require('aws-sdk');

const { PLANET_TABLE, IS_OFFLINE } = process.env

const dynamoDb =
  IS_OFFLINE === 'true'
    ? new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000',
      })
    : new AWS.DynamoDB.DocumentClient()

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: PLANET_TABLE,
    Item: {
      id: uuid.v4(),
      nombre: data.nombre,
      periodo_rotacion: data.periodo_rotacion,
      periodo_orbital: data.periodo_orbital,
      diametro: data.diametro,
      clima: data.clima,
      gravedad: data.gravedad,
      terreno: data.terreno,
      superficie_agua: data.superficie_agua,
      poblacion: data.poblacion,
      residentes: data.residentes,
      peliculas: data.pelicula,
      creado: data.creado,
      editado: data.editado,
      url: data.url,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDb.put(params, (error) => {
    console.log(params);
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'No se a podido crear el planeta',
      });
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
