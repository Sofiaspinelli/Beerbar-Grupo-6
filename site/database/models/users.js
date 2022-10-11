'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.roles,{
        as: 'rol',
        foreignKey: 'roles_Id'
      }),
      users.belongsTo(models.avatars,{
        as: 'imagenesAvatar',
        foreignKey: 'avatars_Id'
      }),
      users.hasMany(models.carts,{
          as: 'carritoUsers',
          foreignKey: 'carts_Id',
        })
    }
  }
  users.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    genero: DataTypes.STRING,
    contacto: DataTypes.INTEGER,
    avatars_id: DataTypes.INTEGER,
    roles_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};