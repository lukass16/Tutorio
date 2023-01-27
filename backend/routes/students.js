const express = require('express');

const studentsController = require('../controllers/students');

const router = express.Router();

// GET /api/students/:studentId
router.get('/:studentId', studentsController.getStudent);

// POST /api/students/signup
router.post('/signup', studentsController.signup);

// POST /api/students/login

// PATCH /api/students/:studentId
router.patch('/:studentId', studentsController.updateStudent);

// DELETE /api/students/:studentId
router.delete('/:studentId', studentsController.deleteStudent);

module.exports = router;