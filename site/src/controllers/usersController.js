const fs = require('fs')
const path = require('path')
const usuarios = require('../data/users.json')
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    login: (req,res) => {
        res.render ('login', {
            usuarios
        })
    }, 
    user: (req,res) => {
        res.render ('user', {
            usuarios
        })
    }, 
    processLogin:(req,res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
           req.cesion.userLogin = {
               id : usuario.id,
               nombre : usuario.name,
               rol : usuario.rol
           }
           return res.redirect('/user/profile')
        } 
        else{
            return res.render('login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    register: (req,res) => {
        res.render ('register', {
            usuarios
        })
    }, 
    processRegister:(req,res) => {
        if (errors.isEmpty()) {
            let {name, users,email,pass,genero, contact, image, rol} = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                name : name ,
                users: users,
                email : email,
                pass : bcryptjs.hashSync(pass,6),
                genero : "",
                contact: "",
                image: "default-usuario.png",
                rol : "user",
        }
        usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/')
    }
    else{
        let ruta = (dato) => fs.existsSync(path.join(__dirname,'..','..','public','img','user'))
        if (ruta(req.file.filename) && (req.file.filename !== "default-usuario.png")) {
            fs.unlinkSync(path.join(__dirname,'..','..','public','img','user',req.file.filename))
        }
        return res.render('user/register', {
            errors:mapped(),
            old: req.body
        })
    }
},
     logout: (req,res) => {
         req.cesion.destroy();
         return res.redirect('/')
     },
     editUser: (req, res) => {        
        return res.render('editarUser')
    },
    editar: (req, res) => {

        let id = +req.params.id
        let {name, apellido,email,pass,genero, contact, image, rol} = req.body
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
                    usuario.apellido = apellido
                    usuario.email = email
                    usuario.pass = pass.bcryptjs
                    usuario.genero = genero
                    usuario.contact = contact
                    usuario.image = req.file ? req.file.filename : image
                    usuario.rol = rol
                }})
                guardar(usuarios)
            return res.redirect('/')
        } else {
            return res.render('editarUser', {
                errors: errors.mapped(),
                old: req.body
            })}

    },
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        update: (req, res) => {
        let id = +req.body.id;
        let {name, users,email,pass,genero, contact, image, rol} = req.body
        
        usuarios.forEach(usuario => {
            if (usuario.id === id) {
                usuario.name = name
                usuario. users = users
                usuario.email = email
                usuario.pass = pass.bcrypt
                usuario.genero = genero
                usuario.contact = contact
                usuario.image = image
                usuario.rol = rol
            }
        });
        guardar(usuarios);
      
        return res.redirect('/user/profile');
    },

    }