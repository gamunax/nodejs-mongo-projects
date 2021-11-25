const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// * api/usuarios
router.post('/', 
 usuarioController.createUser
);

module.exports = router;