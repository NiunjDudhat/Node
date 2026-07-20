'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tags.belongsToMany(models.Products, {
        through: 'producttag',
        foreignKey: 'tag_id',
        as: 'productInfo'
      })

      Tags.belongsToMany(models.Products, {
        through: 'tagproduct',
        foreignKey: 'tag_id',
        as: 'productInfos'
      })
    }
  }
  Tags.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tags',
  });
  return Tags;
};