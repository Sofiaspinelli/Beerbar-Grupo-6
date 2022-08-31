const express = require('express');
const {login, user, register, register2} =require ('../controllers/usersController');
const router = express.Router();


/* GET users listing. */
router.get('/login', login);
router.get('/user', user)
router.get('/register', register);
router.post('/register', register2)

module.exports = router;
