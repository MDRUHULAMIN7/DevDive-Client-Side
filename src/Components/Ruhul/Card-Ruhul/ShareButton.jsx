
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaShare } from "react-icons/fa";

const ShareButton = ({ data }) => {

  const [isOpen, setIsOpen] = useState(false);

  const postLink = `${window.location.origin}/post-details/${data._id}`;

  const handleShareClick = () => {
 
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleShareClick}
        className="flex items-center space-x-1 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <FaShare className="h-5 w-5" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Share this post
            </h2>

            <CopyToClipboard text={postLink} onCopy={() => toast.success("Link copied to clipboard!")}>
              <button  onClick={handleClose} className="w-fit bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded mb-2">
                Copy Link
              </button>
            </CopyToClipboard>


            <button
              onClick={handleClose}
              className="mt-4 w-full text-xl text-center text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
            <RxCross2 />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareButton;
