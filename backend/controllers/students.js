const mongoose = require("mongoose");

const Student = require("../models/student");

const bcrypt = require("bcryptjs");

exports.getStudents = (req, res, next) => {
  Student.find()
    .then((students) => {
      res.status(200).json({ students: students });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.getStudent = (req, res, next) => {
  const studentId = req.params.studentId;

  Student.findById(studentId)
    .then((student) => {
      res.status(200).json({ student: student });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.signup = (req, res, next) => {
  const { id, name, surname, email, phone, password, lessons } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      hashedPassword = hashedPw;
    })
    .catch((err) => {
      console.log(err);
      console.log("Error in hashing password");
      const error = new Error(err);
      return next(error);
    });

  const newStudent = Student({
    id: id,
    name: name,
    surname: surname,
    email: email,
    phone: phone,
    password: hashedPassword,
    lessons: lessons,
  });

  newStudent
    .save()
    .then((newStudent) => {
      res.status(200).json({ student: newStudent });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.updateStudent = (req, res, next) => {
  const studentId = req.params.studentId;

  const { name, surname, email, phone, password, lessons } = req.body;

  Student.findById(studentId)
    .then((student) => {
      if (!student) {
        throw "Update failed: student not found!";
      }

      student.name = name;
      student.surname = surname;
      student.email = email;
      student.phone = phone;
      student.password = password;
      student.lessons = lessons;

      return student.save();
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

exports.deleteStudent = (req, res, next) => {
  const studentId = req.params.studentId;

  Student.findByIdAndRemove(studentId)
    .then(() => {
      res.status(200).json({ message: "Successfuly deleted student!" });
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err);
      return next(error);
    });
};

exports.login = (req, res, next) => {
  let existingStudent;
  const { email } = req.body;
  console.log(email);
  console.log(req.body);
  /*Student.findOne({ email: email }).then((student) => {
    if (!student) {
      const error = new Error("A student with this email could not be found!");
      error.statusCode = 401;
      throw error;
    }
    existingStudent = student;
    return bcrypt.compare(req.body.password, student.password);
  })
  .then(alert("You are logged in!"));*/
};
