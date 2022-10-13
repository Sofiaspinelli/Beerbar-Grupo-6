const {check,body} = require('express-validator')

module.exports = [
    /* Nombre */
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

        /* Nombre de usuario */
        check('apellido').trim()
        .notEmpty().withMessage('Debe ingresar su apellido').bail()
        .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('pass').trim()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
    check('pass2')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

    /*Contacto*/
    check('contacto').trim()
    .isInt().withMessage('Debe ingresar un numero valido').bail()
    .isLength({min:10, max: 10}).withMessage('Debe ingresar un numero valido'),
    
    /* Genero */
    check('genero').trim()
    .notEmpty().withMessage('Debe ingresar su Genero'),

    /* terminos */
    check('terminos').trim()
    .notEmpty().withMessage('Debe Aceptar nuestros terminos y condiciones'),

    body('pass2').trim()
    .custom((value,{req}) => value !== req.body.pass ? false : true)
    .withMessage('Las contraseñas no coinciden')
]
