'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Types extends Model {
        static associate(models) {
            Types.hasMany(models.Products,{
              as: 'tipos',
              foreignKey: 'type_Id',
            })
      }
}

    Types.init({
        name: DataTypes.STRING
    },{
        sequelize, modelName: 'Types'
    })
    return Types;
}