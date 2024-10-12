// src/routes/lecturehall.js
const express = require('express');
const router = express.Router();
const LectureHall = require('../models/LectureHall');

// Route to add a reservation to a specific lecture hall
router.post('/reserve', async (req, res) => {
  const { hallNo, date, timeSlot } = req.body;

  try {
    const lectureHall = await LectureHall.findOne({ "Hall No":hallNo });

    if (!lectureHall) {
      return res.status(404).json({ message: 'Lecture hall not found' });
    }

    // Check if the time slot on that date is already booked
    const isAlreadyReserved = lectureHall.reservations.some(
      reservation => reservation.date.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0] &&
                     reservation.timeSlot === timeSlot
    );

    if (isAlreadyReserved) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    // Add the new reservation
    lectureHall.reservations.push({ date, timeSlot });

    await lectureHall.save();
    res.status(200).json({ message: 'Reservation added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
