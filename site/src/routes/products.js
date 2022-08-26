const {products,cart,detailB, detailC} = require ('../controllers/productsController');
const express = require ('express');
const router = express.Router();

/* GET products page. */
router.get('/', products);
router.get('/birra/:id', detailB);
router.get('/comida/:id', detailC);
router.get('/cart', cart);

module.exports = router;