'use strict';
const { Terms } = require('./index');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Terms, {
        foreignKey: 'terms_id',
        as: 'termsInfo'
      });

      Products.hasMany(models.Variant, {
        foreignKey: 'product_id',
        as: 'variantInfo'
      });

      Products.belongsToMany(models.Tags, {
        through: 'producttag',
        foreignKey: 'product_id',
        as: 'tagInfo'
      })

      Products.belongsToMany(models.Tags, {
        through: 'tagproduct',
        foreignKey: 'product_id',
        as: 'tagInfos'
      })
    }
  }
  Products.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING,
    terms_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Terms',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: true,
    paranoid: true
  });
  return Products;
};