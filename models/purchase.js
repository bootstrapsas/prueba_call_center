'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchase = sequelize.define('Purchase', {
    totalPrice: DataTypes.FLOAT,
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  Purchase.associate = function(models) {
    Purchase.belongsTo(models.User, { foreignKey: 'userId' });
    Purchase.hasMany(models.PurchaseItem, { foreignKey: 'purchaseId' });
  };

  return Purchase;
};
