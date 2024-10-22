import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import './LikeButton.css'; 

const LikeButton = ({ handleLike, isLiked, data, isLoading, setReLoad, reLoad, disLike, setDisLike, like, setLike }) => {
  const [animate, setAnimate] = useState(false);
  const handleClick = () => {
    if (!isLoading) {

      setAnimate(true);
 
      handleLike(data._id);

  
      setTimeout(() => {
        setAnimate(false);
      }, 500); 
    }

    if(data?.likes === like){
      setLike(isLiked ? like + 1 : like - 1)
    }
    // if(isLiked){
    //     if(data?.likes === like){
    //       setLike(data?.likes - 1);
    //     }
    //     // if(disLike >0 && data?.dislikes !== disLike)
    //     //   setDisLike(disLike -1)
    // }
    // if(isLiked){
    //   if(data?.likes < like){
    //     setLike(like - 1);
    //   }
    // }
    // if(data?.likes < like){
    //   setLike(like - 1);
    // }
    // setReLoad(!reLoad);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-1 transition duration-500 transform ${
        isLiked ? "text-blue-500" : "text-gray-600"
      } ${animate ? 'animate-bounce' : ''}`}
      disabled={isLoading}
    >
      <FaThumbsUp
        className={`h-6 w-6 transition-transform duration-500 ${
          animate ? 'rotate-12 scale-125' : 'scale-100'
        }`} 
      />
      <span className="text-sm">{like || 0}</span>
    </button>
  );
};

export default LikeButton;
