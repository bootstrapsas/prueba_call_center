var { Purchase, PurchaseItem, Product, User } = require('../models');

exports.create = async function(req, res) {
  try {
    var items = req.body.items; // [{productId, quantity}]
    var userId = req.user.id;

    var total = 0;
    var purchase = await Purchase.create({ userId, totalPrice: 0 });

    for (var item of items) {
      var product = await Product.findByPk(item.productId);
      if (!product || product.quantity < item.quantity) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }
      var price = product.price * item.quantity;
      total += price;
      await PurchaseItem.create({ purchaseId: purchase.id, productId: product.id, quantity: item.quantity, price });
      await product.update({ quantity: product.quantity - item.quantity });
    }

    await purchase.update({ totalPrice: total });
    res.json({ message: 'Compra realizada', purchaseId: purchase.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.history = async function(req, res) {
  var purchases = await Purchase.findAll({
    where: { userId: req.user.id },
    include: [{ model: PurchaseItem, include: [Product] }]
  });
  res.json(purchases);
};

exports.invoice = async function(req, res) {
  var purchase = await Purchase.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ['username'] },
      { model: PurchaseItem, include: [Product] }
    ]
  });
  if (!purchase) return res.status(404).json({ error: 'No encontrada' });
  res.json(purchase);
};

exports.allPurchases = async function(req, res) {
  var purchases = await Purchase.findAll({
    include: [
      { model: User, attributes: ['username'] },
      { model: PurchaseItem, include: [Product] }
    ]
  });
  res.json(purchases);
};
