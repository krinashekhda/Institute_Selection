const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Playhouse", "School", "College", "Competitive Exam Center"],
    required: true,
  },
  board: { type: String, enum: ["CBSE", "GSEB"] },
  medium: { type: String, enum: ["English", "Hindi"] },
  classCategory: {
    type: String,
    enum: ["pre-primary", "primary", "secondary", "higher-secondary"],
  },
  standard: { type: String, enum: ["LKG", "HKG", "8", "9", "10"] },
  subjects: [{ type: String }],
  university: { type: String },
  degreeType: { type: String },
  examType: { type: String },
});
module.exports = mongoose.model("Institute", InstituteSchema);
