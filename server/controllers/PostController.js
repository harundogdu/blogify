const Post = require("../models/PostModel");

module.exports.getPosts = async (req, res) => {
    return res.json({
        posts: [
            {
                id: 1,
                title: 'Post 1',
                content: 'This is the first post'
            }
        ]
    });
}

module.exports.createPost = async (req, res) => {
    const post = new Post(req.body);
    await post.save((err) => {
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
