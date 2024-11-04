const express = require('express');
const router = express.Router();
const BookingRequest = require('../models/BookingRequests');

// Route to handle new booking request
router.post('/', async (req, res) => {
  const { 
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
    subject, // Add subject here
    username 
  } = req.body;

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
      subject, // Include subject in the booking request
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

// DELETE route to handle deleting a booking request by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRequest = await BookingRequest.findByIdAndDelete(req.params.id);
    if (!deletedRequest) {
      return res.status(404).json({ message: 'Booking request not found' });
    }
    res.status(200).json({ message: 'Booking request deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
