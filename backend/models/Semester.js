const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  startMonth: { type: String, required: true },
  startYear: { type: Number, required: true },
  endMonth: { type: String, required: true },
  endYear: { type: Number, required: true },
});

module.exports = mongoose.model('Semester', semesterSchema);
