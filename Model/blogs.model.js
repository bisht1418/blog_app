const { Schema, model } = require("mongoose");
const blogSchema = new Schema({
  title: String,
  content: String,
  category: String,
  date: String,
  likes: { type: Number, default: 0 },
  comments: { type: String, default: 0 },
  username: String,
  id: String,
  avatar: String,
});

const blogModel = model("blog", blogSchema);

module.exports = { blogModel };
