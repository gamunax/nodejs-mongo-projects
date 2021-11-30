const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// * api/usuarios
router.post('/',
  [
    check('email', 'add to email valid').isEmail(),
    check('password', 'password must be minimum of 6 caracters').isLength({ min: 6 })
  ],
  authController.autenticarUsuario
);

module.exports = router;