'use strict';

const axios = require('axios');

module.exports.get = (event, context, callback) => {

  axios.get("https://swapi.dev/api/planets/" + event.pathParameters.id)
    .then(response => {
      console.log(response.data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          nombre: response.data.name,
          periodo_rotacion: response.data.rotation_period,
          periodo_orbital: response.data.orbital_period,
          diametro: response.data.diameter,
          clima: response.data.climate,
          gravedad: response.data.gravity,
          terreno: response.data.terrain,
          superficie_Agua: response.data.surface_water,
          poblacion: response.data.population,
          residentes: response.data.residents,
          peliculas: response.data.films,
          creado: response.data.created,
          editado: response.data.edited,
          url: response.data.url,
        }),
      })
    })
    .catch(error => {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'El planeta no existe',
      })
    });
};