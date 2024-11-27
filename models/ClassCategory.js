const mongoose = require('mongoose');

const classCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Pre-primary', 'Primary', 'Secondary', 'Higher Secondary'],
  },
});

module.exports = mongoose.model('ClassCategory', classCategorySchema);
