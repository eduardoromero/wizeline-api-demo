'use strict';

const service = require('feathers-rethinkdb');
const starships = require('./starships-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    Model: starships,
    name: 'starships',
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/starships', service(options));

  // Get our initialize service to that we can bind hooks
  const starshipsService = app.service('/starships');

  // Set up our before hooks
  starshipsService.before(hooks.before);

  // Set up our after hooks
  starshipsService.after(hooks.after);
};
