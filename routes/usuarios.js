const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// * api/usuarios
router.post('/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'add to email valid').isEmail(),
    check('password', 'password must be minimum of 6 caracters').isLength({ min: 6 })
  ],
  usuarioController.createUser
);

module.exports = router;