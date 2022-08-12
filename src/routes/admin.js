const express= require('express');
const router = express.Router()

let {crear, editar} = require('../controllers/adminController')

router.get('/crear', crear );
router.get('/editar', editar)

module.exports = router