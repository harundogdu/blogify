const express = require('express');
const router = express.Router();

/* define controller */
const PostController = require('../controllers/PostController');

/* define routes */
router
    .get('/', PostController.getPosts)
    .get('/:id', PostController.getPost)
    .post('/create', PostController.createPost)
    .put('/:id', PostController.updatePost)
    .delete('/:id', PostController.deletePost);

module.exports = router;