const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
// const usuarios = require('../data/users.json')
const db = require('../database/models');

const { emitWarning } = require('process')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/users.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    login: (req,res) => {
        db.users.findAll({
            include: ['rol','imagenesAvatar']
        })
        .then(usuarios => {
            res.render ('users/login', {
            usuarios
        })
        })
        .catch(errors => console.log('Se produjo un error', errors))
        
    }, 
    processLogin: (req,res) => {
       
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            
            const {email, recordarme} = req.body
            // let usuario = usuarios.find(user => user.email === email)
            db.users.findOne({
                where: {
                    email: email
                },
                include: [{
                    all: true
                }]
            })
            .then(usuario => {
                //    return res.status(200).json(usuario)
                    req.session.userLogin = {
                    id : usuario.id,
                    nombre : usuario.nombre,
                    apellido : usuario.apellido,
                    image : usuario.imagenesAvatar[0].name,
                    rol : usuario.roles_id
                }
            
                /* COOKIE */
                if (recordarme) {
                    res.cookie('Beerbar', /* usuarios.email, */req.session.userLogin, { maxAge: 3600000})
                }

                req.session.carrito = []

                db.ordenes.findOne({
                    where: {
                        users_id: req.session.userLogin.id,
                        status: 'pendiente'
                    },
                    include: [
                        {
                            association : 'carrito',
                            attributes: ['products_id', 'cantidad'],
                            include: [
                                {
                                    association : 'carritoProduct',
                                    attributes: ['id', 'nombre', 'detalle', 'precio', 'descuento', 'stock'],
                                    include: [
                                        {
                                            association : 'imagenes',
                                            attributes: ['name']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
                .then(orden => {
                    if (!orden) {
                        console.log('el usuario logeano no tiene una orden pendiente');
                        return res.redirect('/')
                    } else {
                        console.log('el usuario logeano tiene una orden pendiente');
                        orden.carrito.forEach(item => {

                            let producto = {
                                id: item.carritoProduct.id,
                                nombre: item.carritoProduct.nombre,
                                precio: item.carritoProduct.precio,
                                descuento: item.carritoProduct.descuento,
                                imagen: item.carritoProduct.imagenes[0].name,
                                stock: item.carritoProduct.stock,
                                detalle: item.carritoProduct.detalle,
                                cantidad: +item.cantidad,
                                subtotal: ( +item.carritoProduct.precio - ( +item.carritoProduct.precio * +item.carritoProduct.descuento / 100 )) * item.cantidad,
                                orden_id: orden.id ,
                            }
                            req.session.carrito.push(producto)

                        });
                        console.log(req.session.carrito);
                        return res.redirect('/')
                    }
                })
                .catch(errors => res.status(500).send(errors))

            })
            .catch(errors => res.status(500).send(errors))

        } else {
            /* return res.send(errors.mapped()) */
            return res.render('users/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
        
    },
    user: (req,res) => {
        let roles = db.roles.findAll()

        let usuarios = db.users.findAll({
            include: ['rol','imagenesAvatar']
        })

        Promise.all([roles, usuarios])
        .then(([roles, usuarios]) => {
            res.render ('users/user', {
            usuarios,
            roles
        })
        })
        .catch(errors => console.log('Se produjo un error', errors))
        
    }, 
    register: (req,res) => {
        db.users.findAll({
            include: ['rol','imagenesAvatar']
        })
        .then(usuarios => {
            res.render ('users/register', {
            usuarios
        })
        })
        .catch(errors => console.log('Se produjo un error', errors))
        
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
            let {name, apellido,email,pass,genero, contacto} = req.body
            // return res.status(200).send(req.body)
        db.users.create({
            nombre: name,
            apellido: apellido,
            genero: genero,
            email: email,
            pass: bcrypt.hashSync(pass, 12),
            contacto: contacto,
            roles_id: 1,
            // avatars_id: 1,
            // createdAt: "2022-10-13 00:01:08",
            // updatedAt: "2022-10-13 00:01:08"
        })
        .then(usuarioNuevo => {
            // return res.status(200).json(usuarioNuevo)
            if (req.file) {
                let imagen = {
                    name: req.file.filename,
                    users_id: usuarioNuevo.id
                }
                db.avatars.create(imagen)
                .then(img => {
                    
                    db.users.findOne({
                        where: {id: usuarioNuevo.id},
                        include: [{all: true}]
                    })
                    .then(nuevo => {
                    
                        req.session.userLogin = {
                            id: nuevo.id,
                            nombre: nuevo.nombre,
                            apellido: nuevo.apellido,
                            rol: nuevo.roles_id,
                            image: nuevo.imagenesAvatar[0].name
                            }  
                        return res.redirect('/')
                    })
                })
            }else{
                db.avatars.create({
                    name: "usuario.png",
                    users_id: usuarioNuevo.id
                })
                .then(img => {  
                    db.users.findOne({
                        where: {id: usuarioNuevo.id},
                        include: [{all: true}]
                    })
                    .then(nuevo => {
                    
                        req.session.userLogin = {
                            id: nuevo.id,
                            nombre: nuevo.nombre,
                            apellido: nuevo.apellido,
                            rol: nuevo.roles_id,
                            image: nuevo.imagenesAvatar[0].name
                            }  
                        return res.redirect('/')
                    })
                })
            }
                           
        })
        .catch(error => console.log('Se a producido un error', error))         
    }
    else{
        let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', dato))
        if(req.file){
            if (ruta(req.file.filename) && (req.file.filename !== "usuario.png")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', req.file.filename))
            }
        }
            
        return res.render('users/register', {
            errors: errors.mapped(),
            old: req.body
        })
    }
     //     let usuarioNuevo = {
        //         id:usuarios[usuarios.length - 1].id + 1,
        //         name : name,
        //         users: users,
        //         email : email,
        //         pass :  bcrypt.hashSync(pass, 12),
        //         genero : genero,
        //         contact: contacto,
        //         image: req.file && req.file.size > 1 ? req.file.filename : "usuario.png",
        //         rol : "user",
        // }
        // usuarios.push(usuarioNuevo)
            // guardar(usuarios)
},
     logout: (req,res) => {
         req.session.destroy();
         if(req.cookies.Beerbar){
             res.cookie('Beerbar', "",{maxAge: -1 })
         }
         return res.redirect('/')
     },
     editUser: (req, res) => {
        let id = req.params.id 
        // let usuario = usuarios.find(usuario => usuario.id === id) 
        db.users.findOne({
            where: {
                id: id
            },
            include: ['rol','imagenesAvatar']
        })
        .then(usuario => {
            // return res.status(200).json(usuario)
            return res.render('users/editarUser',{
            usuario
        })
        })
        .catch(errors => res.status(500).send(errors))
        
    },
    editar: (req, res) => {

        let id = +req.params.id
        let {name,apellido,email,pass,genero, contact, rol,image} = req.body

        /* req.session.destroy();
         if(req.cookies.Beerbar){
             res.cookie('Beerbar', "",{maxAge: -1 })
         } */

         let errors = validationResult(req)
        if (req.fileValidationError) {
            let image = {
                param: 'image',
                msg: req.fileValidationError,
            }
            errors.errors.push(image)}
        if (errors.isEmpty()) {
            let user = db.users.findOne({
                where: {
                    id: id
                }
            })
            let userUpdate = db.users.update({
                nombre : name,
                apellido : apellido,
                genero : genero,
            
            },{ where: {id: id}})

            Promise.all([user, userUpdate])
            .then(([user, userUpdate]) => { 
                
            
                if (req.file) {
                    db.avatars.update({
                        name: req.file.filename,
                        users_id: user.id
                    }, {
                        where: {id: id}
                    })
                    .then(img => {
                        db.users.findOne({
                            where: {
                                id: id
                            },
                            include : [{
                                all: true
                            }]
                        })
                        .then(usuarioNuevo =>{
                            // return res.status(200).json(usuarioNuevo)
                            req.session.userLogin = {
        
                                id: usuarioNuevo.id,
                                nombre: usuarioNuevo.nombre,
                                apellido: usuarioNuevo.apellido,
                                rol: usuarioNuevo.roles_id,
                                image: usuarioNuevo.imagenesAvatar[0].name

                                }
                                req.session.save((err) => {
                                    req.session.reload((err) => {
                                        res.locals.userLogin = req.session.userLogin
                                        return res.redirect('/')
                                    });
                                });
    
                            })
                        
                    })
                }
            })
        
        

            .catch(errors => {
                return res.status(500).send(errors)
            })  
        } /* else {
            return res.render('users/editarUser', {
                errors: errors.mapped(),
                old: req.body
            })} */
          
    }

    }