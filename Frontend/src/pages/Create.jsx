import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  //const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!title || !summary || !content || !image) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    // สร้าง FormData เพื่อส่งข้อมูลไปยัง API (หากต้องการ)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Post created successfully!");
        //navigate("/"); // เปลี่ยนเส้นทางไปที่หน้า Home
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Error creating post: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Create Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="summary"
            >
              Summary
            </label>
            <input
              type="text"
              id="summary"
              className="input input-bordered w-full"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <ReactQuill
              id="content"
              className="textarea textarea-bordered w-full"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              theme="snow"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }], // Combine header options
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline"],
                  ["link"],
                  [{ align: [] }], // Include alignment options (left, center, right)
                  ["image"],
                  ["clean"],
                ],
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              className="file-input file-input-bordered w-full"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary w-full">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
