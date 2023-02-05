const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const teachersRoutes = require("./routes/teachers");
const studentsRoutes = require("./routes/students");
const lessonsRoutes = require("./routes/lessons");

const app = express();

// parsing incoming JSON body data
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE');

  next();
});

app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/lessons", lessonsRoutes);

// handling errors
app.use((error, req, res, next) => {
  res.status(500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb://dataquery:4Y7hjTQD3@95.217.14.19/data?authMechanism=DEFAULT&authSource=data`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
