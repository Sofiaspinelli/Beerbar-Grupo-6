const express = require('express');
const router = express.Router();
const {login, register, register2,login2} =require ('../controllers/usersController');

/* GET users listing. */
router.get('/login', login);
router.get('/register', register);

router.post('/login', login2);
router.post('/register', register2)

module.exports = router;
