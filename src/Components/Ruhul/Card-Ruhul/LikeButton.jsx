import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import UseLikes from "../../../Hooks/UseLikes";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";

const LikeButton = ({ data, user }) => {

  if (!data || !data._id) {
    return null;
  }

  const [likes] = UseLikes();

  // Local state to track like status and like count

  const [isLiked, setIsLiked] = useState(false);
  
  const [likeCount, setLikeCount] = useState(data.likes || 0);

 
  useEffect(() => {
    // Check if the user has already liked the post
    const liked = likes && likes?.some(
      (like) => like.postId === data._id && like.email === user?.email
    );
    setIsLiked(liked);
  }, [likes, data._id, user?.email]);


  const handleLike = async (postId) => {
    if (!user) {
      toast("You need to log in to like a post.");
      return;
    }

    const newuser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };


    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }

    try {
      await axiosPublic.post(`/like/${postId}`, { newuser });
  
    } catch (err) {
      console.error(err);

      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      toast.error("Error liking the post. Please try again.");
    }
  };

  return (
    <button
      onClick={() => handleLike(data._id)}
      className={`flex items-center space-x-1 hover:text-blue-500 ${isLiked ? "text-blue-500" : ""}`}
    >
      <p className="flex justify-center items-center gap-x-1">
        <FaThumbsUp className="h-5 w-5" />
      </p>
      <span className="ml-1 text-sm text-gray-600">
        {likeCount} 
      </span>
    </button>
  );
};

export default LikeButton;
