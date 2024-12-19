import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Create = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
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

      const response = await PostService.createPost(data);

      if (response.status === 200) {
        Swal.fire({
          title: "Create Post",
          text: "Post created successfully.",
          icon: "success",
        }).then(() => {
          setPostDetail({
            title: "",
            summary: "",
            content: "",
            file: "",
          });
        });

        navigate("/");
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
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF] px-4">
      <div className="bg-white shadow-md rounded-lg px-12 pt-8 pb-10 mb-4 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Create Post</h1>
        <form onSubmit={handleSubmit}>
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
              className="block text-gray-700 text-sm font-semibold mb-2 truncate"
              htmlFor="content"
            >
              Content
            </label>
            <ReactQuill
              id="content"
              className="quill-editor w-full"
              value={postDetail.content}
              onChange={(value) =>
                setPostDetail({ ...postDetail, content: value })
              }
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ align: [] }],
                  
                  ["image"],
                  ["clean"],

                ],
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2 truncate"
              htmlFor="file"
            >
              Upload Image
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
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary w-full"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
