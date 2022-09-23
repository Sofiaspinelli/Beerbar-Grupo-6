const express = require('express');
const {login,register, processLogin, processRegister, logout, user, editar, editUser} =require ('../controllers/usersController');
const router = express.Router();
const { Router } = require('express');

const registerValidator = require('../validations/registerValidation')
const loginValidator = require('../validations/loginValidation')
const upload = require('../middlewares/multerUsuarios')

/* GET users listing. */
router.get('/register',registerValidator, register);
router.post('/register',upload.single('image'),registerValidator, processRegister)

router.get('/login', login);
router.post('/user', loginValidator, processLogin)

router.get('/register', register);
router.post('/register',upload.single('image'), processRegister, registerValidator)

router.get('/user', function(req,res){
    if(req.session.userLogin == undefined){
        res.send('Su usuario no está registrado')
    } 
    else{ res.send('user:' + req.session.userLogin)}
})

router.get('/user',userLogin, user);
router.delete('/user', logout);

router.get('/editarUser/:id',editUser);
router.put('/editarUser/:id',upload.single('image',editar));
router.post('/login',loginValidator, processLogin)

router.get('/user', user)



module.exports = router;
