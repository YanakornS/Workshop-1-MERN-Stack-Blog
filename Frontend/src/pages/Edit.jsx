import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import Editor from "../components/Editor";

const Edit = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });

  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // รับ ID จาก URL
useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await PostService.getPostById(id);
        const post = response.data;
        setPostDetail({
          title: post.title,
          summary: post.summary,
          content: post.content,
          file: null,
        });
        setContent(post.content);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to load post data.",
          icon: "error",
        });
      }
    };

    fetchPostData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };


  const handleContentChange = (value) => {
    setContent(value);
    setPostDetail({ ...postDetail, content: value });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      if (postDetail.file) {
        data.set("file", postDetail.file);
      }

      const response = await PostService.updatePost(id, data);

      if (response.status === 200) {
        Swal.fire({
          title: "Update Post",
          text: "Post updated successfully.",
          icon: "success",
        }).then(() => {
          navigate(`/post/${id}`); // กลับไปที่หน้าโพสต์
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-#FFF8E6 px-4">
      <div className="bg-white shadow-md rounded-lg px-12 pt-8 pb-10 mb-4 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Edit Post</h1>
        <form>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
              value={postDetail.title}
              onChange={handleChange}
              placeholder="Enter the post title"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="summary"
            >
              Summary
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              className="input input-bordered w-full"
              value={postDetail.summary}
              onChange={handleChange}
              placeholder="Write a short summary"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <Editor
              value={content}
              onChange={handleContentChange}
              ref={editorRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="file"
            >
              Upload New Image (Optional)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="file-input file-input-bordered w-full"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary w-full"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
