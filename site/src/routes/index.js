const {home, search, empresa,contacto} = require ('../controllers/indexController')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', home);
router.get('/busqueda', search);
router.get('/empresa', empresa)
router.get('/contacto', contacto)
module.exports = router;
