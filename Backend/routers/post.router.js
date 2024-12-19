const express = require("express");
const router = express.Router();
const postController = require("../Controllers/post.controllers");
const { upload } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middlewares");

//http://localhost:5000/api/v1/auth/post

router.post("", authJwt.verifyToken, upload, postController.createPost);

// GET: Get all posts
router.get("/", postController.getAllPosts);

module.exports = router;
