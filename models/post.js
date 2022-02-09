const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: 'string', required: true },
  author: { type: 'string', required: true },
  excerpt: { type: 'string' },
  content: { type: 'string', required: true },
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
