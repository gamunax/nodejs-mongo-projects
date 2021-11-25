const Usuario = require('../models/Usuario');

exports.createUser = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();

    res.send('Usuario creado correctamente');
  } catch (error) {
    console.log('error', error);
    res.status(400).send('Ocurrió un error');
  }

}