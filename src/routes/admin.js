
const {list, crear, newProducts,editar} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/list', list);

// get crear
router.get('/crear', crear);
router.post('/crear', newProducts);
router.get('/editar/:id', editar)
module.exports = router


