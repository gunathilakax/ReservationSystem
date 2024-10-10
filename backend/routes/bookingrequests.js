const express = require('express');
const router = express.Router();
const BookingRequest = require('../models/BookingRequests');

// Route to handle new booking request
router.post('/', async (req, res) => {
  const { fullName, email, phone, department, numberOfStudents, roomType, room, date, duration, timeSlot, note, username } = req.body;

  try {
    const newBookingRequest = new BookingRequest({
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

    await newBookingRequest.save();
    res.status(201).json(newBookingRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get booking requests by username
router.get('/', async (req, res) => {
  const { username } = req.query;

  try {
    const bookingRequests = username 
      ? await BookingRequest.find({ username }) 
      : await BookingRequest.find(); // Get all booking requests if no username is provided

    res.status(200).json(bookingRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
