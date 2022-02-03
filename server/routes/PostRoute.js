const express = require('express');
const router = express.Router();

/* define controller */
const PostController = require('../controllers/PostController');

/* define routes */
router.get('/', PostController.getPosts)
router.post('/create', PostController.createPost)

module.exports = router;