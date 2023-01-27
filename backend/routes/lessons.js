const express = require('express');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);