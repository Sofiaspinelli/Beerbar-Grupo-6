'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Carts extends Model {
        static associate(models) {
            Carts.belongsTo(models.Users,{
              as: 'carritoUsers',
              foreignKey: 'users_Id',
            })
            Carts.belongsTo(models.Products,{
              as: 'carritoProducts',
              foreignKey: 'products_Id',
            })
            
          }
    }

    Carts.init({
        users_id: DataTypes.STRING,
        products_id: DataTypes.STRING
    },{
        sequelize, modelName: 'Carts'
    })
    return Carts;
}