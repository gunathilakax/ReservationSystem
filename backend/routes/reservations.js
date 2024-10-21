// routes/reservations.js
const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// POST route to create a new reservation
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
      username
    });

    await newReservation.save();
    return res.status(201).json(newReservation);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create reservation.', error });
  }
});

// GET route to fetch all reservations for a specific user
router.get('/', async (req, res) => {
  const { username } = req.query;

  try {
    const reservations = await Reservation.find({ username });
    return res.status(200).json(reservations);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch reservations.', error });
  }
});

module.exports = router;
