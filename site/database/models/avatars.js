'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Avatars extends Model {
        static associate(models) {
            Avatars.hasMany(models.Users,{
              as: 'imagenesAvatar',
              foreignKey: 'avatars_Id'
            })
        }
    }

    Avatars.init({
        name: DataTypes.STRING
    },{
        sequelize, modelName: 'Avatars'
    })
    return Avatars;
}