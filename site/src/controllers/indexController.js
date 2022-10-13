// const productos = require ('../data/productos.json');
const db = require('../../database/models')

module.exports = {
    home : (req , res) => {

        db.products.findAll({
            include: ['category','imagenes','tipos']
        })
        .then(products => {
            // return res.status(200).json(products)
            return res.render ('index', {products})
        })
        .catch(error => console.log('Se produjo un error', error))

    },
}