const express = require ('express');
const router = express.Router();
const {products, cart} = require ('../controllers/productsController')

router.get ('/productos', products)
router.get ('/carrito', cart)

module.exports = router;