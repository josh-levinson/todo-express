const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  description: {
    required: true,
    type: String,
  },
  complete: {
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model('Todo', dataSchema)