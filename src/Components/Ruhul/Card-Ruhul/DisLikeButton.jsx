import { useState } from "react";
import { FaThumbsDown } from "react-icons/fa";
import './DisLikeButton.css';

export default function DisLikeButton({ data, handleDislike, isDisliked, isLoading,setReLoad, reLoad, disLike, setDisLike, like, setLike,}) {
  const [animate, setAnimate] = useState(false); 

  const handleClick = () => {
    if (!isLoading) {
      setAnimate(true);

      handleDislike(data._id);

    
      setTimeout(() => {
        setAnimate(false);
      }, 600); 
    }

    if(data?.dislikes === data?.dislikes){
      setDisLike(data?.dislikes + 1);
      if(like >0 && data?.likes !== like)
        setLike(like -1)
    }
    setReLoad(!reLoad); // Triggering re-render to update the dislike count
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1 transition duration-500 transform ${
        isDisliked ? "text-red-500" : "text-gray-600"
      } ${animate ? 'animate-bounce' : ''}`}
      disabled={isLoading} 
    >
      <FaThumbsDown
        className={`h-6 w-6 transition-transform duration-500 ${
          animate ? 'rotate-12 scale-125' : 'scale-100'
        }`} 
      />
      <span className="text-sm">{disLike || 0}</span>
    </button>
  );
}
