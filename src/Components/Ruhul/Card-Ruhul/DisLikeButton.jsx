import { FaThumbsDown } from "react-icons/fa";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import UseDisLikes from "../../../Hooks/UseDisLike";
import toast from "react-hot-toast";

export default function DisLikeButton({ data, user }) {
  const [dislikes, isLoading, refetch] = UseDisLikes();  // Proper destructuring

  const handleDislike = async (postId) => {
    if (!user) {
      toast.error("You need to log in to dislike a post.");
      return;
    }

    const newUser = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };

    try {
      const res = await axiosPublic.post(`/dislike/${postId}`, { newUser });
      console.log(res.data);  // Debugging the response
      refetch();  // Refresh the dislikes data
    } catch (error) {
      console.error("Error disliking post:", error);
      toast.error("An error occurred while disliking the post.");
    }
  };

  const isDisliked = dislikes.some(
    (dislike) => dislike.postId === data._id && dislike.email === user?.email
  );

  return (
    <button
      onClick={() => handleDislike(data._id)}
      className={`flex items-center space-x-1 hover:text-red-500 ${
        isDisliked ? "text-red-500" : "text-gray-600"
      }`}
      disabled={isLoading}  // Disable button while loading
    >
      <FaThumbsDown className="h-5 w-5" />
      <span className="ml-1 text-sm">{data?.dislikes || 0}</span>
    </button>
  );
}
