const PostModel = require("../Models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create Post controller
exports.createPost = async (req, res) => {
  // File upload
  const { path: cover } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All fields is required" });
  }
  const postDoc = await PostModel.create({
    title,
    summary,
    content,
    cover,
    author,
  });
  res.json(postDoc);
};

// Get all posts
exports.getPosts = async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", "username") // Populate author data if needed
    .sort({ createdAt: -1 }) // Sort by most recent posts
    .limit(20);
  res.json(posts);
};

// Get a post by ID
exports.getById = async (req, res) => {
  const { id } = req.params; // ID passed as a parameter

  const postDoc = await PostModel.findById(id)
    .populate("author", "username")
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the post." });
    });
};
