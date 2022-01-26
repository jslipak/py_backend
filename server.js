const express = require('express');
const app = express();
const producto = require('./services/Producto');
console.log(producto.file);
const port = 8080;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', function (req, res) {
  console.log('aca esta producto: ', producto.data);
  typeof producto;
  res.send('hello world');
});
app.get('/productos', producto.getAll);
app.get('/productos/:id', (req, res) => {
  res.json({ data: 134 });
});
app.post('/productos', producto.create);

const server = app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto:${port}`);
});
