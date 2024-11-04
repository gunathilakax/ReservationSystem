const mongoose = require('mongoose');

const bookingRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  numberOfStudents: { type: Number, required: true },
  roomType: { type: String, required: true },
  room: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: String, required: true },
  timeSlot: { type: String, required: true },
  note: { type: String, required: false },
  subject: { type: String, required: true }, // New subject field
  username: { type: String, required: true }
});

module.exports = mongoose.model('BookingRequest', bookingRequestSchema);
