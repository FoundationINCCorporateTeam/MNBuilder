const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const ForumSchema = new mongoose.Schema({
  title: String,
  posts: [PostSchema]
});

module.exports = mongoose.model('Forum', ForumSchema);
