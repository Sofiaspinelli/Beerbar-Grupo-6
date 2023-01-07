const express = require('express');
const router = express.Router();

const {usuarios, usuarioPorId, productos, productosPorId, login, usuariosPag, crearProducto, editarProducto, eliminarProducto} = require('../../controllers/api/apiController')
const {paginacion} = require('../../controllers/api/paginacion');
const {listaCarrito, addItem, modifyItem, removeItem, empty, addItemcount} = require('../../controllers/api/carrito');

// rutas
router.get('/users', usuarios);
router.get('/users/paginado', usuariosPag);
router.get('/users/:id', usuarioPorId);
router.get('/users/login/:id', login);


/* productos */
router.get('/productos', /* productos */ paginacion);
router.get('/producto/:id', productosPorId);
router.post('/crear', crearProducto);
router.put('/editar/:id', editarProducto);
router.delete('/eliminar/:id', eliminarProducto);

/* suma, resta de cantidad de producto */
router.post('/contador/:id/:nro', addItemcount);
// router.get('/resta/:id/:nro', );

/* carrito de compra */
router.get('/carrito', listaCarrito);
router.post('/carrito/:id', addItem);
router.delete('/carrito/item/:id', modifyItem);
router.delete('/carrito/:id', removeItem);
router.delete('/carrito/empty', empty);


module.exports = router;