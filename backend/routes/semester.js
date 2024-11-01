const express = require('express');
const router = express.Router();
const Semester = require('../models/Semester'); // Assuming you have a Semester model

// Route to save semester configuration (POST request)
router.post('/', async (req, res) => {
  const { startMonth, startYear, endMonth, endYear } = req.body;

  try {
    // Check if there's already a configuration and update or create
    let semesterConfig = await Semester.findOne();
    if (semesterConfig) {
      // Update existing configuration
      semesterConfig.startMonth = startMonth;
      semesterConfig.startYear = startYear;
      semesterConfig.endMonth = endMonth;
      semesterConfig.endYear = endYear;
      await semesterConfig.save();
    } else {
      // Create new configuration
      semesterConfig = new Semester({ startMonth, startYear, endMonth, endYear });
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
    res.status(200).json(semesterConfig || { startMonth: '', startYear: '', endMonth: '', endYear: '' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
