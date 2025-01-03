const express = require("express");
const router = express.Router();
const postController = require("../Controllers/post.controllers");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middlewares");

//http://localhost:5000/api/v1/auth/post

router.post(
  "",
  authJwt.verifyToken,
  upload,
  uploadToFirebase,
  postController.createPost
);

// GET: Get all posts
router.get("/", postController.getPosts);

// GET: GetBYID posts
router.get("/:id", postController.getById);

// Delete: Delete  posts ByID
router.delete("/:id", authJwt.verifyToken, postController.deletePost);

// Delete: Update posts ByID
router.put(
  "/:id",
  authJwt.verifyToken,
  upload,
  uploadToFirebase,
  postController.updatePost
);

router.get("/author/:id", postController.getPostByUserId);

module.exports = router;
