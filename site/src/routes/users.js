const express = require('express');
const {login,processLogin, user, register, processRegister} =require ('../controllers/usersController');
const router = express.Router();

const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const upload = require('../middlewares/multerUsuarios')

/* GET users listing. */
router.get('/register',registerValidator, register);
router.post('/register',upload.single('image'),registerValidator, processRegister)

router.get('/login', login);
router.post('/login',loginValidator, processLogin)

router.get('/user', user)



module.exports = router;
