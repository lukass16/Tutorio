const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  lessons: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Lesson' }]
});

module.exports = mongoose.model('Student', studentSchema);
