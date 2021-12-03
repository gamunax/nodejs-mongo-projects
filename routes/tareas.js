const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const authMiddleware = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
  authMiddleware,
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
  ],
  tareaController.crearTarea
);


module.exports = router;