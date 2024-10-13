import { FaThumbsDown } from "react-icons/fa";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import UseDisLikes from "../../../Hooks/UseDisLike";
import toast from "react-hot-toast";


export default function DisLikeButton({data,user}) {

    const [dislikes,,refetch] = UseDisLikes();
    const handleDislike = async (postId) => {
        if (!user) {
          toast("You need to log in to dislike a post.");
          return;
        }
        const newuser = {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        };
        if (newuser?.email && newuser?.photo) {
          await axiosPublic
            .post(`/dislike/${postId}`, { newuser })
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
      handleDislike(data._id);
    }}
    className={`flex items-center space-x-1 hover:text-red-500 `}>
    {dislikes &&
    dislikes?.find(
      (like) =>
        like.postId === data._id && like?.email === user?.email
    ) ? (
      <p className="flex text-red-500 justify-center items-center gap-x-1">
        {" "}
        <FaThumbsDown className="h-5 w-5" />{" "}
      </p>
    ) : (
      <p className="flex  justify-center items-center gap-x-1">
        {" "}
        <FaThumbsDown className="h-5 w-5" />
      </p>
    )}
    <span className="ml-1 text-sm text-gray-600">
      {data?.dislikes}
    </span>{" "}
    
  </button>
  )
}
