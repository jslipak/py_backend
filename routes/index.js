const { Router } = require('express');
const route = Router();
const productRouter = require('./products.routes');
route.use('/productos', productRouter);
//route.get('/', function (req, res) {
//res.send('Api Version 1');
//});

module.exports = route;
