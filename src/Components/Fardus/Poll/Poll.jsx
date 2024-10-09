import React, { useState } from 'react';

const Poll = ({setPollOptions, pollOptions}) => {
  const [inputValue, setInputValue] = useState('');
//   const [pollOptions, setPollOptions] = useState([]);

  console.log(pollOptions); // Updated log

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    if (inputValue && !pollOptions.some((option) => option.item === inputValue.trim())) {
      setPollOptions((prevOptions) => [...prevOptions, { item: inputValue.trim(), count: 0 }]);
      setInputValue('');
    }
  };

  const handleRemoveOption = (optionItem) => {
    setPollOptions((prevOptions) => prevOptions.filter((opt) => opt.item !== optionItem));
  };

  return (
    <div className="relative">
      <div className={`relative w-full border rounded-2xl border-gray-300 dark:border-gray-500`}>
        <div className="relative flex items-center">
          <input
            id="poll"
            value={inputValue}
            onChange={handleInputChange}
            className={`w-full text-sm h-[58px] bg-transparent placeholder:text-slate-400 dark:text-gray-100 text-slate-700 rounded-md px-4 transition duration-300 ease outline-none
                      ${inputValue ? 'pt-2' : ''}`}
          />
          <label
            htmlFor="poll"
            className={`absolute cursor-text px-1 left-2.5 bg-transparent text-slate-400 transition-all transform origin-left peer-focus:left-2.5
          ${inputValue ? 'top-[5px] left-2.5 scale-90 text-xs' : 'top-[50%] translate-y-[-50%] text-sm'}`}
          >
            Poll Options
          </label>
          <button
            onClick={handleAddOption}
            className="mx-2 bg-pm-color text-white  py-2 px-3 rounded-full text-xs text-nowrap"
          >
            Add
          </button>
        </div>
      </div>

      <div id="poll-options-container" className={`mt-2 flex flex-wrap gap-2`}>
        {pollOptions.map((option) => (
          <div key={option.item} className="px-3 border border-gray-300 dark:border-gray-500 py-1 rounded-full flex items-center space-x-2">
            <span className="option-text text-xs">{option.item}</span>
            <span
              className="option-remove cursor-pointer text-gray-600 text-sm"
              onClick={() => handleRemoveOption(option.item)}
            >
              x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;
