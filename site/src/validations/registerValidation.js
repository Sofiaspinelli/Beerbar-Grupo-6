const {check,body} = require('express-validator')
const validator = require('validator')
const db = require('../database/models')

module.exports = [
    /* Nombre */
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:3}).withMessage('Debe contener al menos 3 caracteres').bail()
    .isAlpha().withMessage('Solo se permiten letras'),

    /* apellido */
    check('apellido').trim()
    .notEmpty().withMessage('Debe ingresar su apellido').bail()
    .isLength({min:5}).withMessage('Debe contener al menos 5 caracteres').bail()
    .isAlpha().withMessage('Solo se permiten letras'),

    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido').bail()
    .custom((value) => {
        return db.users.findAll()
        .then(user => {
            // return console.log(user[0].dataValues.email);
            for (let i = 0; i < user.length; i++) {
                const element = user[i].dataValues;
            //    console.log(element)
               if (element.email === value) {
                console.log(element)
                return Promise.reject()
               }

            }
            
        })
        .catch(() => {
            return Promise.reject('EL email ingresado ya esta en uso')
        })
    })/* .withMessage('nope') */,

    /* Contraseña */
    check('pass').trim()
    .isLength({min:6}).withMessage('Debe contener al menos 6 caracteres').bail()
    .isAlphanumeric().withMessage('Su contraseña debe contener letras y numeros'),
    // .custom((value) => validator.isStrongPassword(value,[{minLowercase: 1, minUppercase: 1, minNumbers: 1}])? true : false).withMessage('debe contener una mayuscula, una minuscula y un numero'),
    /* re-pass */
    check('pass2')
    .isLength({min:6}).withMessage('Debe contener al menos 6 caracteres').bail()
    .isAlphanumeric().withMessage('Su contraseña debe contener letras y numeros').bail()
    .custom((value,{req}) => value !== req.body.pass ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    /*Contacto*/
    check('contacto').trim()
    .notEmpty().withMessage('Debe ingresar su nro').bail()
    .isInt().withMessage('Debe ingresar un numero valido').bail()
    .isLength({min:10, max: 15}).withMessage('Debe ingresar un numero valido'),
    
    /* Genero */
    check('genero').trim()
    .notEmpty().withMessage('Debe ingresar su Genero'),

    /* terminos */
    check('terminos').trim()
    .notEmpty().withMessage('Debe Aceptar nuestros terminos y condiciones'),
    
]
