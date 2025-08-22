var { Product } = require('../models');

exports.create = async function(req, res) {
  try {
    var product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAll = async function(req, res) {
  var products = await Product.findAll();
  res.json(products);
};

exports.update = async function(req, res) {
  try {
    var product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'No encontrado' });
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async function(req, res) {
  try {
    var product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'No encontrado' });
    await product.destroy();
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
