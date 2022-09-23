const {check, body} = require('express-validator');

const usuarios = require('../data/users.json');
const bcryptjs = require('bcryptjs');
const { user } = require('../controllers/usersController');
module.exports=[
    check('email').trim().notEmpty().withMessage('Ingrese un gmail existente').bail().isEmail(),
    check('pass').trim().notEmpty().withMessage('Ingrese su contraseña').bail().isLength({min:6}),

    body('email','pass')
    .custom((value,{req}) => {
        let usuario = usuarios.find(user=> user.email === value&& bcryptjs.compareSync(req.body.password, user.password))

        if (usuario) {
            return true
        }
        else {
            return false
        }
    }) 
    .withMessage('El gmail y/o la contraseña ingresados son incorrectos')
]