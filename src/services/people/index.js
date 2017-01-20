'use strict';

const service = require('feathers-rethinkdb');
const people = require('./people-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: people,
    name: 'people',
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/people', service(options));

  // Get our initialize service to that we can bind hooks
  const peopleService = app.service('/people');

  // Set up our before hooks
  peopleService.before(hooks.before);

  // Set up our after hooks
  peopleService.after(hooks.after);
};
