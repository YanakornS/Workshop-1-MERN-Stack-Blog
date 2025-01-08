import React, { useEffect, useState } from "react";
import { useParams } from "react-router"; // ใช้ useParams
import PostService from "../services/post.service";
import Post from "../components/Post";
import { useAuthContext } from "../Contexts/AuthContext";

const PostByAuthor = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams(); // ดึง id จาก URL
  const { user } = useAuthContext();

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
    <div className="bg-[#FCFAEE] min-h-screen py-8 flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="card bg-white shadow-xl rounded-lg w-96 p-4">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                className="w-16 h-16 rounded-full border-2 border-gray-300"
                src="https://cdn-icons-png.freepik.com/512/7718/7718888.png"
                alt="User Profile"
              />
              {/* Green Dot */}
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">User Profile</h2>
              <p className="text-gray-800">
                <strong>
                  Username:<a className="text-blue-500">@{user.username}</a>
                </strong>
              </p>
            </div>
          </div>
        </div>

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
