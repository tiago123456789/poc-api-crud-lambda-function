const mongoose = require("mongoose")

const BlogPost = new mongoose.Schema({
  author: { type: String, required: [true, "The field author is required"] },
  title: { type: String, required: [true, "The field title is required"] },
  text: { type: String, required: [true, "The field text is required"] },
  createdAt: Date
});

module.exports = mongoose.model("posts", BlogPost)
