const {check, body} = require('express-validator');

module.exports = [
    body('selectType').trim().notEmpty().withMessage('Debe selecionar una opcion').bail()
    .custom( (value, {req})=> {
        if (value != "null") {
            return true
        }else {
            return false
        }
    }
    ).withMessage('Debe selecionar una opcion'),
    
    body('marca').trim().notEmpty().withMessage('Este campo es obligatorio').bail()
    .isLength({min:5}).withMessage('Minimo de 6 caracteres'),
   
    body('descripcion').trim().notEmpty().withMessage('Ingrese una brebe descripcion del producto').bail()
    .isLength({min:12}).withMessage('La descipcion es muy corta'),

    body('precio').trim().notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan numeros').bail()
    .custom( (value, {req})=> {
        if (value > 200 && value < 4000) {
            return true
        }else {
            return false
        }
    }
    ).withMessage('ingresar precio mayor a 100'),

    body('descuento').isInt().withMessage('Solo se aceptan numeros').bail()
    .custom( (value, {req})=> { 
        if (value >= 0 && value < 90) {
            return true
        }else {
            return false
        }
    }
    ).withMessage('solo permitido descuento del 0 al 90%'),

    body('stock').trim().notEmpty().withMessage('Este campo es obligatorio').bail()
    .isInt().withMessage('Solo se aceptan numeros').bail()
    .custom( (value, {req})=> {
        let {stock} = req.body
        if (value > 0 && value < 500) {
            return true
        }else {
            return false
        }
    }
    ).withMessage('ingresar stock mayor que 0'),

    body('categoria').trim().notEmpty().withMessage('Debe selecionar una opcion').bail()
    .custom( (value, {req})=> {
        if (value != "undefined") {
            return true
        }else {
            return false
        }
    }
    ).withMessage('Debe selecionar una opcion'),
]