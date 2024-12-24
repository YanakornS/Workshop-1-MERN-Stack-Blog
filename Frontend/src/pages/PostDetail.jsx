import React, { useEffect, useState } from "react";
import PostService from "../services/post.service";
import TokenService from "../services/token.service"; // บริการที่ใช้ดึงข้อมูลผู้ใช้งาน
import { useParams } from "react-router";
import Swal from "sweetalert2";

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // state สำหรับผู้ใช้งานปัจจุบัน
  const { id } = useParams(); // ดึง id จาก URL

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

  const handleDelete = async () => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        await PostService.deletePostById(id);
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
        // Redirect or update UI after deletion
        window.location.href = "/";
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "An error occurred while deleting the post.",
        icon: "error",
      });
    }
  };

  if (!postDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  const isOwner = currentUser && currentUser.id === postDetail.author._id; // ตรวจสอบว่าเป็นเจ้าของโพสต์หรือไม่

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* ภาพปก */}
        <img
          src={`${import.meta.env.VITE_URL}/${postDetail.cover}`}
          alt={postDetail.title}
          className="w-full h-96 object-cover"
        />

        {/* เนื้อหา */}
        <div className="p-8">
          {/* ชื่อเรื่อง */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {postDetail.title}
          </h1>

          {/* ผู้เขียนและวันที่ */}
          <div className="text-sm text-gray-500 mb-6">
            By{" "}
            <span className="font-medium text-gray-700">
              {postDetail.author.username}
            </span>{" "}
            | {new Date(postDetail.createdAt).toLocaleDateString()}
          </div>

          {/* เนื้อหา */}
          <div
            className="text-lg text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: postDetail.content }}
          ></div>

          {/* ปุ่ม Edit และ Delete (เฉพาะเจ้าของโพสต์) */}
          {isOwner && (
            <div className="mt-6 flex gap-4">
              <a
                href={`/edit/${id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </a>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
