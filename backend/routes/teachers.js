const express = require('express');

const teachersController = require('../controllers/teachers');

const router = express.Router();

// GET /api/teachers/
router.get('/', teachersController.getTeachers);

// GET /api/teachers/:teacherId
router.get('/:teacherId', teachersController.getTeacher);

// POST /api/teachers/signup
router.post('/signup', teachersController.signup);

// GET /api/teachers/login

// PATCH /api/teachers/:teacherId
router.patch('/:teacherId', teachersController.updateTeacher);

// DELETE /api/teachers/:teacherId
router.delete('/:teacherId', teachersController.deleteTeacher);

module.exports = router;