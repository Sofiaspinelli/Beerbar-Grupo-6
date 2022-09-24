const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const usuarios = require('../data/users.json')
const { emitWarning } = require('process')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    login: (req,res) => {
        res.render ('users/login', {
            usuarios
        })
    }, 
    processLogin: (req,res) => {
       
        {
            let errors = validationResult(req)
            if (errors.isEmpty()) {
            
                const {email} = req.body
                let usuario = usuarios.find(user => user.email === email)
    
                req.session.userLogin = {
                    id : usuario.id,
                    nombre : usuario.name,
                    image : usuario.image,
                    rol : usuario.rol
                }
        /* COOKIE */
                if (req.body.recordame != undefined) {
                    res.cookie('recordame', usuario.email, { maxAge: 3600000})
                }
                return res.redirect('/')
                
            } else {
                /* return res.send(errors.mapped()) */
                return res.render('users/login', {
                    errors: errors.mapped(),
                    old: req.body
                })
            }
        }
    },
    user: (req,res) => {
        res.render ('user', {
            usuarios
        })
    }, 
    register: (req,res) => {
        res.render ('users/register', {
            usuarios
        })
    }, 
    processRegister: (req,res) => { 
        let errors = validationResult(req)

       /* return res.send(errors.mapped()) */
        if (req.fileValidationError) {
            let imagen = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            /* return res.send (req.body) */
            const {name, users,email,pass,genero, contact} = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                name : name ,
                users: users,
                email : email,
                pass :  bcrypt.hashSync(pass, 15),
                genero : genero,
                contact: contact,
                image: req.file ? req.file.filename : "usuario.png", 
            }
            
            usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/')
        }else {

            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', dato))
            if (ruta(req.file.filename) && (req.file.filename !== "usuario.png")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', req.file.filename))
            }
            
            /* return res.send(errors.mapped()) */
            return res.render('users/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    }
    }

