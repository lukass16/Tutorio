const express = require('express');

const teachersController = require('../controllers/teachers');
const fileUpload = require('../middleware/file-upload'); // importing file uploader middleware

const router = express.Router();

// GET /api/teachers/
router.get('/', teachersController.getTeachers);

// GET /api/teachers/:teacherId
router.get('/:teacherId', teachersController.getTeacher);

// POST /api/teachers/signup
router.post('/signup', fileUpload.single('image'), teachersController.signup); // before executing controller action, we extract a file form an 'image' key from the incoming request

// GET /api/teachers/login

// PATCH /api/teachers/:teacherId
router.patch('/:teacherId', teachersController.updateTeacher);

// DELETE /api/teachers/:teacherId
router.delete('/:teacherId', teachersController.deleteTeacher);

module.exports = router;