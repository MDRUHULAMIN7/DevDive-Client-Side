

import { BsThreeDots } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { FaRegFlag } from "react-icons/fa6";

import {  useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShare} from "react-icons/fa";
import CommentsSection from "../nifat/CommentSection";





const Card = () => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  // ...........
  const [showMore, setShowMore] = useState(false);
  //Nifat
  const [showComments, setShowComments]=useState(false)
  const [comments, setComments] = useState([]);
  const handleComment=()=>{
    setShowComments(!showComments)
    console.log('showing comments')
    fetch('../../../public/comments.json')
    .then((response) => response.json())
    .then((data) => setComments(data))
    .catch((error) => console.error('Error fetching the comments:', error));
    
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


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

    <div className="mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 my-4 max-w-2xl mx-auto border border-gray-200 dark:border-gray-800 sm:max-w-full lg:max-w-3xl">

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="rounded-full h-10 w-10 object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">John Doe</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Posted 2 hours ago</p>
          </div>
        </div>

        <div className="relative flex items-center gap-2">

          <button
            onClick={toggleJoin}
            className={`p-1 font-semibold text-sm text-white rounded-xl w-full h-8 ${joined ? 'bg-green-600' : 'bg-blue-700'
              }`}
          >
            {joined ? 'Unfollow' : 'Follow'}
          </button>
          <BsThreeDots onClick={toggleDropdown} className="cursor-pointer" />
          {dropdownOpen && (
            <div className="absolute right-0 mt-36 w-32 bg-white rounded-xl shadow-lg z-10">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1"><MdSaveAlt></MdSaveAlt>Save</li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1"><BiHide></BiHide>Hide</li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1"><FaRegFlag></FaRegFlag>Report</li>
              </ul>
            </div>
          )}
        </div>
      </div>





      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
        A Comprehensive Guide to React and State Management
      </h2>


      <p className="text-gray-700 dark:text-gray-300">
        React is a popular JavaScript library for building user interfaces,
        especially single-page applications. It allows developers to create
        reusable UI components, manage the state of their applications, and
        render the components efficiently when the data changes.{" "}
        {!showMore && (
          <>

            ...{" "}
            <button
              onClick={toggleShowMore}
              className="text-blue-500 hover:underline"
            >
              Show more
            </button>
          </>
        )}
      </p>


      {showMore && (
        <p className="text-gray-700 dark:text-gray-300">
          In this guide, we will explore the core concepts of React, including
          components, props, state, and hooks, and see how they fit together to
          build dynamic and interactive web applications. Additionally, we&apos;ll
          discuss how Reacts component lifecycle and hooks can help you manage
          side effects and state changes more effectively.{" "}
          <button
            onClick={toggleShowMore}
            className="text-blue-500 hover:underline"
          >
            Show less
          </button>
        </p>
      )}


      <div className="my-4">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&fit=crop&w=600&h=300" // Post image URL
          alt="Post"
          className="w-full rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex items-center space-x-4">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-blue-500"
          >
            <FaThumbsUp className="h-5 w-5" />
            <span>{likeCount} Like</span>
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            <FaThumbsDown className="h-5 w-5" />
            <span>{dislikeCount} Dislike</span>
          </button>
        </div>


        <button onClick={handleComment} className="flex items-center space-x-1 hover:text-blue-500">
          <FaCommentAlt className="h-5 w-5" />
          <span className="text-sm">Comments</span>
        </button>


        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaShare className="h-5 w-5" />
          <span>Share</span>
        </button>


        {/* <button className="flex items-center space-x-1 hover:text-yellow-500">
          <FaHeart className="h-5 w-5" />
          <span>Wishlist</span>
        </button> */}
      </div>
      {
        showComments &&  <CommentsSection comments={comments}></CommentsSection>
      }
      

    </div>







  );
}


export default Card;