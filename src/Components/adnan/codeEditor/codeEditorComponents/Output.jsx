import React, { useState } from 'react';
import { executeCode } from '../api';
import { toast } from 'react-hot-toast';
import SyncLoader  from 'react-spinners/SyncLoader'; // Import ClipLoader from react-spinners


const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const {run: result} = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error.message);
      // Show toast using react-hot-toast
    toast.error(error.message || "Unable to run code", {
      duration: 6000,
      position: "top-right",
    });
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <h2 className='mx-2 my-4 font-semibold text-lg'>Output</h2>
      <button 
      isLoading={isLoading}
      onClick={runCode}
      className="mx-2 mb-3 w-40 p-2 border-2 border-green-800 rounded-md font-semibold bg-white dark:bg-gray-800 text-black dark:text-white"
      >
        {isLoading ? (
          <SyncLoader   color={"#54ACDD"} size={10} /> // Spinner when loading
        ) : (
          "Run Code" // Default text when not loading
        )}
      </button>

      <div
      className={`h-[65vh] p-2 border-2 rounded-md ${isError ? 'text-red-600' : 'text-black dark:text-white'}`}
      >
      {output
          ? output.map((line, i) => <h2 key={i}>{line}</h2>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;