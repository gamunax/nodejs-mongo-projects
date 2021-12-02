const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  userCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  dateCreator: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);