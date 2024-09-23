import React, { useRef } from "react";
import { useState } from "react";
import BodyInput from "../Fardus/BodyInput/BodyInput";
import Tags from "../Fardus/Tags/Tags";

const CreatePost = () => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const maxCharacters = 300;


  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (newValue.length <= maxCharacters) {
      setInputValue(newValue);
    }
  };

  const remainingCharacters = maxCharacters - inputValue.length;



  const handleTagsUpdate = (tags) => {
    setSelectedTags(tags);
    console.log('Selected tags:', tags); 
  };

  return (
    <div>
      <div className="mx-auto flex justify-center gap-12 pt-7">
        <div className="w-[690px]">
          <div className="w-full flex justify-end">
          <button className="text-xs font-bold bg-pm-color text-white px-2 rounded-2xl py-1">Draft</button>
          </div>
          <h2 className="text-xl font-bold mb-5">Create Post</h2>

          <div className="relative w-full border border-gray-300 dark:border-gray-500 rounded-2xl mb-10">
            <div className="relative">
              <input
                id="title"
                value={inputValue}
                onChange={handleInputChange}
                className={`w-full text-sm h-[58px] bg-transparent placeholder:text-slate-400 dark:text-gray-100 text-slate-700 rounded-md px-4 transition duration-300 ease outline-none
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

          <Tags onTagsUpdate={handleTagsUpdate}></Tags>

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
          <div className="w-full">
            <div className="flex justify-end gap-5">
              <button className="bg-pm-color text-white px-3 py-2 rounded-3xl text-xs font-semibold">Save Draft</button>
              <button className="bg-pm-color text-white px-3 py-2 rounded-3xl text-xs font-semibold">Post</button>
            </div>
          </div>
        </div>
        <div className="w-[320px] border border-gray-300 p-3 dark:border-gray-500 min-h-[500px] rounded-xl md:block hidden mb-10">
          <h1 className="text-sm font-semibold mb-5">{inputValue}</h1>
          <div className="text-xs mb-5" dangerouslySetInnerHTML={{ __html: value, }} />
          <div className="flex justify-start flex-wrap items-center">
            {selectedTags.map((tag) => (
              <span key={tag} className="text-xs text-sec-color font-semibold mr-3 mb-1">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreatePost;
