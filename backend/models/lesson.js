const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  subject: { type: String, required: true },
  comment_from_st: { type: String, required: true },
  date: { type: Date, required: true },
  place: { type: String, required: true },
  studentId: { type: mongoose.Types.ObjectId, ref: 'Student' },
  teacherId: { type: mongoose.Types.ObjectId, ref: 'Teacher' }
});

module.exports = mongoose.model('Lesson', lessonSchema);
