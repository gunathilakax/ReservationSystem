// models/Reservation.js
const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
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
  username: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
