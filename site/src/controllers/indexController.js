const productos = require ('../data/productos.json');


module.exports = {
    home : (req , res) => {
        let tipoDeProd = ["birra", "comidas"]
        res.render ('index',
        {
            productos
        })
    },
}