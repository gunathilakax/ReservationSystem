const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Route to handle new reservation (POST request)
router.post('/', async (req, res) => {
  const { fullName, email, phone, department, numberOfStudents, roomType, room, date, duration, timeSlot, note, username } = req.body;

  try {
    const newReservation = new Reservation({
      fullName,
      email,
      phone,
      department,
      numberOfStudents,
      roomType,
      room,
      date,
      duration,
      timeSlot,
      note,
      username,
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get reservations by username (GET request)
router.get('/', async (req, res) => {
  const { username } = req.query;

  try {
    const reservations = username 
      ? await Reservation.find({ username }) 
      : await Reservation.find(); // Get all reservations if no username is provided

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
