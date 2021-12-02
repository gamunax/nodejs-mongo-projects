const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const authMiddleware = require('../middleware/auth');
const {check} = require('express-validator');

router.post('/',
  authMiddleware,
  [
    check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.crearProyecto
);

router.get('/',
  authMiddleware,
  proyectoController.obtenerProyectos
);

router.put('/:id',
  authMiddleware,
  [
    check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
  ],
  proyectoController.actualizarProyecto
);

router.delete('/:id',
  authMiddleware,
  proyectoController.eliminarProyecto
);


module.exports = router;