const { Router } = require('express');
const route = Router();
const producto = require('../services/Producto.service');

route.get('/', producto.getAll);
route.get('/:id', producto.getById);
route.post('/', producto.create);
route.delete('/:id', producto.deleteByID);
route.put('/:id', producto.updadeById);
module.exports = route;
