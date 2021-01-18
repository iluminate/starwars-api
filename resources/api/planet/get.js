'use strict';

const https = require('https');

module.exports.get = async (event, context, callback) => {

  let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
      console.log(event.pathParameters.id);
        const req = https.get("https://swapi.dev/api/planets/" + event.pathParameters.id, function(res) {
          res.on('data', chunk => {
            dataString += chunk;
            console.log(chunk);
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: dataString
            });
          });
        });
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    console.log(response);
    callback(null, {
      statusCode: response.statusCode,
      headers: { 'Content-Type': 'text/plain' },
      body: response.body,
    });
};