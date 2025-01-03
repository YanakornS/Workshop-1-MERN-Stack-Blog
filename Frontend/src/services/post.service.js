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

// Get postsBYID
const getPostById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

// Delete posts
const DeletePost = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

// UpdatePost posts
const updatePost = async (id, post) => {
  return await api.put(`${API_URL}/${id}`, post);
};

const getPostByAuth = async (id) => {
  return await api.get(`${API_URL}/author/${id}`);
};

const PostService = {
  createPost,
  getPosts,
  getPostById,
  DeletePost,
  updatePost,
  getPostByAuth,
};

export default PostService;
