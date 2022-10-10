'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Images extends Model {
        static associate(models) {
            Images.belongsTo(models.Products,{
              as: 'imagenes',
              foreignKey: 'products_Id',
            })
          }
    }

    Images.init({
        name: DataTypes.STRING,
        products_id: DataTypes.STRING
    },{
        sequelize, modelName: 'Images'
    })
    return Images;
}

