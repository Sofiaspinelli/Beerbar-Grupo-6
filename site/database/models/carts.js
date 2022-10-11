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
        as: 'carritoUsers',
        foreignKey: 'users_Id',
      })
      carts.belongsTo(models.products,{
        as: 'carritoProducts',
        foreignKey: 'products_Id',
      })
    }
  }
  carts.init({
    users_id: DataTypes.INTEGER,
    products_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'carts',
  });
  return carts;
};