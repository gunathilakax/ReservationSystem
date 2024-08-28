const Notice = require('../models/Notice');

// Create a new notice
const createNotice = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNotice = new Notice({ title, content });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notice' });
  }
};

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices' });
  }
};

// Edit a notice
const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.status(200).json(updatedNotice);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notice' });
  }
};

// Delete a notice
const deleteNotice = async (req, res) => {
  const { id } = req.params;
  try {
    await Notice.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notice' });
  }
};

module.exports = {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice
};
