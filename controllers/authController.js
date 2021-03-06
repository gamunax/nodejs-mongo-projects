const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    const passwordSuccess = await bcryptjs.compare(password, user.password)
    if (!passwordSuccess) {
      return res.status(400).json({ msg: 'Password incorrecto' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 7_200
    }, (error, token) => {
      if (error) throw error;

      res.status(200).json({ token });
    });
  } catch (error) {
    console.log(error);
  }
}

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    res.status(200).json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
}