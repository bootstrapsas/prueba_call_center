'use strict';
module.exports = (sequelize, DataTypes) => {
  var PurchaseItem = sequelize.define('PurchaseItem', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  });

  PurchaseItem.associate = function(models) {
    PurchaseItem.belongsTo(models.Purchase, { foreignKey: 'purchaseId' });
    PurchaseItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return PurchaseItem;
};
