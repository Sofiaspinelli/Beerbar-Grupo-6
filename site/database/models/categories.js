'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate(models) {
            Categories.hasMany(models.Products,{
              as: 'category',
              foreignKey: 'categoria_Id',
            })
          }
    }

    Categories.init({
        name: DataTypes.STRING
    },{
        sequelize, modelName: 'Categories'
    })
    return Categories;
}