'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ordenes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ordenes.belongsTo(models.users,{
        as: 'usuario',
        foreignKey: 'users_id'
      })
      ordenes.hasMany(models.carts,{
        as: 'carrito',
        foreignKey: 'ordenes_id'
      })
    }
  }
  ordenes.init({
    users_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ordenes',
  });
  return ordenes;
};