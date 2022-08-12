const fs = require('fs')
const path = require('path')

const productos = require('../data/productos.json')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
,JSON.stringify(dato,null,4),'utf-8')

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
        let {selectType,marca,img,descripcion,precio,descuento,stock} = req.body
        
        let nuevoProducto = {
            id: productos[productos.length - 1].id + 1,
            tipo: selectType,
            marca: marca,
            img: [img],
            descripcion: descripcion,
            precio: +precio,
            descuento: +descuento,
            stock: +stock,
        }
        productos.push(nuevoProducto);
        guardar(productos);
        /* Redirecciona al detalle del producto recien creado */
        res.redirect(`/products/detail/${productoNuevo.id}`)
    }
}
