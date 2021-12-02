const mongoose = require('mongoose');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const proyecto = new Proyecto(req.body);
    proyecto.userCreator = req.usuario.id;

    await proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ userCreator: req.usuario.id }).sort({ dateCreator: -1 });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarProyecto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const nuevoProyecto = {};

  if (name) {
    nuevoProyecto.name = name;
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (proyecto.userCreator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });
    return res.json({ proyecto });

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}

exports.eliminarProyecto = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    let proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) {
      return res.status(404).json({ msg: 'Proyecto no encontrado' });
    }

    if (proyecto.userCreator.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: 'No autorizado' });
    }

    await Proyecto.findOneAndRemove({ _id: req.params.id });
    return res.json({ msg: 'Proyecto eliminado' });

  } catch (error) {
    console.log(error);
    return res.status(500).send('Hubo un error');
  }
}