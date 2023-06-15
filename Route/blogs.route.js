const express = require("express");
const blogRouter = express.Router();
const { blogModel } = require("../Model/blogs.model");

blogRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newBlogs = new blogModel({
      ...req.body,
    });
    await newBlogs.save();
    res.json({ message: newBlogs });
  } catch (error) {
    res.json({ message: error.message });
  }
});

blogRouter.get("/", async (req, res) => {
  let blogs = await blogModel.find();
  res.json({ message: blogs });
});

module.exports = { blogRouter };
