'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    lotNumber: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    entryDate: DataTypes.DATE
  });

  Product.associate = function(models) {
    Product.hasMany(models.PurchaseItem, { foreignKey: 'productId' });
  };

  return Product;
};
