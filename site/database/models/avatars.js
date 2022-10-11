'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class avatars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        avatars.hasMany(models.users,{
          as: 'imagenesAvatar',
          foreignKey: 'avatars_Id'
        })
    }
    
  }
  avatars.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'avatars',
  });
  return avatars;
};