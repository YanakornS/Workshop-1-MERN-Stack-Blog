import api from "./api";
const API_URL = import.meta.env.VITE_BASE + "post";

const createPost = async (post) => {
  const response = await api.post(API_URL, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// Get all posts
const getAllPosts = async () => {
  const response = await api.get(API_URL); // Using the same API_URL for the GET request
  return response;
};

const PostService = {
  createPost,
   getAllPosts, 
};

export default PostService;
