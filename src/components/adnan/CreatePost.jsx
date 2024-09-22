import React, { useRef } from "react";
import Editor from "@monaco-editor/react"
import { useState } from "react";
import BodyInput from "../Fardus/BodyInput/BodyInput";

const CreatePost = () => {
  const editorRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const maxCharacters = 300;

  console.log(inputValue);

  // Function to handle input changes and limit input length
  const handleInputChange = (e) => {
    const newValue = e.target.value;

    // Only allow input if it's within the character limit
    if (newValue.length <= maxCharacters) {
      setInputValue(newValue);
    }
  };

  // Calculate remaining characters
  const remainingCharacters = maxCharacters - inputValue.length;




  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function getEditorValue() {
    alert(editorRef.current.getValue());
  }


  return (
    <div className="mx-auto flex justify-center gap-12 pt-7">
      <div className="w-[690px]">
        <h2 className="text-xl font-bold mb-5">Create Post</h2>

        <div className="relative w-full border border-gray-300 rounded-2xl mb-10">
          <div className="relative">
            <input
              id="title"
              value={inputValue}
              onChange={handleInputChange}
              className={`w-full text-sm h-[58px] bg-transparent placeholder:text-slate-400 text-slate-700 rounded-md px-4 transition duration-300 ease outline-none
                        ${inputValue ? 'pt-2' : ''}`}
            />
            <label
              htmlFor="title"
              className={`absolute cursor-text px-1 left-2.5 bg-transparent text-slate-400 transition-all transform origin-left peer-focus:left-2.5
        ${inputValue ? 'top-[5px] left-2.5 scale-90 text-xs' : 'top-[50%] translate-y-[-50%] text-sm'}`}
            >
              Title <span className="text-red-500 text-lg absolute top-[-3px]">*</span>
            </label>
          </div>
          <div className="text-right text-xs text-slate-500 absolute right-1 bottom-[-25px]">
            {remainingCharacters}/300
          </div>
        </div>

                <BodyInput setValue={setValue} value={value}></BodyInput>
               

        {/* <div className="rounded-lg">
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
        </div> */}

        <div className="flex justify-end">
          <button className="bg-pm-color px-8 py-3 rounded-lg text-white mt-3 mb-2">
            Post
          </button>
        </div>
      </div>
      <div className="w-[320px] border h-[500px] rounded-xl">
      <div className="" dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
};

export default CreatePost;
