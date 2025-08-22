var { User } = require('../models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.register = async function(req, res) {
  try {
    var { username, password, role } = req.body;
    var user = await User.create({ username, password, role });
    res.json({ message: 'Usuario registrado', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async function(req, res) {
  try {
    var { username, password } = req.body;
    var user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    var valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    var token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secretkey');
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
