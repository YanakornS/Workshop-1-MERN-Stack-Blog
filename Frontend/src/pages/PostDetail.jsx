import React, { useEffect, useState } from "react";
import PostService from "../services/post.service";
import TokenService from "../services/token.service"; // บริการที่ใช้ดึงข้อมูลผู้ใช้งาน
import { useParams } from "react-router";
import { useAuthContext } from "../Contexts/AuthContext";
import { compareAsc, format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // state สำหรับผู้ใช้งานปัจจุบัน
  const { user } = useAuthContext;
  const { id } = useParams(); // ดึง id จาก URL
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้งานปัจจุบัน
    const user = TokenService.getUser();
    setCurrentUser(user);

    // ดึงข้อมูลโพสต์
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          setPostDetail(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
          icon: "error",
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Delete",
      text: "Do you want to deltete this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        PostService.DeletePost(id); // เรียกใช้ฟังก์ชัน logout
        Swal.fire({
          title: "Delete Post",
          text: "Delete successfully",
          icon: "success",
        }).then(() => {
          navigate("/Home");
        });
      }
    });
  };

  if (!postDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  const Author = currentUser && currentUser.id === postDetail.author._id; // ตรวจสอบว่าเป็นเจ้าของโพสต์หรือไม่

  return (
    <div className="post-page min-h-full min-w-full flex items-center justify-center p-4 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-3xl fron-bold mb-4 text-gtey-800">
          {postDetail.title}
        </h1>
        <div className="text-grey-600 mb-4 text-center">
          <time className="block mb-2">
            {format(new Date(postDetail.createdAt), "dd MMMM yyyy HH:mm")}
          </time>
          <div className="author mb-2">
            <span className=" text-blue-500">
              @
              <a href={`/author/${postDetail.author._id}`}>
                {postDetail.author.username}
              </a>
            </span>
          </div>
        </div>
        {Author && (
          <div className="mt-6 flex gap-4 justify-center items-center">
            <a
              href={`/edit/${id}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Edit Post
            </a>
            <button
              onClick={() => handleDelete(postDetail._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}

        <div
          className=" mt-4 content text-grey-700"
          dangerouslySetInnerHTML={{ __html: postDetail.content }}
        ></div>
      </div>
    </div>
  );
};

export default PostDetail;
