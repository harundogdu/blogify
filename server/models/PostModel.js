const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
    image: {
        type: String,
    },
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
    },
    slug: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    tag: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Post', PostSchema);