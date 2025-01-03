import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // ใช้ useParams
import PostService from "../services/post.service";
import Post from "../components/Post";

const PostByAuthor = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams(); // ดึง id จาก URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPostByAuth(id);
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the posts:", error);
      }
    };

    if (id) fetchPosts();
  }, [id]);

  return (
    <div className="bg-[#FCFAEE] min-h-screen py-8 bg-[#FCFAEE]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {posts.length > 0 &&
            posts.map((post, index) => (
              <Post
                key={index}
                {...post}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostByAuthor;
