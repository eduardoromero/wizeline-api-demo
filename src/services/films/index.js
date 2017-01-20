'use strict';

const service = require('feathers-rethinkdb');
const films = require('./films-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: films,
    name: 'films',
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/films', service(options));

  // Get our initialize service to that we can bind hooks
  const filmsService = app.service('/films');

  // Set up our before hooks
  filmsService.before(hooks.before);

  // Set up our after hooks
  filmsService.after(hooks.after);
};
