const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/VerifyToken');

/* define controller */
const PostController = require('../controllers/PostController');

/* define routes */
router
    .get('/', PostController.getPosts)
    .get('/:id', PostController.getPost)
    .post('/create', verifyToken, PostController.createPost)
    .put('/:id', verifyToken, PostController.updatePost)
    .delete('/:id', verifyToken, PostController.deletePost);

module.exports = router;