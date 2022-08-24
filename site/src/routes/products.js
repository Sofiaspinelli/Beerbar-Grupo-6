const {products,cart,detail} = require ('../controllers/productsController');
const express = require ('express');
const router = express.Router();

/* GET products page. */
router.get('/', products);
router.get('/:detail/:id', detail);
router.get('/cart', cart);

module.exports = router;