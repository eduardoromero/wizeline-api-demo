require('dotenv').config();

const fs = require('fs');
const cert = __dirname + '/cert';

let config = {
  db: process.env.DB_NAME || 'starwars',
  servers: [
    { host: process.env.RETHINK_SERVER, port: process.env.RETHINK_PORT },
  ],
  discovery: false,
  buffer: 5,
  max: 100,
  timeoutError: 50,
};

/* check for AUTH and SSL CERT */
if (process.env.RETHINK_AUTH && process.env.RETHINK_AUTH.trim().length && certExists()) {
  config.username = process.env.RETHINK_USERNAME || 'admin';
  config.authKey  = process.env.RETHINK_AUTH;
  config.ssl      = {
    rejectUnauthorized: true,
    ca: [fs.readFileSync(cert).toString().trim()]
  };

  config.timeout  = 5000;
}


function certExists() {
  "use strict";
  try {
    fs.accessSync(cert, fs.constants.R_OK); // checking that `cert` can be READ.

    return true;
  } catch (e) {
    return false;
  }
}

let r = require('rethinkdbdash')(config);
module.exports = r;
