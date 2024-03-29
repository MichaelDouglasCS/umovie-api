const app = require('./config/express')();
const config = require('config');
const mongoose = require('mongoose');
const port = app.get('port');
const server = require('express')();

const passport = require('passport');
require('./config/passport')(passport);

// MONGODB CONNECTION
const databaseURI = process.env.MONGODB_URI || config.get('database.uri');

const mongodbOptions = { 
  useUnifiedTopology: true,
  useNewUrlParser: true 
};

mongoose.connect(databaseURI, mongodbOptions).then(
  () => { console.log('✅ MongoDB Connected Successfully!') },
  err => { console.log(`❌ MongoDB Failed to Connect Error ${err}`) }
)

// SERVER LISTENING ON CONFIGURED PORT
server.use('/v1', app).listen(port, () => {
  console.log(`🚀 Server is Listening on Port ${port}`)
});