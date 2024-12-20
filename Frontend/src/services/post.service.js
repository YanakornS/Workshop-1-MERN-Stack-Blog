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
const getPosts = async () => {
  const response = await api.get(API_URL); // Using the same API_URL for the GET request
  return response;
};

// Get all posts
const getPostById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const getByPostId = async (req, res) => {};
const PostService = {
  createPost,
  getPosts,
  getPostById,
};

export default PostService;
