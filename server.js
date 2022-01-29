const express = require('express');
const app = express();
const Routes = require('./routes');
const producto = require('./services/Producto.service');
const port = 8080;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.get('/', function (req, res) {
  res.send('hello world');
});
app.use('/api', Routes);

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto:${port}`);
});
