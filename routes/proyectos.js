const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const authMiddleware = require('../middleware/auth');

router.post('/',
  authMiddleware,
  proyectoController.crearProyecto
);

router.get('/',
  authMiddleware,
  proyectoController.crearProyecto
);

module.exports = router;