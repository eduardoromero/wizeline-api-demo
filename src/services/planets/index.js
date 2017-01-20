'use strict';

const service = require('feathers-rethinkdb');
const planets = require('./planets-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: planets,
    name: 'planets',
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/planets', service(options));

  // Get our initialize service to that we can bind hooks
  const planetsService = app.service('/planets');

  // Set up our before hooks
  planetsService.before(hooks.before);

  // Set up our after hooks
  planetsService.after(hooks.after);
};
