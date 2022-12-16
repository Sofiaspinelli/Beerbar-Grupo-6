// const productos = require ('../data/productos.json');
const db = require('../database/models')
const { Op } = require('sequelize')

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
    search : (req,res) => {

        let articulo = req.query.search 
        /* return res.status(200).send(articulo) */

        db.products.findAll({
            where: {
                [Op.or] : [
                {nombre : {[Op.substring] : articulo}} ,
                {detalle :{[Op.substring] : articulo}}, 
                ]
            },
            include : [{
                all:true
            }]
        })
        .then(resultados => {
            return res.render('busqueda', 
        {
            busqueda: articulo,
            resultados
        }
        )
        });
        
    },
    empresa : (req , res) => {
        res.render('empresa', {title : 'Empresa'})
    },
    contacto : (req , res) => {
        res.render('contacto', {title : 'Contacto'})
    }

}