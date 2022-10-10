'use strict';
const {
    Model, DataTypes
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.belongsTo(models.Roles,{
              as: 'rol',
              foreignKey: 'roles_Id'
            }),
            Users.belongsTo(models.Avatars,{
              as: 'imagenesAvatar',
              foreignKey: 'avatars_Id'
            }),
            Users.hasMany(models.Carts,{
                as: 'carritoUsers',
                foreignKey: 'carts_Id',
              })
        }
    }

    Users.init({
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        email: DataTypes.STRING,
        pass: DataTypes.STRING,
        genero: DataTypes.STRING,
        contacto: DataTypes.INTEGER,
        avatars_id: DataTypes.INTEGER,
        roles_id: DataTypes.INTEGER   
    },{
        sequelize, modelName: 'Users'
    })
    return Users;
}