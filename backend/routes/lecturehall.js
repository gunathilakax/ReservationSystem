// src/routes/lecturehall.js
const express = require('express');
const router = express.Router();
const LectureHall = require('../models/LectureHall');

// Route to get all lecture halls
router.get('/', async (req, res) => {
  try {
    const lectureHalls = await LectureHall.find();
    res.status(200).json(lectureHalls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
