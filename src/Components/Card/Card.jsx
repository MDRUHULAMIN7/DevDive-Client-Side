
import { useState } from 'react';
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { RiShareForwardLine } from "react-icons/ri";

const Card = () => {
    const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  return (
    <>
      <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="Article"
        />

        <div className="lg:p-4 p-1">
          <div className="mt-2 flex items-center gap-3">
          
           <div className=' bg-gray-300 w-36 rounded-2xl h-8 flex gap-3 p-3'>
           <div className="flex items-center">
              <AiTwotoneLike className='lg:w-8 lg:h-8 w-6 h-6 cursor-pointer' onClick={handleLike} />
              <span className="ml-2">{likeCount}</span>
            </div>
            <div className="flex items-center">
              <AiTwotoneDislike className='lg:w-8 lg:h-8 w-6 h-6 cursor-pointer' onClick={handleDislike} />
              <span className="ml-2">{dislikeCount}</span>
            </div>
           </div>
           
           <button className='bg-gray-300 w-16 h-8 rounded-3xl p-2 items-center'> <FaRegMessage className='lg:h-6 lg:w-6 h-4 w-4 lg:ml-1 ml-2'></FaRegMessage></button>
           <button className='bg-gray-300 w-16 h-8 rounded-3xl p-2 items-center'> <SlBadge className='lg:h-6 lg:w-6 h-4 w-4 lg:ml-1 ml-2'></SlBadge></button>
           <button className='bg-gray-300 w-24 h-8 rounded-3xl p-2 items-center flex font-semibold'> <RiShareForwardLine className='lg:h-6 lg:w-6 h-4 w-4 lg:ml-1 ml-2'></RiShareForwardLine>Share</button>
          </div>
        </div>
      </div>
    </>
  );
}


export default Card;