// const productos = require('../data/productos.json');
const usuarios = require('../data/users.json');
const db = require('../../database/models');


module.exports = {
    products : (req, res) => {
        db.products.findAll({
            include: ['category','imagenes','tipos']
        })
        .then(products => {
            // return res.status(200).json(products)
            res.render ('products', {products});
        })
        .catch(error => console.log('Se produjo un error', error))
        // let descuentos = productos[i].precio - (productos[i].precio * productos[i].descuento / 100);
        
    },
    detail: (req, res) => {
        let id = +req.params.id;
        
        db.products.findByPk(id,{
            include: ['category','imagenes','tipos']
        })
        .then(products => {
            // return res.status(200).json(products)
            // db.Products.findAll({
            //     where: {
            //         categoria_id: products.categoria_id
            //     },
            //     limit: 4,
            //     order: [[Sequelize.literal("RAND()")]],
            //     include: [{
            //         all: true
            //     }]
            // })
            //     .then(productos => {
            //         /* return res.send(productos) */
            //         return res.render('detail', {
            //             products,
            //             productos
            //         })
            //     })
            res.render('detail', {products});
        })
        .catch(error => console.log('Se produjo un error', error))

        // let producto = productos.find(producto => producto.id == id); 
        // let descuentos = producto.precio - (producto.precio * producto.descuento / 100);

    },
    cart : (req, res) => {
            res.render('cart')
    }
}