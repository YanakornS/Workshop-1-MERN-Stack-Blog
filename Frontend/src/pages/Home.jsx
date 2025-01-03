import React, { useEffect, useState } from "react";
import PostService from "../services/post.service";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-[#FCFAEE] min-h-screen py-8 bg-[#FCFAEE]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col space-y-6 ">
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

export default Home;
