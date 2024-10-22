import React from 'react';
import Result from './Result';

const CodeWeb = () => {
  return (
    <div>
      {/* main content  */}
      <div className=" p-2">
        {/* Editor  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
         {/* Html Editor */}
          <div className="bg-[#282c34] p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2>
          </div>
          {/* Css Editor  */}
          <div className="bg-[#282c34] p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-white">CSS</h2>
          </div>
          {/* JavaScript Editor  */}
          <div className="bg-[#282c34] p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-white">JavaScript</h2>
            JavaScript
          </div>
        </div>
      </div>
      <Result/>
    </div>
  );
};

export default CodeWeb;