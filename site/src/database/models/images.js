'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      images.belongsTo(models.products,{
        as: 'imagenes',
        foreignKey: 'products_id',
      })
    }
  }
  images.init({
    name: DataTypes.STRING,
    products_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'images',
    timestamps: true
  });
  return images;
};