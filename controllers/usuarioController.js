const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    usuario = new Usuario(req.body);

    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
    await usuario.save();

    res.status(200).json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log('error', error);
    res.status(400).send('Ocurrió un error');
  }

}