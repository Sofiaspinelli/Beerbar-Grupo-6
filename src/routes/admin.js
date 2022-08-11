const {crear, newProducts} = require('../controllers/adminController');
const express = require('express');
const router = express.Router();

// rutas crear
router.get('/crear', crear);
router.post('/crear', newProducts);

module.exports = router
