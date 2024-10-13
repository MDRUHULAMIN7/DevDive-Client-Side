
import { FaThumbsUp } from "react-icons/fa";
import { toast } from "react-toastify";
import UseLikes from "../../../Hooks/UseLikes";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";

const LikeButton = ({ data, user }) => {
  // Ensure data is defined before rendering


  

  const [likes, , refetch] = UseLikes(); // Add refetch here

 
  const handlelike = async (postId) => {
    if (!user) {
      toast("You need to log in to like a post.");
      return;
    }
    const newuser = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };
    if (newuser?.email && newuser?.photo) {
      await axiosPublic
        .post(`/like/${postId}`, { newuser })
        .then((res) => {
          refetch();
          console.log(res.data);
        })
        .catch((err) => {
          refetch();
          console.log(err);
        });
    }
  };
  return (
    <button
    onClick={() => {
      handlelike(data._id);
    }}
    className={`flex items-center space-x-1 hover:text-blue-500 `}>
    {likes &&
    likes?.find(
      (like) =>
        like.postId === data._id && like?.email === user?.email
    ) ? (
      <p className="flex text-blue-500 justify-center items-center gap-x-1">
        {" "}
        <FaThumbsUp className="h-5 w-5" />{" "}
      </p>
    ) : (
      <p className="flex  justify-center items-center gap-x-1">
        {" "}
        <FaThumbsUp className="h-5 w-5" />
      </p>
    )}
    <span className="ml-1 text-sm text-gray-600">
      {data?.likes}
    </span>{" "}
    
  </button>
  );
};

export default LikeButton;
