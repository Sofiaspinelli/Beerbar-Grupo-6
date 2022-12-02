const {check,body} = require('express-validator')
// const usuarios = require('../data/users.json')
const db = require('../database/models')
const bcryptjs = require('bcryptjs')

module.exports = [
    /* Email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email valido'),

    /* Contraseña */
    check('pass').trim()
    .notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({min:6}).withMessage('Debe contener al menos 8 caracteres'),

    body('pass')
        .custom((value, {req}) => {
           return db.users.findOne({
                where: {
                    email: req.body.email
                }
           })
           .then(user => {
               if(!bcryptjs.compareSync(value, user.dataValues.pass)){
                   return Promise.reject()
               }
           })
           .catch(() => {
               return Promise.reject('El email o la contraseña no coincide')
           })
        })
    // body('email')
    // .custom((value,{req}) =>{
    //     let usuario = usuarios.find(user => user.email === value && bcryptjs.compareSync(req.body.pass, user.pass))

    //     if (usuario) {
    //         return true
    //     }else{
    //         return false
    //     }
    // })
    // .withMessage('El email o la contraseña no coincide')
    /* .withMessage('El usuario no se encuentra registrado o las credenciales son invalidas') */
]
