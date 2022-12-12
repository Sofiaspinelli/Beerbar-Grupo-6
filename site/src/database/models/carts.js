'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      carts.belongsTo(models.users,{
        as: 'carritoUser',
        foreignKey: 'users_id',
      })
      carts.belongsTo(models.products,{
        as: 'carritoProduct',
        foreignKey: 'products_id',
      })
      carts.belongsTo(models.ordenes,{
        as: 'orden',
        foreignKey: 'ordenes_id'
      })
    }
  }
  carts.init({
    users_id: DataTypes.INTEGER,
    products_id: DataTypes.INTEGER,
    ordenes_id: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'carts',
    timestamps: true
  });
  return carts;
};