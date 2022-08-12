const productos = require('../data/productos.json')

module.exports = {
    products : (req, res) => {
        res.render ('products', {productos})
    },
    detail: (req, res) => {
        let id = +req.params.id;
        let producto = productos.find(producto => producto.id == id); 

        res.render('detail', {producto});
    },
    cart : (req, res) => {
        res.render ('cart')
    }
}