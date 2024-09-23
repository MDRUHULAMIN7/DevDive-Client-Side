import React, { useState, useEffect } from 'react';

const Tags = ({ onTagsUpdate }) => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const predefinedTags = [
    'programming',
    'design',
    'web development',
    'javascript',
    'python',
    'css',
    'html',
    'backend',
    'frontend',
    'database',
  ];

  // This useEffect will trigger whenever the tags array changes and will pass the updated tags to the parent component.
  useEffect(() => {
    if (onTagsUpdate) {
      onTagsUpdate(tags);
      
    }
  }, [tags, onTagsUpdate]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setInputValue(value);

    if (value) {
      const matchedTags = predefinedTags.filter((tag) => tag.includes(value));
      setSuggestions(matchedTags);
    } else {
      setSuggestions([]);
    }
  };

  const handleTagClick = (tag) => {
    if (!tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const handleTagRemove = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      if (!tags.includes(inputValue)) {
        setTags((prevTags) => [...prevTags, inputValue]);
      }
      setInputValue('');
      setSuggestions([]);
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor="tags-input"
        className="block mb-2 text-sm font-medium text-slate-400 ml-3"
      >
        Tags
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter tags"
        className="border w-full outline-none bg-transparent text-gray-900 text-sm rounded-xl block p-2.5 border-gray-300 dark:border-gray-500 dark:text-white dark:placeholder:text-gray-500"
      />
      {suggestions.length > 0 && (
        <div
          id="tags-suggestions"
          className="mt-2 border border-gray-300 rounded-lg shadow-md max-h-32 overflow-y-auto"
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="p-2 cursor-pointer text-sm bg-transparent"
              onClick={() => handleTagClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div id="tags-container" className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-3 border border-gray-300 dark:border-gray-500 py-1 rounded-full flex items-center space-x-2"
          >
            <span className="tag-text text-xs">{tag}</span>
            <span
              className="tag-close cursor-pointer text-gray-600 text-sm"
              onClick={() => handleTagRemove(tag)}
            >
              x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
