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

exports.obtenerTareas = async (req, res) => {
  try {
    const proyectoId = req.params.proyectoId;
    const existProyecto = await Proyecto.findById(proyectoId);
    if (!existProyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (existProyecto.userCreator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const tareas = await Tarea.find({ proyecto: proyectoId });
    return res.json({ tareas });

  } catch (error) {
    console.log(error);
    return res.status(500).json('Hubo un error');
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, name, state } = req.body;

    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: 'No existe esa tarea' });
    }

    if (tarea.proyecto.toString() !== proyecto) {
      return res.status(401).json({ msg: 'Tarea no pertenece a este proyecto' });
    }

    const proyectoExiste = await Proyecto.findById(proyecto);
    if (!proyectoExiste) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (proyectoExiste.userCreator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    const nuevaTarea = {};

    if (name) {
      nuevaTarea.name = name;
    }
    if (state) {
      nuevaTarea.state = state;
    }

    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });

    return res.json({ tarea });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Hubo un error');
  }
}

exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto } = req.body;

    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: 'No existe esa tarea' });
    }

    if (tarea.proyecto.toString() !== proyecto) {
      return res.status(401).json({ msg: 'Tarea no pertenece a este proyecto' });
    }

    const proyectoExiste = await Proyecto.findById(proyecto);
    if (!proyectoExiste) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (proyectoExiste.userCreator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await Tarea.findOneAndRemove({ _id: req.params.id });
    return res.json({ msg: 'Tarea eliminada' });

  } catch (error) {
    console.log(error);
    return res.status(500).json('Hubo un error');
  }
};