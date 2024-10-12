const mongoose = require('mongoose');

const LectureHallSchema = new mongoose.Schema({
  hallNo: { type: String, required: true },
  capacity: { type: Number, required: true },
  multimediaProjector: { type: Number, required: true },
  whiteBoard: { type: Number, required: true },
  tv: { type: Number, required: true },
  wallFans: { type: Number, required: true },
  cellingFans: { type: Number, required: true },
  speakers: { type: Number, required: true },
  reservations: [
    {
      date: { type: Date, required: true },
      timeSlot: { type: String, required: true },
    }
  ]
});

module.exports = mongoose.model('LectureHall', LectureHallSchema);
