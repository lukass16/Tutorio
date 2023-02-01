const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  subject: { type: String, required: true },
  comment_from_st: { type: String, required: true },
  date: { type: String, required: true },
  place: { type: String, required: true },
  lessonID: { type: mongoose.Types.ObjectId, required: true, ref: 'Student' },
  studentID: { type: mongoose.Types.ObjectId, required: true, ref: 'Teacher' }
});

module.exports = mongoose.model('Lesson', teacherSchema);
