'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Roles extends Model {
        static associate(models) {
            Roles.hasMany(models.Users,{
              as: 'rol',
              foreignKey: 'roles_Id'
            })
        }
    }

    Roles.init({
        title: DataTypes.STRING
    },{
        sequelize, modelName: 'Roles'
    })
    return Roles;
}