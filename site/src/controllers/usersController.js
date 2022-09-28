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
       
        
            let errors = validationResult(req)
            if (errors.isEmpty()) {
            
                const {email, recordarme} = req.body
                let usuario = usuarios.find(user => user.email === email)
    
                req.session.userLogin = {
                    id : usuario.id,
                    nombre : usuario.name,
                    email : usuario.email,
                    image : usuario.image,
                    genero : usuario.genero,
                    contacto : usuario.contact,
                    rol : usuario.rol
                }
        /* COOKIE */
                if (recordarme) {
                    res.cookie('Beerbar', /* usuarios.email, */req.session.userLogin, { maxAge: 3600000})
                }
                return res.redirect('/')
                
            } else {
                /* return res.send(errors.mapped()) */
                return res.render('users/login', {
                    errors: errors.mapped(),
                    old: req.body
                })
            }
        
    },
    user: (req,res) => {
        res.render ('users/user', {
            usuarios
        })
    }, 
    // processLogin:(req,res) => {
    //     let errors = validationResult(req)
    //     // return res.send(req.body)
    //     if(errors.isEmpty()){

    //         const {email,recordarme} = req.body
    //         let usuario = usuarios.find(user => user.email === email)

    //        req.session.userLogin = {
    //            id : usuarios.id,
    //            nombre : usuarios.name,
    //            imagen : usuarios.image,
    //            email : usuarios.email,
    //            pass : usuarios.pass,
    //            genero : usuarios.genero,
    //            rol : usuarios.rol
    //        }
    //        return res.redirect('/')
    //     } 
    //     else{
    //         return res.render('login', {
    //             errors: errors.mapped(),
    //             old: req.body
    //         })
    //     }
    // },
    register: (req,res) => {
        res.render ('users/register', {
            usuarios
        })
    }, 
    processRegister:(req,res) => {

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let image = {
                param: 'image',
                msg: req.fileValidationError
            }
            errors.errors.push(image)
        }
        // return res.send(req.file)
        if (errors.isEmpty()) {
            let {name, users,email,pass,genero, contact} = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                name : name,
                users: users,
                email : email,
                pass :  bcrypt.hashSync(pass, 12),
                genero : genero,
                contact: contact,
                image: req.file && req.file.size > 1 ? req.file.filename : "usuario.png",
                rol : "user",
        }
        usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/')
    }
    else{
        let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', dato))
        if(req.file){
            if (ruta(req.file.filename) && (req.file.filename !== "usuario.png")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', req.file.filename))
            }
        }
            
        return res.render('users/register', {
            errors: errors.mapped(),
            old: req.body
        })
    }
},
     logout: (req,res) => {
         req.session.destroy();
         if(req.cookies.recordarme){
             res.cookie('Beerbar', "",{maxAge: -1 })
         }
         return res.redirect('/')
     },
     editUser: (req, res) => {        
        return res.render('users/editarUser')
    },
    editar: (req, res) => {

        let id = +req.params.id
        let {name,user,email,pass,genero, contact, rol} = req.body
         let errors = validationResult(req)
        if (req.fileValidationError) {
            let image = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(image)}
        if (errors.isEmpty()) {
            usuarios.forEach(usuario => {
                if (usuario.id === id) {
                    usuario.name = name
                    usuario.users = user
                    usuario.email = email
                    usuario.pass = pass.bcryptjs
                    usuario.genero = genero
                    usuario.contact = contact
                    usuario.image = req.file ? req.file.filename : 'usuario.png'
                    usuario.rol = rol
                }})
                guardar(usuarios)
            return res.redirect('/')
        } else {
            return res.render('users/editarUser', {
                errors: errors.mapped(),
                old: req.body
            })}
            return res.send(image)
    }

    }