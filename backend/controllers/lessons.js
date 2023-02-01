const mongoose = require("mongoose");

const Lesson = require("../models/lesson");

exports.getLessons = (req, res, next) => {
  Lesson.find()
    .then((lessons) => {
      res.status(200).json({ lessons : lessons });
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

exports.createLesson = (req, res, next) => {
  const { 
    subject, 
    comment_from_st, 
    date, 
    place, 
    lessonId, 
    studentId } = req.body;

    const newLesson = Lesson({
    subject: subject,
    comment_from_st: comment_from_st,
    date: date,
    place: place,
    lessonId: lessonId,
    studentId: studentId,
  });

  newLesson
    .save()
    .then((newLesson) => {
      res.status(200).json({ lesson : newLesson });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.updateLesson = (req, res, next) => {
  const { 
    subject, 
    comment_from_st, 
    date, 
    place, 
    lessonId, 
    studentId } = req.body;

    Lesson.findById(LessonId)
    .then((lesson) => {
      if (!lesson) {
        throw "Update failed: lesson not found!";
      }

      lesson.subject = subject;
      lesson.comment_from_st = comment_from_st;
      lesson.date = date;
      lesson.place = place;
      lesson.lessonId = lessonId;
      lesson.studentId = studentId;

      return lesson.save();
    })
    .then((student) => {
      res.status(200).json({ student: student });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.deleteLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;

  Lesson.findByIdAndRemove(lessonId)
    .then(() => {
      res.status(200).json({ message: "Successfuly deleted lesson!" });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};
