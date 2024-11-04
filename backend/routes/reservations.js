const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Route to handle new reservation (POST request)
router.post('/', async (req, res) => {
  const { fullName, email, phone, department, subject, numberOfStudents, roomType, room, date, duration, timeSlot, note, username, setForEveryWeek } = req.body;

  try {
    // Store all the reservations
    const reservations = [];
    let startDate = new Date(date);

    if (setForEveryWeek) {
      // Create reservations for each week for six months (approximately 26 weeks)
      for (let i = 0; i < 26; i++) {
        const newReservation = new Reservation({
          fullName,
          email,
          phone,
          department,
          subject,
          numberOfStudents,
          roomType,
          room,
          date: new Date(startDate), // Set date for each reservation
          duration,
          timeSlot,
          note,
          username,
        });
        reservations.push(newReservation);
        startDate.setDate(startDate.getDate() + 7); // Move to the next week
      }
      // Insert all reservations at once
      await Reservation.insertMany(reservations);
    } else {
      // For a single reservation
      const newReservation = new Reservation({
        fullName,
        email,
        phone,
        department,
        subject,
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
    }

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get reservations by username and optionally by date (GET request)
router.get('/', async (req, res) => {
  const { username, date } = req.query;

  try {
    let query = {};
    if (username) query.username = username;
    if (date) query.date = new Date(date); // Ensure the date is in the correct format

    const reservations = await Reservation.find(query);

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get reservations by date and optionally by room (GET request)
router.get('/', async (req, res) => {
  const { date, room } = req.query;

  try {
    let query = {};
    
    if (date) {
      query.date = new Date(date); // Ensure the date is in the correct format
    }
    
    // Only filter by room if it's provided and not empty
    if (room) {
      query.room = room; 
    }

    const reservations = await Reservation.find(query);

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
