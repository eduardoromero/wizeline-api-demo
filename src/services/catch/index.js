'use strict';

const service = require('feathers-memory');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    name: 'catch',
    paginate: {
      default: 10,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/catch', service(options));

  // Get our initialize service to that we can bind hooks
  const catchService = app.service('/catch');

  // Set up our before hooks
  catchService.before(hooks.before);

  // Set up our after hooks
  catchService.after(hooks.after);
};
