const PostModel = require("../Models/Post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

exports.createPost = async (req,res) =>{

    

}


















// Create a new post
exports.createPost = async (req, res) => {
  const { title, summary, content, cover } = req.body;

  // ตรวจสอบ Token เพื่อดึงข้อมูลผู้ใช้
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // ตรวจสอบความถูกต้องของ Token
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.id;

    // สร้างโพสต์ใหม่
    const newPost = await PostModel.create({
      title,
      summary,
      content,
      cover,
      author: userId, // ใช้ userId จาก Token
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};