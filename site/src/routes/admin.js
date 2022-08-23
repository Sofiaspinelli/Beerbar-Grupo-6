
const {list, crear, newProducts,editar, update, destroy} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/list', list);

// get/post crear
router.get('/crear', crear);
router.post('/crear', newProducts);

// get/put editar
router.get('/editar/:id', editar);
router.put('/editar/:id', update);

// delete
router.delete('/eliminar/:id', destroy)

module.exports = router;


