const {check,body} = require('express-validator')

module.exports = [
    /* Nombre */
    check('name').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

        /* Nombre de usuario */
        check('name').trim()
        .notEmpty().withMessage('Debe ingresar su nombre de @usuario').bail()
        .isLength({min:2}).withMessage('Debe contener al menos 2 caracteres'),

    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('pass')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
    check('pass2')
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres').bail(),

    /*Contacto*/
    check('contacto')
    .notEmpty().withMessage('Debe ingresar su numero de contacto'),
    
    /* Genero */
    check('genero')
    .notEmpty().withMessage('Debe ingresar su Genero'),

    /* terminos */
    check('terminos')
    .notEmpty().withMessage('Debe Aceptar nuestros terminos y condiciones'),

    body('pass2')
    .custom((value,{req}) => value !== req.body.pass ? false : true)
    .withMessage('Las contraseñas no coinciden')
]
