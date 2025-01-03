const PostModel = require("../Models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create Post controller
exports.createPost = async (req, res) => {
  //File upload
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const { path } = req.file.firebaseUrl;
  console.log(path);

  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "All Fields is requires" });
  }

  try {
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover: req.file.firebaseUrl,
      author,
    });
    if (!postDoc) {
      res.status(400).send({
        message: "Cannot create new post!",
      });
      return;
    }
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while creating a new post.",
    });
  }
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

  try {
    const postDoc = await PostModel.findById(id).populate("author", [
      "username",
    ]);
    if (!postDoc) {
      res.status(404).send({
        message: "Post notfound",
      });
      return;
    }
    res.json(postDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting post ByID",
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params; // รับ ID ของโพสต์จาก URL
  const authorId = req.userId; // ID ของผู้ใช้ที่เข้าสู่ระบบ
  try {
    // ค้นหาโพสต์ตาม ID
    const postDoc = await PostModel.findById(id);
    // ตรวจสอบว่าโพสต์มีอยู่
    if (!postDoc) {
      return res.status(404).json({ message: "Post not found" });
    }
    // ตรวจสอบว่า userId ของผู้ใช้ตรงกับ author ของโพสต์
    if (authorId !== postDoc.author.toString()) {
      return res.status(403).json({ message: "You cannot delete this post" });
    }
    // ลบโพสต์
    await PostModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({
      message: "An error occurred while deleting the post.",
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const authorId = req.userId;
  if (!id) return res.status(404).json({ message: "Post id is not Provided" });
  try {
    const postDoc = await PostModel.findById(id);
    if (authorId !== postDoc.author.toString()) {
      res.status(403).send({
        message: "You Cannnot update this post",
      });
      return;
    }

    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    if (req.file) {
      postDoc.cover = req.file.firebaseUrl;
    }
    await postDoc.save();
    res.json(postDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Somthing error occurrend white updating a post",
    });
  }
};

exports.getPostByUserId = async (req, res) => {
  const { id } = req.params; // รับ userId จาก URL

  try {
    const userPosts = await PostModel.find({ author: id })
      .populate("author", "username") // เพิ่มข้อมูลของ author (username)
      .sort({ createdAt: -1 }); // เรียงโพสต์จากใหม่ไปเก่า

    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error getting posts by user ID:", error.message);
    res.status(500).json({
      message: "An error occurred while getting posts by user ID.",
      error: error.message,
    });
  }
};
