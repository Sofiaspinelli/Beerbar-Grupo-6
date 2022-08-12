const fs = require('fs')
const path = require('path')

const save = (dato) => fs.writeFileSync(path.join(__dirname, '../data/carrito.json'),JSON.stringify(dato,null,4),'utf-8')
module.exports = {
    cart : (req , res) => {
        res.render ('cart')
    },
    productosSeleccionados: (req,res) => {
        let {marca,img,descripcion,precio,descuento} = req.body

        let productosAgregados = {
            marca: marca,
            img: [img],
            detalle: descripcion,
            precio: precio,
            descuento: descuento,
        }
      

  } 
}
