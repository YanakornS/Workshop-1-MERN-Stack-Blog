import React from "react";
const API_URL = import.meta.env.VITE_URL;

const Post = ({ title, author, summary, cover, createdAt, _id }) => {
  return (
    <div className=" py-6 px-4">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <figure className="w-full lg:w-1/3">
          <a href={`/post/${_id}`} className="block">
            <img
              src={`${API_URL}/${cover}`}
              alt={title}
              className="w-full h-56 object-cover lg:h-full lg:rounded-l-lg"
            />
          </a>
        </figure>

        {/* Content Section */}
        <div className="p-6 w-full lg:w-2/3 flex flex-col justify-between">
          <a href={`/post/${_id}`} className="block">
            <h2 className="text-2xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors duration-200">
              {title}
            </h2>
          </a>
          <p className="text-sm text-gray-600 mt-2">
            By{" "}
            <span className="font-medium text-gray-800">{author.username}</span>{" "}
            |{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-gray-700 mt-4 text-justify line-clamp-3">
            {summary}
          </p>
          <a
            href={`/post/${_id}`}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors duration-200"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default Post;
