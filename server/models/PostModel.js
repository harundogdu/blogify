const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
    },
    slug: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

PostSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    next();
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;