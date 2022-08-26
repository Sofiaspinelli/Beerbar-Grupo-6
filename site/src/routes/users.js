const express = require('express');
const {login, register, register2,login2} =require ('../controllers/usersController');
const router = express.Router();
/* GET users listing. */
router.get('/login', login);


router.get('/register', register);
router.post('/register', register2)

module.exports = router;
