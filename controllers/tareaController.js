const mongoose = require('mongoose');
const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { proyecto } = req.body;
    const existProyecto = await Proyecto.findById(proyecto);
    if (!existProyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (existProyecto.userCreator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const tarea = new Tarea(req.body);
    await tarea.save();
    return res.json({ tarea });

  } catch (error) {
    console.log(error);
    return res.status(500).json('Hubo un error');
  }
};