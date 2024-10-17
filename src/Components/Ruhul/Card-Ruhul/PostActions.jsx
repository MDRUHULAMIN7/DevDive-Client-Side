import LikeButton from "./LikeButton";
import DisLikeButton from "./DisLikeButton";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import UseLikes from "../../../Hooks/UseLikes";
import UseDisLikes from "../../../Hooks/UseDisLike";
import { toast } from "react-toastify";
import UsePosts from "../../../Hooks/UsePosts";


export default function PostActions({ data, user }) {

  const [likes, isLoading,likeRef] = UseLikes();
  const [,,refetch]=UsePosts()
 
  const [dislikes,,dislikeRef] = UseDisLikes();  // Proper destructuring
  const axiosPublic = useAxiosPublic(); // Use axios instance properly
 
  
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
      const res = await axiosPublic.post(`/like/${postId}`, { newUser });
      if(res?.status === 200){
        await refetch(); 
        await likeRef();
        await dislikeRef()
      } 
     
       // Refresh likes list
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred while liking the post.");
    }
  };
 
  
 

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
    if (newUser?.email && newUser?.photo) {
    
    try {
      const res = await axiosPublic.post(`/dislike/${postId}`, { newUser });
    
      if(res?.status === 200){
        await refetch(); 
        await dislikeRef();
        await likeRef()  
      }
        
      

    } catch (error) {
      console.error("Error disliking post:", error);
      toast.error("An error occurred while disliking the post.");
    }}
  };

  const isDisliked = dislikes.some(
    (dislike) => dislike.postId === data._id && dislike.email === user?.email
  );
  const isLiked = likes.some(
    (like) => like.postId === data._id && like.email === user?.email
  );
 
  return (
    <div className="flex space-x-4">
        <LikeButton
      isLiked={isLiked}
      data={data}
      isLoading={isLoading}
      
      handleLike ={() =>  handleLike (data._id)}
    />
    <DisLikeButton
      isDisliked={isDisliked}
      data={data}
      isLoading={isLoading}
      handleDislike={() => handleDislike(data._id)}
    />
    </div>
  );
}
