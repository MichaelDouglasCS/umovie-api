const bodyParser = require('body-parser');
const config = require('config');
const consign = require('consign');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

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
  consign({ cwd: 'api' })
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};