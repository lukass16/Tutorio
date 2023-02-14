const express = require('express');

const studentsController = require('../controllers/students');

const router = express.Router();

// GET /api/students/
router.get('/', studentsController.getStudents);

// GET /api/students/:studentId
router.get('/:studentId', studentsController.getStudent);

// POST /api/students/signup
router.post('/signup', studentsController.signup);

// POST /api/students/login
router.post('/login', studentsController.login);

// PATCH /api/students/:studentId
router.patch('/:studentId', studentsController.updateStudent);

// DELETE /api/students/:studentId
router.delete('/:studentId', studentsController.deleteStudent);

module.exports = router;