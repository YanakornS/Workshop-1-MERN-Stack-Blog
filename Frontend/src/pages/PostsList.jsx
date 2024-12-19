import React, { useEffect, useState } from "react";
import PostService from "../services/post.service";
const API_URL = import.meta.env.VITE_BASE
const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await PostService.getAllPosts();
        setPosts(response.data); // Assuming the response contains an array of posts
      } catch (error) {
        console.error("There was an error fetching the posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Latest Blog Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-500">
            No posts available.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {post.cover && (
  <img
    src={`http://localhost:5000/${post.cover}`} // ให้ใช้ URL ที่เหมาะสมกับ path ของภาพ
    alt={post.title}
    className="w-full h-56 sm:h-72 object-cover object-center"
  />
)}

              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-indigo-600 transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-lg text-gray-600 mb-4">{post.summary}</p>
                <a
                  href={`/posts/${post._id}`}
                  className="inline-block text-indigo-600 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsList;
