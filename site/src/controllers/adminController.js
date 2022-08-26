const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json');
const proComidas = require('../data/productosComidas.json');

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
,JSON.stringify(dato,null,4),'utf-8');

const guardar2 = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productosComidas.json')
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
        let {selectType,marca,img,descripcion,precio,descuento,stock, categoria} = req.body;

        if (selectType === "comidas") {
            let nuevaComida = {
                id: proComidas[proComidas.length - 1].id + 1,
                producto: selectType,
                marca: marca,
                detalle: descripcion,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                vendidos: 0,
                categoria: categoria,
                imagenes: [img],
            };
            proComidas.push(nuevaComida);

            guardar2(proComidas);

            res.redirect(`/products/detail/${nuevaComida.id}`);
        }else {
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
                imagenes: [img],
            };
            productos.push(nuevoProducto);

            guardar(productos);

            res.redirect(`/products/detail/${nuevoProducto.id}`);
        };
        
        // productos.push(nuevoProducto);
        // guardar(productos);
        /* Redirecciona al detalle del producto recien creado */
        // res.redirect(`/products/detail/${nuevoProducto.id}`)
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

        let eliminarProducto = productos.filter(producto => producto.id !== id);
        guardar(eliminarProducto);

        res.redirect('/admin/list')
    }
}
