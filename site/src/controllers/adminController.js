const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json');
const {validationResult} = require('express-validator')

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
,JSON.stringify(dato,null,4),'utf-8');

module.exports = {
    list: (req,res) => {
        return res.render('admin/listaProductos',{
            productos
        })

    },
    crear: (req, res) => {
        res.render('admin/crear')
    },
    newProducts: (req, res) => {
        const {selectType,marca,descripcion,precio,descuento,stock, categoria} = req.body;
        const img = req.file

        let errors = validationResult(req);

        if (req.fileValidationError) {
            let imagen = {
                param: 'img',
                msg: req.fileValidationError,
            };
            errors.errors.push(imagen);
        };

        if (errors.isEmpty()) {
            let nuevoProducto = {
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

            guardar(productos);

            res.redirect(`/products/detail/${nuevoProducto.id}`);
        } else {
            // let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', dato));
            
            // if (ruta(req.file.filename) && (req.file.filename !== "default-img.png")) {
            //     fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', req.file.filename));
            // };

            return res.render('admin/crear', {
                errors: errors.mapped(),
                old: req.body
            });
        }
            
        
        /* Redirecciona al detalle del producto recien creado */
    },
    editar:(req,res) => {  /* (editProduct(req, res))  */
        let type = ["birra", "comida"];
        let id = +req.params.id;  
        let producto = productos.find(producto => producto.id == id);

        // res.send(producto)
        if (producto.id === id) {
            res.render('admin/editar',{producto, type}); 
        }else { 
            res.send('Producto no encontrado')
        };
    },
    update: (req, res) => {
        let id = +req.params.id;
        let {selectType,marca,img,descripcion,precio,descuento,stock} = req.body
        
        productos.forEach(producto => {
            if (producto.id === id) {
                producto.producto = selectType
                producto.marca = marca
                producto.detalle = descripcion
                producto.precio = +precio
                producto.descuento = +descuento
                producto.stock = +stock
                producto.imagenes = [img]
            }
        });
        guardar(productos);
        /* Redirecciona a la lista */
        return res.redirect('/admin/list');
        // return res.redirect(`/products/detail/${productos.id}`)
    },
    destroy: (req, res) => {
        const id = +req.params.id;
        // let imagen = productos.imagen
        // let producto = productos.find(producto => producto.id === id);
        // let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', dato));
            
        // if (ruta(imagen) && (imagen !== "default-img.png")) {
        //         fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'productos', imagen));
        // };

        let eliminarProducto = productos.filter(producto => producto.id !== id);
        guardar(eliminarProducto);

        res.redirect('/admin/list');
    }
}
