import React, { useEffect, useState } from "react";
import PostService from "../services/post.service";
import { useParams } from "react-router";

const PostDetail = () => {
  const { PostDetail, setPostDetail } = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id); // เรียกใช้ getById
        if (response.status === 200) {
          setPostDetail(response.data); // เก็บข้อมูลใน state
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
  return <div>Athor </div>;
};

export default PostDetail;
