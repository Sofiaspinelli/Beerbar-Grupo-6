const fs = require('fs')
const path = require('path')
const db = require('../../../database/models');

module.exports = {
    usuarios: (req, res) => {
        
       db.users.findAll()
       .then(usuarios => {
        // return res.status(200).send(usuarios)
        let  dataUsers = usuarios.map(element => {
            let usuario = {
                id: element.id,
                first_name: element.nombre,
                last_name: element.apellido,
                email: element.email,
                detail: `http://localhost:3000/api/users/${element.id}`,
            }
            return usuario
        });

        let users = {
            status: 200,
            meta: {
                users: 'LISTA DE USUARIOS',
                count: usuarios.length,
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: dataUsers,
        }
        return res.status(200).json(users)
       })
       .catch(error => res.status(500).send(error))
    
    },
    usuarioPorId: (req, res) => {
        const id = req.params.id;
        db.users.findByPk(id, {
            include: [{all: true}]
        })
        .then(usuario => {

            let user = {
                status: 200,
                meta: {
                    users: 'USUARIO ESPECIFICO',
                    rol: usuario.rol.title,
                    imgAvatar: "www.rutagenerica.com",
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                    volverAListaDeUsers: `http://localhost:3000/api/users/`
                },
                data: {
                    id: usuario.id,
                    first_name: usuario.nombre,
                    last_name: usuario.apellido,
                    email: usuario.email,
                    genre: usuario.genero,
                    contact: usuario.contacto,
                    roles_id: usuario.roles_id,
                    createdAt: usuario.createdAt,
                
                }
            }
            return res.status(200).json(user)
        })
    }
}