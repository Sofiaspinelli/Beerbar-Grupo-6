let productos = require ('../data/productos.json')

module.exports = {
    home : (req , res) => {
        res.render ('index',
        {
            productos
        })
    },
}