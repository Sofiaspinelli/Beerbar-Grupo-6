const express = require('express');
const router = express.Router();

const {usuarios, usuarioPorId} = require('../../controllers/api/apiController')

// rutas
router.get('/users', usuarios);
router.get('/users/:id', usuarioPorId);


module.exports = router;