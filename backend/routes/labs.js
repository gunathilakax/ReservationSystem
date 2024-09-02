const express = require('express');
const router = express.Router();
const Lab = require('../models/Lab');

// Get all labs
router.get('/', async (req, res) => {
  try {
    const labs = await Lab.find();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
