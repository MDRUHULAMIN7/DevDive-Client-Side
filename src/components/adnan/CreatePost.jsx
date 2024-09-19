import React from "react";

const CreatePost = () => {
  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-5">Create Post</h2>

      <input
        type="text"
        placeholder="Title"
        className="block bg-white mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
      />

      <label
        for="Description"
        className="block text-sm font-semibold text-gray-500 mt-10"
      >
        Description
      </label>

      <input
        placeholder="Write Here..."
        className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40" ></input>

      <div className="flex justify-end">
        <button className="bg-sky-700 px-8 py-3 rounded-lg text-white mt-3">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
