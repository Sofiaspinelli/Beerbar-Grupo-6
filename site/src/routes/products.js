const {products,cart,detail} = require ('../controllers/productsController');
const express = require ('express');
const router = express.Router();
const middleUser = require('../middlewares/middleUser');

/* GET products page. */
router.get('/', products);
router.get('/detail/:id', detail);
router.get('/cart', /* middleUser, */ cart);

module.exports = router;
