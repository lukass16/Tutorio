const express = require("express");
const bodyParser = require("body-parser");

const teachersRoutes = require('./routes/teachers');
const studentsRoutes = require('./routes/students');
const lessonsRoutes = require('./routes/lessons');

const app = express();

// parsing incoming JSON body data
app.use(bodyParser.json());

// enabling communication across different servers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use('/api/teachers', teachersRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/lessons', lessonsRoutes);

app.listen(5000);
