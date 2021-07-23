const app = require('./config/express')();
const port = app.get('port');

// RUNNING APPLICATION ON THE CONFIGURED PORT
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`)
});