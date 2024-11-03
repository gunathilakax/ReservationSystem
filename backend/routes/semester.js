const express = require('express');
const router = express.Router();
const Semester = require('../models/Semester');
const Reservation = require('../models/Reservation');

// Route to save semester configuration (POST request)
router.post('/', async (req, res) => {
  const { start, end } = req.body;

  try {
    let semesterConfig = await Semester.findOne();
    if (semesterConfig) {
      semesterConfig.start = start;
      semesterConfig.end = end;
      await semesterConfig.save();
    } else {
      semesterConfig = new Semester({ start, end });
      await semesterConfig.save();
    }
    res.status(201).json(semesterConfig);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route to get current semester configuration (GET request)
router.get('/', async (req, res) => {
  try {
    const semesterConfig = await Semester.findOne();
    res.status(200).json(semesterConfig || { start: {}, end: {} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to reset semester configuration and delete all reservations (DELETE request)
router.delete('/reset', async (req, res) => {
  try {
    await Semester.deleteMany({}); // Delete semester configuration
    await Reservation.deleteMany({}); // Delete all reservations
    res.status(200).json({ message: 'Semester configuration and all reservations deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
