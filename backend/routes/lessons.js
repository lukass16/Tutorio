const express = require('express');

const lessonsController = require('../controllers/lessons');

const router = express.Router();

// GET /api/lessons/:lessonId
router.get('/:lessonId', lessonsController.getLesson);

// GET /api/lessons/teacher/:teacherId
router.get('/teacher/:teacherId', lessonsController.getLessonsTeacher);

// GET /api/lessons/student/:studentId
router.get('/student/:studentId', lessonsController.getLessonsStudent);

// POST /api/lessons/
router.post('/', lessonsController.createLesson);

// PATCH /api/lessons/:lessonId
router.patch('/:lessonId', lessonsController.updateLesson);

// DELETE /api/lessons/:lessonId
router.delete('/:lessonId', lessonsController.deleteLesson);


module.exports = router;