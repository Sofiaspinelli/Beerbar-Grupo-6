const fs = require('fs')
const path = require('path')
const usuarios = require('../data/users.json')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
,JSON.stringify(dato,null,4),'utf-8')

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
    login2: (req,res) => {
        return res.send(req.body)
    }, 
    register2: (req,res) => {
        
        
            let {name,apellido,email,pass,genero} = req.body
            let usuarioNuevo = {
                id:usuarios[usuarios.length - 1].id + 1,
                name,
                apellido,
                email,
                pass,
                genero,
                image: req.file ? req.file.filename : "avatar-porDefecto.jpg",
                
            }
            usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/')
        }
    }
