const {list} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/list', list);

module.exports = router 