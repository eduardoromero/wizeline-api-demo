'use strict';
const films = require('./films');
const planets = require('./planets');
const people = require('./people');
const vehicles = require('./vehicles');
const starships = require('./starships');
const catches = require('./catch');

const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(films);
  app.configure(planets);
  app.configure(people);
  app.configure(vehicles);
  app.configure(starships);
  app.configure(catches);
};
