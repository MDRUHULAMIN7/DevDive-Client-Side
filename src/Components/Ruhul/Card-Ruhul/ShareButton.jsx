import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaShare } from "react-icons/fa";
import toast from "react-hot-toast";

const ShareButton = ({ data }) => {
  const postLink = `${window.location.origin}/post-details/${data._id}`;

  const handleCopy = () => {
    toast.success("Link copied to clipboard!");
  };

  return (
    <CopyToClipboard text={postLink} onCopy={handleCopy}>
      <button
        className="flex items-center space-x-1 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <FaShare className="h-5 w-5" />
        <span>Share</span>
      </button>
    </CopyToClipboard>
  );
};

export default ShareButton;
