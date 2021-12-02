const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  try {
    const cifrado = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = cifrado.user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Token no válido' });
  }
}