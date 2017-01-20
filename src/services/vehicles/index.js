'use strict';

const service = require('feathers-rethinkdb');
const vehicles = require('./vehicles-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: vehicles,
    name: 'vehicles',
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/vehicles', service(options));

  // Get our initialize service to that we can bind hooks
  const vehiclesService = app.service('/vehicles');

  // Set up our before hooks
  vehiclesService.before(hooks.before);

  // Set up our after hooks
  vehiclesService.after(hooks.after);
};
