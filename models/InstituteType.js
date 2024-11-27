const mongoose = require('mongoose');

const instituteTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Playhouse', 'School', 'College', 'Competitive Exam Center'],
  },
});

module.exports = mongoose.model('InstituteType', instituteTypeSchema);
