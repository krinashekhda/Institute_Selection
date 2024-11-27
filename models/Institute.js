const mongoose = require('mongoose');

const instituteSchema2 = new mongoose.Schema({
  instituteType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InstituteType',
    required: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
  medium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medium',
  },
  classCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassCategory',
  },
  university: String,
  degreeType: String,
  examType: String,
  standards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Standard',
  }],
  subjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  }],
});

module.exports = mongoose.model('Institute2', instituteSchema2);
