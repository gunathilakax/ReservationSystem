const express = require('express');
const router = express.Router();
const {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice
} = require('../controllers/noticeController');

router.post('/create', createNotice);
router.get('/', getAllNotices);
router.put('/edit/:id', updateNotice);
router.delete('/delete/:id', deleteNotice);

module.exports = router;
