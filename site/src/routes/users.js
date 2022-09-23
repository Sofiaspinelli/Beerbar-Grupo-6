const express = require('express');
const {login,register, processLogin, processRegister, logout, user, editar, editUser} =require ('../controllers/usersController');
const router = express.Router();
const { Router } = require('express');

const registerValidacion = require('../validaciones/registerValidacion');
const loginValidacion = require('../validaciones/loginValidacion')
const upload = require('../middlewares/multerUser')

/* GET users listing. */
router.get('/login', login);
router.post('/user', loginValidacion, processLogin)

router.get('/register', register);
router.post('/register',upload.single('image'), processRegister, registerValidacion)

router.get('/user', function(req,res){
    if(req.cesion.userLogin == undefined){
        res.send('Su usuario no está registrado')
    } 
    else{ res.send('user:' + req.cesion.userLogin)}
})

router.get('profile',userLogin, user);
router.delete('/user', logout);

router.get('/editarUser/:id',editUser);
router.put('/editarUser/:id',upload.single('image',editar));


module.exports = router;
