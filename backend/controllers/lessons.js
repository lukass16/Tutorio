const mongoose = require("mongoose");

const Lesson = require("../models/lesson");

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

exports.createLesson = (req, res, next) => {
  const { subject, price, comment_from_st, start, end, place, teacherId } = req.body;

  const newLesson = Lesson({
    subject: subject,
    price: price,
    comment_from_st: comment_from_st,
    start: start,
    end: end,
    place: place,
    teacherId: teacherId,
  });

  newLesson
    .save()
    .then((newLesson) => {
      res.status(200).json({ lesson: newLesson });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.updateLesson = (req, res, next) => {
  const lessonId = req.params.lessonId;
  const { subject, price, comment_from_st, start, end, place, studentId } = req.body;

  Lesson.findById(lessonId)
    .then((lesson) => {
      if (!lesson) {
        throw "Update failed: lesson not found!";
      }

      lesson.subject = subject;
      lesson.price = price;
      lesson.comment_from_st = comment_from_st;
      lesson.start = start;
      lesson.end = end;
      lesson.place = place;
      // not changing teacherId as that should not change
      lesson.studentId = studentId;

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
