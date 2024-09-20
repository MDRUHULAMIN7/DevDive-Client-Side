
import { useState } from 'react';
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { FaRegFlag } from "react-icons/fa6";

const Card = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleLike = () => {
    if (!hasLiked && !hasDisliked) {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
    } else if (hasDisliked) {
      setDislikeCount(dislikeCount - 1);
      setLikeCount(likeCount + 1);
      setHasLiked(true);
      setHasDisliked(false);
    }
  };

  const handleDislike = () => {
    if (!hasDisliked && !hasLiked) {
      setDislikeCount(dislikeCount + 1);
      setHasDisliked(true);
    } else if (hasLiked) {
      setLikeCount(likeCount - 1);
      setDislikeCount(dislikeCount + 1);
      setHasDisliked(true);
      setHasLiked(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleJoin = () => {
    setJoined(!joined)
  }

  return (
    <>
      <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* User info */}
        <div className="mt-4">
          <div className='flex justify-between p-3'>
            <div className="flex items-center">
              <div className="flex items-center">
                <img
                  className="object-cover h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                  alt="Avatar"
                />
                <a href="#" className="mx-2 font-semibold text-gray-700 dark:text-gray-200" tabIndex="0" role="link">
                  Jone Doe
                </a>
              </div>
              <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">21 SEP 2015</span>
            </div>

            <div className="relative flex items-center gap-2">

              <button
                onClick={toggleJoin}
                className={`p-1 font-semibold text-sm text-white rounded-xl w-14 h-8 ${joined ? 'bg-green-600' : 'bg-blue-700'
                  }`}
              >
                {joined ? 'Joined' : 'Join'}
              </button>
              <BsThreeDots onClick={toggleDropdown} className="cursor-pointer" />
              {dropdownOpen && (
                <div className="absolute right-0 mt-36 w-32 bg-white rounded-md shadow-lg z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1"><MdSaveAlt></MdSaveAlt>Save</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1"><BiHide></BiHide>Hide</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-1"><FaRegFlag></FaRegFlag>Report</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <p className='text-xl font-normal'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, voluptas. Rem inventore, quis blanditiis dignissimos.</p>
        </div>

        <img
          className="object-cover w-full h-full rounded-md mt-2"
          src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="Article"
        />

        <div className="lg:p-4 p-1">
          <div className="mt-2 flex items-center gap-3">
            <div className='bg-gray-300 w-36 rounded-2xl h-8 flex gap-3 p-3'>
              <div className="flex items-center">
                <AiTwotoneLike
                  className={`lg:w-8 lg:h-8 w-6 h-6 cursor-pointer ${hasLiked ? 'text-blue-600' : ''}`}
                  onClick={handleLike}
                />
                <span className="ml-2">{likeCount}</span>
              </div>
              <div className="flex items-center">
                <AiTwotoneDislike
                  className={`lg:w-8 lg:h-8 w-6 h-6 cursor-pointer ${hasDisliked ? 'text-red-600' : ''}`}
                  onClick={handleDislike}
                />
                <span className="ml-2">{dislikeCount}</span>
              </div>
            </div>

            <button className='bg-gray-300 w-16  rounded-3xl p-2 items-center'>
              <FaRegMessage className='lg:h-6 lg:w-6 h-4 w-4 lg:ml-3 ml-2' />
            </button>
            <button className='bg-gray-300 w-16 rounded-3xl p-2 items-center'>
              <SlBadge className='lg:h-6 lg:w-6 w-4 lg:ml-3 ml-2' />
            </button>
            <button className='bg-gray-300 w-24 h-8 rounded-3xl p-2 items-center flex font-semibold'>
              <RiShareForwardLine className='lg:h-6 lg:w-6 h-4 w-4 lg:ml-3 ml-2' />
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
  
}


export default Card;