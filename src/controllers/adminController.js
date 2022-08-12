const res = require("express/lib/response");
/* let productos = require(/..data/productos.json);*/

module.exports = {
  crear:(req,res) => {
      return res.render('admin/crear')
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
