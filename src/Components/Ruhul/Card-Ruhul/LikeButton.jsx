import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import './LikeButton.css'; 

const LikeButton = ({ handleLike,  data, isLoading ,likeInfo,  likeRefetch}) => {
  const [animate, setAnimate] = useState(false);
// console.log("response from use ruhul like",likeInfo);

const [isRuhulliked,setisRuhulliked] = useState(likeInfo?.isLiked);
useEffect(()=>{
  likeRefetch()
  setisRuhulliked(likeInfo?.isLiked)  // updating the state with the fetched data  if any
 // console.log("isRuhulliked",isRuhulliked)  // checking the state  if any
},[likeInfo?.isLiked,  likeRefetch])
// console.log("isRuhulliked",isRuhulliked)  // checking the state  if any
  const handleClick = () => {
    if (!isLoading) {
      likeRefetch()
      setAnimate(true);
      setisRuhulliked(likeInfo?.isLiked)
      handleLike(data._id);

  
      setTimeout(() => {
        setAnimate(false);
      }, 600); 
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1 transition duration-500 transform ${
        isRuhulliked? "text-blue-500" : "text-gray-600"
      } ${animate ? 'animate-bounce' : ''}`}
      disabled={isLoading}
    >
      <FaThumbsUp
        className={`h-6 w-6 transition-transform duration-500 ${
          animate ? 'rotate-12 scale-125' : 'scale-100'
        }`} 
      />
      <span className="text-sm">{likeInfo?.likesCount}</span>
    </button>
  );
};

export default LikeButton;