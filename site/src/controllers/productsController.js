const productos = require('../data/productos.json')
const proComidas = require('../data/productosComidas.json');

module.exports = {
    products : (req, res) => {
        let tipoDeProd = ["birra", "comidas"]
        // let descuentos = productos[i].precio - (productos[i].precio * productos[i].descuento / 100);
        res.render ('products', {productos, tipoDeProd, proComidas})
    },
    detail: (req, res) => {
        let id = +req.params.id;
        let tipoDeProd = ["birra", "comidas"]
        let producto = productos.find(producto1 => producto1.id == id); 
        let comidas = proComidas.find(producto2 => producto2.id == id); 
        // let descuentos = producto.precio - (producto.precio * producto.descuento / 100);
        // let descuentos2 = comidas.precio - (comidas.precio * comidas.descuento / 100);
        
        res.render('detail', {producto, comidas, tipoDeProd});

    },
    cart : (req, res) => {
        res.render ('cart')
    }
}