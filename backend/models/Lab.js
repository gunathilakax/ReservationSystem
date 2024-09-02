const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  LabName: { type: String, required: true },
  Department: { type: String, required: true },
  Capacity: { type: Number, required: true }
});

module.exports = mongoose.model('Lab', labSchema);
