const mongoose = require("mongoose");

const Lesson = require("../models/lesson");
const Teacher = require("../models/teacher");
const Student = require("../models/student");

exports.getLessons = (req, res, next) => {
  Lesson.find()
    .then((lessons) => {
      res.status(200).json({ lessons: lessons });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.getLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;

  Lesson.findById(lessonId)
    .then((lesson) => {
      res.status(200).json({ lesson: lesson });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.getLessonsTeacher = (req, res, next) => {
  const teacherId = req.params.teacherId;

  Teacher.findById(teacherId)
    .populate("lessons")
    .then((teacher) => {
      if (!teacher) {
        throw "Cannot retrieve lessons: teacher ID not found!";
      }
      res.status(200).json({ lessons: teacher.lessons });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.getLessonsStudent = (req, res, next) => {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .populate("lessons")
    .then((student) => {
      if (!student) {
        throw "Cannot retrieve lessons: student ID not found!";
      }
      res.status(200).json({ lessons: student.lessons });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.createLesson = async (req, res, next) => {
  const { subject, price, start, end, place, teacherId } =
    req.body;

  const newLesson = Lesson({
    subject: subject,
    price: price,
    start: start,
    end: end,
    place: place,
    status: "AVAILABLE",
    teacherId: teacherId,
  });

  // finding referenced teacher
  let teacher = null;
  try {
    teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      throw "Update failed: lesson not found!";
    }
  } catch (err) {
    return next(err);
  }

  // saving lesson and adding the lesson to the teacher's lessons
  try {
    // todo - make this into a transaction
    await newLesson.save();
    teacher.lessons.push(newLesson);
    await teacher.save();
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ lesson: newLesson });
};

exports.updateLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;
  const { subject, price, comment_from_st, start, end, place, status, studentId } =
    req.body;

  Lesson.findById(lessonId)
    .then((lesson) => {
      if (!lesson) {
        throw "Update failed: lesson not found!";
      }

      // checking if incoming data is null or undefined, if not, update the lesson
      lesson.subject = subject ?? lesson.subject;
      lesson.price = price ?? lesson.price;
      lesson.comment_from_st = comment_from_st ?? lesson.comment_from_st;
      lesson.start = start ?? lesson.start;
      lesson.end = end ?? lesson.end;
      lesson.place = place ?? lesson.place;
      lesson.status = status ?? lesson.status;
      lesson.studentId = studentId ?? lesson.studentId;

      return lesson.save();
    })
    .then((lesson) => {
      res.status(200).json({ lesson: lesson });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.deleteLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;

  Lesson.findById(lessonId)
    .then((lesson) => {
      if(!lesson)
      {
        throw "Lesson not found, unable to delete!";
      }
      return Teacher.findById(lesson.teacherId);
    })
    .then((teacher) => {
      let index = teacher.lessons.indexOf(lessonId);
      teacher.lessons.splice(index, 1);
      return teacher.save();
    })
    .then(() => {
      Lesson.findByIdAndRemove(lessonId);
      res.status(200).json({ message: "Successfuly deleted lesson!" });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};
