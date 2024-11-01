const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  start: {
    month: { type: String, required: true },
    year: { type: Number, required: true },
  },
  end: {
    month: { type: String, required: true },
    year: { type: Number, required: true },
  },
});

module.exports = mongoose.model('Semester', semesterSchema);
