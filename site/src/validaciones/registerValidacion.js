const { check, body } = require('express-validator');
const fs = require('fs');
const path = require('path')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(dato,null,4),'utf-8')

module.exports = [
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:3}).withMessage('Debe contener un minimo de 3 caracteres'),

    check('user').trim()
    .notEmpty().withMessage('Debe ingresar un usuario').bail()
    .isLength({min:3}).withMessage('Debe contener un minimo de 3 caracteres'),

    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    check('pass')
    .isLength({min:6}).withMessage('Debe contener un minimo de 6 caracteres'),
    check('pass2')
    .isLength({min:6}).withMessage('Debe contener un minimo de 6 caracteres').bail(),

    body('pass2')
    .custom((value,{req}) => value !== req.body.pass ? false:true)
    .withMessage('Las contraseñas no coinciden')

    
]