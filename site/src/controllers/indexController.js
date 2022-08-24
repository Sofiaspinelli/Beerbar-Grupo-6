const productos = require ('../data/productos.json');
const proComidas = require('../data/productosComidas.json');

module.exports = {
    home : (req , res) => {
        let tipoDeProd = ["birra", "comidas"]
        res.render ('index',
        {
            productos,
            proComidas,
            tipoDeProd
        })
    },
}