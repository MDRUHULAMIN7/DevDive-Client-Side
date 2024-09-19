import React, { useRef } from "react";
import Editor from "@monaco-editor/react"

const CreatePost = () => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function getEditorValue() {
    alert(editorRef.current.getValue());
  }

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold mb-5">Create Post</h2>

      <input
        type="text"
        placeholder="Title"
        className="block bg-white mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
      />

      <label
        for="Description"
        className="block text-sm font-semibold text-gray-500 mt-10 "
      >
        Upload Image
      </label>
      <input
        type="file"
        placeholder="Choose Image"
        className="block bg-white mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
      />

      <label
        for="Description"
        className="block text-sm font-semibold text-gray-500 mt-10 "
      >
        Description
      </label>

      <input
        placeholder="Write Here..."
        className="block mt-2 w-full mb-5 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
      ></input>

      <div className="rounded-lg">
        <Editor
        height="200px"
        width="100%"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        defaultLanguage="javascript"
        ></Editor>
        <button
        className="bg-[#54ACDD] rounded px-5 py-2 mt-2" 
        onClick={() => getEditorValue()}>
          Get Value
        </button>
      </div>

      <div className="flex justify-end">
        <button className="bg-pm-color px-8 py-3 rounded-lg text-white mt-3 mb-2">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
