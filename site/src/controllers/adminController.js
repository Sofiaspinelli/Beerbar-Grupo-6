const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json');
const db = require('../../database/models');
const {validationResult} = require('express-validator');
const { resolveSoa } = require('dns');

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
,JSON.stringify(dato,null,4),'utf-8');

module.exports = {
    list: (req,res) => {
        db.products.findAll({
            include: ['category','imagenes','tipos']
        })
        .then(products => {
            // return res.status(200).json(products)
            return res.render ('admin/listaProductos', {
                products
            })
        })
        .catch(error => console.log('Se produjo un error', error))

    },
    crear: (req, res) => {
        res.render('admin/crear')
    },
    newProducts: (req, res) => {
        const {selectType,nombre,marca,descripcion,precio,descuento,stock, categoria} = req.body;
        const img = req.file
        // return res.status(200).send(req.body)
        let errors = validationResult(req);

        if (req.fileValidationError) {
            let imagen = {
                param: 'img',
                msg: req.fileValidationError,
            };
            errors.errors.push(imagen);
        };

        if (errors.isEmpty()) {
            db.products.create({
                type_id: +selectType,
                nombre: nombre,
                marca: marca,
                detalle: descripcion,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                vendidos: 0,
                categoria_id: +categoria,
            })
            .then(product => {
                if (img) {
                    let imagen = {
                        name: img.filename,
                        products_id: product.id
                    }
                    db.images.create(imagen)
                    .then(img => {
                        res.redirect(`/products/detail/${product.id}`);
                    })
                } else {
                    db.images.create({
                        name: "default-img.png",
                        products_id: product.id
                    })
                    .then(img => {
                        res.redirect(`/products/detail/${product.id}`);
                    })
                }
               
            })
            .catch(errors => res.status(500).send(errors));
        
        } else {
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', dato));
            
            if (img) {
                if (ruta(img.filename) && (img.filename !== "default-img.png")) {
                    fs.unlinkSync(path.join(__dirname, '../../public/img/productos', img.filename));
                }
            }

            return res.render('admin/crear', {
                errors: errors.mapped(),
                old: req.body
            });
        }
            
       /* let nuevoProducto = {
                id: productos[productos.length - 1].id + 1,
                producto: selectType,
                marca: marca,
                detalle: descripcion,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                vendidos: 0,
                categoria: categoria,
                imagen: img? img.filename : "default-img.png",
            };
            productos.push(nuevoProducto);

            guardar(productos); */ 
       
    },
    editar:(req,res) => {
/*      let  idParams = req.params.id
     db.products.findByPk(idParams,{
        include: [{all:true}]
     }).then(producto=> {
        return res.render('editar',{producto})
     }).catch(error=>res.status(500).send(error)) */


       
        let idParams = +req.params.id 
        let categoria = db.categories.findAll()
        let types = db.types.findAll()
        let producto = db.products.findOne({
            where: {
                id : idParams
            },
            include :[{
                all: true
            }]
        })
        Promise.all([categoria, types, producto])
        .then(([categoria, types, producto]) => {
            let categoriaP = categoria.find(categoria => categoria.id === producto.categoria_id)
            return res.render('admin/editar',{
                producto,
                categoria,
                types,
                // categoriaP
            })
        })
        .catch(errors => {
            return res.status(500).send(errors)
        });
},
    update: (req, res) => {
        const idParams = +req.params.id;
        let errors = validationResult(req)
        
        if (req.fileValidationError){
            let imagen ={
                param : 'imagen',
                msg : req.fileValidationError,
            }
            errors.errors.update(imagen)}

            if(errors.isEmpty()){
                let {selectType,nombre,marca,descripcion,precio,descuento,stock, } = req.body

                db.productos.update({
                nombre: nombre,
                producto : selectType,
                marca : marca,
                detalle : descripcion,
                precio : +precio,
                descuento : +descuento,
                stock : +stock,
                categoria_id: +categoria,
                imagen : img? img.filename : "",
                updated_at: new Date
            },{     where : {
                        id : idParams
                    }
                })
                .then(products => {
                    return res.redirect('/admin/list')
                        })
                    }
                },
              /*   .then((result) => {
                    return res.redirect('/admin/list')
                }) .catch .catch(errors => {
                    return res.status(500).send(errors)
                });},*/ 


    destroy: (req, res) => {
        const id = +req.params.id; 
   let producto = productos.find(producto => producto.id === id); 
        
        db.products.findOne({
            where: {
                id: id
            },
            include : [{
                all:true
            }]
        })
        .then(producto => {
                const img = req.file
            
                let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', dato));
                
                if (img) {
                    if (ruta(img.filename) && (img.filename !== "default-img.png")) {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/productos', img.filename));
                    }
                }
        })
        db.products.destroy({
            where : {
                id : id
            }
        })
        .then(eliminar => {
                    return res.redirect('/admin/list')
                })
            
        .catch(errors => {
                    return res.status(500).send(errors) 
            });
        
        },

           guardar(productos){ 
        /* Redirecciona a la lista */
        return res.redirect('/admin/list') },
           }// return res.redirect(`/products/detail/${productos.id}`)