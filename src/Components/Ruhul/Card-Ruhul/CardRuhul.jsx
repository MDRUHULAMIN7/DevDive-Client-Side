import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShare, FaHeart, FaTag } from "react-icons/fa";
import Chatbot from "../Cahtbot/Chatbot";

const CardRuhul = () => {
  // State for like and dislike counts
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // State for controlling the display of the full post content
  const [showMore, setShowMore] = useState(false);

  // Functions to handle like and dislike actions
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  // Function to toggle the full post content
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 my-4 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 sm:max-w-full lg:max-w-3xl">
      {/* User Info */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // User image URL
            alt="User"
            className="rounded-full h-10 w-10 object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">John Doe</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Posted 2 hours ago</p>
          </div>
        </div>
        {/* Tag Button */}
        <button className="flex items-center space-x-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
          <FaTag className="h-4 w-4" />
          <span>Tag</span>
        </button>
      </div>

      {/* Post Title */}
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
        A Comprehensive Guide to React and State Management
      </h2>

      {/* Post Text with Summary and Show More */}
      <p className="text-gray-700 dark:text-gray-300">
        React is a popular JavaScript library for building user interfaces,
        especially single-page applications. It allows developers to create
        reusable UI components, manage the state of their applications, and
        render the components efficiently when the data changes.{" "}
        {!showMore && (
          <>
            {/* Shortened text with "Show more" link */}
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

      {/* Full Post Content (hidden until "Show more" is clicked) */}
      {showMore && (
        <p className="text-gray-700 dark:text-gray-300">
          In this guide, we will explore the core concepts of React, including
          components, props, state, and hooks, and see how they fit together to
          build dynamic and interactive web applications. Additionally, we'll
          discuss how React's component lifecycle and hooks can help you manage
          side effects and state changes more effectively.{" "}
          <button
            onClick={toggleShowMore}
            className="text-blue-500 hover:underline"
          >
            Show less
          </button>
        </p>
      )}

      {/* Post Image */}
      <div className="mb-4 mt-4">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&fit=crop&w=600&h=300" // Post image URL
          alt="Post"
          className="w-full rounded-lg object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex items-center space-x-4">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-blue-500"
          >
            <FaThumbsUp className="h-5 w-5" />
            <span>{likes} Like</span>
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            <FaThumbsDown className="h-5 w-5" />
            <span>{dislikes} Dislike</span>
          </button>
        </div>

        {/* Comment */}
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaCommentAlt className="h-5 w-5" />
          <span>Comment</span>
        </button>

        {/* Share */}
        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaShare className="h-5 w-5" />
          <span>Share</span>
        </button>

        {/* Wishlist */}
        <button className="flex items-center space-x-1 hover:text-yellow-500">
          <FaHeart className="h-5 w-5" />
          <span>Wishlist</span>
        </button>
      </div>

      <Chatbot></Chatbot>
    </div>
  );
};

export default CardRuhul;
