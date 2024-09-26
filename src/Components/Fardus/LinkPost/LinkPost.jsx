import React from 'react';

const LinkPost = ({handleLinkChange, linkValue}) => {
    return (
        <div>
            <div className="relative w-full border border-gray-300 dark:border-gray-500 rounded-2xl">
            <div className="relative">
              <input
                id="link"
                value={linkValue}
                onChange={handleLinkChange}
                className={`w-full text-sm h-[58px] bg-transparent placeholder:text-slate-400 dark:text-gray-100 text-slate-700 rounded-md px-4 transition duration-300 ease outline-none
                        ${linkValue ? 'pt-2' : ''}`}
              />
              <label
                htmlFor="link"
                className={`absolute cursor-text px-1 left-2.5 bg-transparent text-slate-400 transition-all transform origin-left peer-focus:left-2.5
        ${linkValue ? 'top-[5px] left-2.5 scale-90 text-xs' : 'top-[50%] translate-y-[-50%] text-sm'}`}
              >
                Link URL <span className="text-red-500 text-lg absolute top-[-3px] -right-2">*</span>
              </label>
            </div>
          </div>
        </div>
    );
};

export default LinkPost;