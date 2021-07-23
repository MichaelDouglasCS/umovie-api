const server = require('express')();
const app = require('./config/express')();
const port = app.get('port');
const baseURL = '/v1'

server.use(baseURL, app).listen(port, () => {
  console.log(`Server is Listening on Port ${port}`)
});