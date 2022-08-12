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
            producto: selectType,
            marca: marca,
            detalle: descripcion,
            precio: +precio,
            descuento: +descuento,
            stock: +stock,
            imagenes: [img],
        }
        productos.push(nuevoProducto);
        guardar(productos);
        /* Redirecciona al detalle del producto recien creado */
        res.redirect(`/products/detail/${nuevoProducto.id}`)
    },
    editar:(req,res) => {  (editProduct(req, res)) 
      id = +req.params.id;  
     let producto = productos.find(elemento => {
 
       if (producto.id === id) {
        res.render('admin/editar',{producto }); 
       }
       else { 
      return   res.send('Producto no encontrado')}
     })}}



  
