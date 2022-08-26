const fs = require('fs')
const path = require('path')
const usuarios = require('../data/users.json')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    login: (req,res) => {
        res.render ('login', {
            usuarios
        })
    }, 
    register: (req,res) => {
        res.render ('register', {
            usuarios
        })
    }, 
    register2: (req,res) => {
            /* return res.send (req.body) */
            const {name, users,email,pass,genero, contact} = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                name : name ,
                users: users,
                email : email,
                pass : pass,
                genero : genero,
                contact: contact,
                image: req.file ? req.file.filename : "foto-perfil.png",
            }
            
            usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/')
        }
    }

