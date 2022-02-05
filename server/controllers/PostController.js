const Post = require("../models/PostModel");

module.exports.getPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        return res.status(200).json(posts);
    }).sort({ date: -1 });
}

module.exports.getPost = async (req, res) => {
    const currentPost = await Post.findById(req.params.id);
    if (!currentPost) {
        return res.status(404).json({
            message: "Post not found"
        });
    }
    return res.status(200).json(currentPost);
}

module.exports.createPost = (req, res) => {
    const newPost = new Post({
        ...req.body,
        author: req.userId
    });
    newPost.save((err) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        return res.status(201).json({
            message: 'Post created successfully'
        });
    })

}

module.exports.updatePost = async (req, res) => {
    const currentPost = await Post.findById(req.params.id);
    if (!currentPost) {
        return res.status(404).json({
            message: "Post not found"
        });
    }
    await Post.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        return res.status(200).json({
            message: 'Post updated successfully'
        });
    })
}

module.exports.deletePost = async (req, res) => {
    const currentPost = await Post.findById(req.params.id);
    if (!currentPost) {
        return res.status(404).json({
            error: 'Post not found'
        });
    }
    await currentPost.remove((err) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        return res.status(200).json({
            message: 'Post deleted successfully'
        });
    })
}
