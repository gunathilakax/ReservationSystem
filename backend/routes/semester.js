const express = require('express');
const router = express.Router();
const Semester = require('../models/Semester');

// Route to save semester configuration (POST request)
router.post('/', async (req, res) => {
  const { start, end } = req.body;

  try {
    // Either update existing or create new record
    let semesterConfig = await Semester.findOne();
    if (semesterConfig) {
      // Update existing configuration
      semesterConfig.start = start;
      semesterConfig.end = end;
      await semesterConfig.save();
    } else {
      // Create new configuration
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

module.exports = router;
