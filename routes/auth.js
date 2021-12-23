const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const authController = require('../controllers/authController');

// * api/usuarios
router.post('/',
  [
    check('email', 'Ingresa un email válido').isEmail(),
    check('password', 'Password debe ser mínimo 6 caracteres').isLength({ min: 6 })
  ],
  authController.autenticarUsuario
);

router.get('/', 
  authMiddleware,
  authController.usuarioAutenticado
)
module.exports = router;