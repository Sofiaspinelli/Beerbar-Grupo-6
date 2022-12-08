const fs = require('fs')
const path = require('path')
const db = require('../../database/models');
const bcryptjs = require('bcryptjs')

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
    },
    login: (req, res) => {
        db.users.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                all: true
            }]
        })
        .then((result) => {
        
            let user = {
                status: 200,
                meta: {
                    user: result.nombre,
                    rol: result.rol.title,
                    imgAvatar: "www.rutagenerica.com",
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                },
                data: result
            }
            return res.status(200).json(user) 
         
        })
        
    },

    /* productos apis */
    productos: (req, res) => {
        
        db.products.findAll()
        .then(productos => {
         // return res.status(200).send(productos)
 
         let list = {
             status: 200,
             meta: {
                 product: 'LISTA DE PRODUCTOS',
                 count: productos.length,
                 url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
             },
             data: productos,
         }
         return res.status(200).json(list)
        })
        .catch(error => res.status(500).send(error))
     
     },
     productosPorId: (req, res) => {
        const id = req.params.id;
        db.products.findByPk(id, {
            include: [{all: true}]
        })
        .then(productos => {

            let user = {
                status: 200,
                meta: {
                    product: 'PRODUCTO ESPECIFICO',
                    
                    imgProduct: "www.rutagenerica.com",
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                    volverAListaDePrductos: `http://localhost:3000/api/productos/`
                },
                data: {
                    id: productos.id,
                    nombre: productos.nombre,
                    marca:productos.marca,
                    detalle: productos.detalle,
                    precio: productos.precio,
                    descuento: productos.descuento,
                    stock: productos.stock,
                    tipo: productos.tipos.name,
                    categoria: productos.category.name,
                    vendidos: productos.vendidos
                
                }
            }
            return res.status(200).json(user)
        })
    },
}

