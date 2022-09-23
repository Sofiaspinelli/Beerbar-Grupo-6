const {check, body} = require('express-validator');

module.exports = [
    body('selectType').trim().notEmpty().withMessage('Debe selecionar una opcion'),
    
    body('marca').trim().notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min:5}).withMessage('Minimo de 6 caracteres'),
   
    body('descripcion').trim().notEmpty().withMessage('Ingrese una brebe descripcion del producto').bail()
    .isLength({min:12}).withMessage('La descipcion es muy corta'),
    
    // body('img').trim().notEmpty().withMessage('Ingrese una imagen del producto'),

    body('precio').trim().notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan numeros'),

    body('descuento').isInt().withMessage('Solo se aceptan numeros'),

    body('stock').trim().notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan numeros')
]