'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        static associate(models) {
            Products.belongsTo(models.Categories,{
              as: 'category',
              foreignKey: 'categoria_Id'
            }),
            Products.belongsTo(models.Types,{
              as: 'tipos',
              foreignKey: 'type_Id'
            }),
            Products.hasMany(models.Images,{
              as: 'imagenes',
              foreignKey: 'products_Id',
              onDelete:'cascade'
            })
            Products.hasMany(models.Carts,{
              as: 'carritoProducts',
              foreignKey: 'products_Id',
            })
          }
    }

    Products.init({
        nombre: DataTypes.STRING,
        marca: DataTypes.STRING,
        type_id: DataTypes.INTEGER,
        detalle: DataTypes.STRING,
        categoria_id: DataTypes.INTEGER,
        precio: DataTypes.INTEGER,
        descuento: DataTypes.INTEGER,
        stock: DataTypes.INTEGER,
        vendidos: DataTypes.INTEGER,
    },{
        sequelize, modelName: 'Products'
    })
    return Products;
}