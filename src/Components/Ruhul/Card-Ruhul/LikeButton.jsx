import { FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import UseLikes from "../../../Hooks/UseLikes";
import useAxiosPublic from "../../../Hooks/useAxiosPublic"; // Ensure this is correctly imported

const LikeButton = ({ data, user }) => {
  const [likes, isLoading, refetch] = UseLikes(); // Proper destructuring
  const axios = useAxiosPublic(); // Use axios instance properly

  const handleLike = async (postId) => {
    if (!user) {
      toast.error("You need to log in to like a post.");
      return;
    }

    const newUser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };

    try {
      const res = await axios.post(`/like/${postId}`, { newUser });
      console.log(res.data); // Log the response for debugging
      refetch(); // Refresh likes list
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred while liking the post.");
    }
  };

  const isLiked = likes.some(
    (like) => like.postId === data._id && like.email === user?.email
  );

  return (
    <button
      onClick={() => handleLike(data._id)}
      className={`flex items-center space-x-1 hover:text-blue-500 ${
        isLiked ? "text-blue-500" : "text-gray-600"
      }`}
      disabled={isLoading} // Disable button while loading
    >
      <FaThumbsUp className="h-5 w-5" />
      <span className="ml-1 text-sm">{data?.likes || 0}</span>
    </button>
  );
};

export default LikeButton;
