const productos = require('../data/productos.json');
const usuarios = require('../data/users.json');


module.exports = {
    products : (req, res) => {
        let tipoDeProd = ["birra", "comidas"]
        // let descuentos = productos[i].precio - (productos[i].precio * productos[i].descuento / 100);
        res.render ('products', {productos});
    },
    detail: (req, res) => {
        let id = +req.params.id;
        let tipoDeProd = ["birra", "comidas"]
        let producto = productos.find(producto => producto.id == id); 
        // let descuentos = producto.precio - (producto.precio * producto.descuento / 100);
        
        res.render('detail', {producto});

    },
    cart : (req, res) => {
            res.render('cart')
    }
}