const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const consign = require('consign');

module.exports = () => {
  const app = express();

  // SET APPLICATION VARIABLES
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('combined'));

  // ENDPOINTS
  consign({cwd: 'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};