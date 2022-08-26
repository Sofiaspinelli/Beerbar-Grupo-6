const productos = require('../data/productos.json')
const proComidas = require('../data/productosComidas.json');

module.exports = {
    products : (req, res) => {
        let tipoDeProd = ["birra", "comidas"]
        // let descuentos = productos[i].precio - (productos[i].precio * productos[i].descuento / 100);
        res.render ('products', {productos, tipoDeProd, proComidas})
    },
    detailB: (req, res) => {
        let id = +req.params.id;
        let tipoDeProd = ["birra", "comidas"]
        let producto = productos.find(producto => producto.id == id); 
        // let descuentos = producto.precio - (producto.precio * producto.descuento / 100);
        
        res.render('detailB', {producto, tipoDeProd});

    },
    detailC: (req, res) => {
        let id = +req.params.id;
        let tipoDeProd = ["birra", "comidas"]
        let comida = proComidas.find(comida => comida.id == id); 
        // let descuentos = comidas.precio - (comidas.precio * comidas.descuento / 100);
        
        res.render('detailC', {comida, tipoDeProd});

    },
    cart : (req, res) => {
        res.render ('cart')
    }
}