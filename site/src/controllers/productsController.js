// const productos = require('../data/productos.json');
const usuarios = require('../data/users.json');
const db = require('../database/models');
const { fn, Op, literal } = require('sequelize')
const Sequelize = require('sequelize')

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
        
        let products = db.products.findByPk(id,{
            include: ['category','imagenes','tipos']
        })
        let randon = db.products.findAll({
            where:{
                categoria_id : {
                    [Op.or]: [1, 3]
                }
            },
            limit: 3,
            order: [
                [Sequelize.literal('RAND()')]
            ],
            include: [{all:true}]
        })
        Promise.all([products, randon])
        .then(([products, randon]) => {
            // return res.status(200).json(randon[0].imagenes[0].name)
            res.render('detail', {products, randon});
        })
        .catch(error => console.log('Se produjo un error', error))

        // let producto = productos.find(producto => producto.id == id); 
        // let descuentos = producto.precio - (producto.precio * producto.descuento / 100);

    },
    cart : (req, res) => {
            res.render('cart')
    }
}