'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      types.hasMany(models.products,{
        as: 'tipos',
        foreignKey: 'type_id',
      })
    }
  }
  types.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'types',
    timestamps: true
  });
  return types;
};