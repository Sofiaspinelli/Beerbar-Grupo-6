const fs = require('fs')
const path = require('path')

const save = (dato) => fs.writeFileSync(path.join(__dirname, '../data/carrito.json'),JSON.stringify(dato,null,4),'utf-8')
const carrito = require('../data/carrito.json')
module.exports = {
    cart : (req , res) => {
        res.render ('cart')
    },
    productosSeleccionados: (req,res) => {
        let id = req.params.id
      if(carrito.id == id){
        return carrito
      }
      res.render('cart')
     } 
}
