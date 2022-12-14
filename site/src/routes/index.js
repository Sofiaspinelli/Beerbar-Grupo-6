const {home, search, contacto} = require ('../controllers/indexController')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', home);
router.get('/busqueda', search);
/* router.get('/contacto', contacto); */
module.exports = router;
