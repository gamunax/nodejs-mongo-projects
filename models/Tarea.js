const mongoose = require('mongoose');

const TareaSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: Boolean,
    default: false
  },
  dateCreator: {
    type: Date,
    default: Date.now()
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto'
  }
});

module.exports = mongoose.model('Tarea', TareaSchema);