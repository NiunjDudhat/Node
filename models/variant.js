'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Variant.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'productInfo'
      })
    }
  }
  Variant.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Variant',
    timestamps: true,
    paranoid: true
  });
  return Variant;
};