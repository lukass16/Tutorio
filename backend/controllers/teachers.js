const mongoose = require("mongoose");

const Teacher = require("../models/teacher");

exports.getTeachers = (req, res, next) => {
  Teacher.find()
    .then((teachers) => {
      res.status(200).json({ teachers: teachers });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.getTeacher = (req, res, next) => {
  const teacherId = req.params.teacherId;

  Teacher.findById(teacherId)
    .then((teacher) => {
      res.status(200).json({ teacher: teacher });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.signup = (req, res, next) => {
  const {
    name,
    surname,
    email,
    phone,
    description,
    password,
    subjects,
  } = req.body;

  const newTeacher = Teacher({
    name: name,
    surname: surname,
    email: email,
    phone: phone,
    description: description,
    image: req.file ? req.file.path : undefined,
    password: password,
    subjects: [subjects],
    lessons: [],
  });

  newTeacher
    .save()
    .then((newTeacher) => {
      res.status(200).json({ teacher: newTeacher });
    })
    .catch((err) => {
      // console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.updateTeacher = (req, res, next) => {
  const teacherId = req.params.teacherId;

  const {
    name,
    surname,
    email,
    phone,
    description,
    password,
    subjects,
    lessons,
  } = req.body;

  Teacher.findById(teacherId)
    .then((teacher) => {
      if (!teacher) {
        throw "Update failed: teacher not found!";
      }

      teacher.name = name;
      teacher.surname = surname;
      teacher.email = email;
      teacher.phone = phone;
      teacher.description = description;
      teacher.password = password;
      teacher.subjects = subjects;
      teacher.lessons = lessons;

      return teacher.save();
    })
    .then((teacher) => {
      res.status(200).json({ teacher: teacher });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.deleteTeacher = (req, res, next) => {
  const teacherId = req.params.teacherId;

  Teacher.findByIdAndRemove(teacherId)
    .then(() => {
      res.status(200).json({ message: "Successfuly deleted teacher!" });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};
