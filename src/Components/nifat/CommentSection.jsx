//comment section
import moment from 'moment';
import { useState } from 'react';
// import { FaCommentAlt } from 'react-icons/fa';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import { MdOutlineReply } from 'react-icons/md';

const Comment = ({ comment, comments }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);


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

  // Get replies for this comment
  const replies = comments.filter(c => c.parent_id === comment.id);

  // Handle reply submission
  const handleReply = (e) => {
    e.preventDefault();
    // Add the logic to submit the reply
    console.log('Reply:', replyContent);
    setIsReplying(false);
    setReplyContent('');
  };

  return (
    <div className="border-l-2 rounded-bl-xl border-gray-300 pl-4 mb-4 dark:border-gray-700">
      {/* Comment display */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm mb-2">
      <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="rounded-full h-10 w-10 object-cover"
          />
          <div className="ml-3">
            <h3 className="font-medium text-black dark:text-gray-200">{comment.user}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{moment(comment.created_at).fromNow()}</p>
          </div>
        </div>
        <p className="text-md text-black dark:text-gray-400">{comment.content}</p>
        {/*like/dislike section  */}
        <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex items-center space-x-4">
          {/* Like */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 hover:text-blue-500"
          >
            <FaThumbsUp className="h-5 w-5" />
            <span className='text-black'>{likeCount}</span>
          </button>

          {/* Dislike */}
          <button
            onClick={handleDislike}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            <FaThumbsDown className="h-5 w-5" />
            <span className='text-black'>{dislikeCount}</span>
          </button>
        </div>


        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaCommentAlt className="h-5 w-5" />
          <span className="text-sm">Show replies</span>
        </button> */}
        <button 
            onClick={() => setIsReplying(!isReplying)} 
            className="text-blue-500 text-sm hover:underline"
          >
            <span className='flex items-center '><MdOutlineReply /> Reply</span>
        </button>

        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaShare className="h-5 w-5" />
          <span>Share</span>
        </button> */}

      </div>
      </div>

      {/* Reply button */}
      {/* <button 
        onClick={() => setIsReplying(!isReplying)} 
        className="text-blue-500 text-sm hover:underline"
      >
        <MdOutlineReply /> Reply
      </button> */}

      {/* Reply form */}
      {isReplying && (
        <form onSubmit={handleReply} className="mt-2">
          <textarea
            className="w-full p-2 border rounded-lg"
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button 
            type="submit" 
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg"
          >
            Post Reply
          </button>
        </form>
      )}

      {/* Display nested replies */}
      {replies.length > 0 && (
        <div className="ml-4 mt-4">
          {replies.map(reply => (
            <Comment key={reply.id} comment={reply} comments={comments} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsSection = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  const submitComment = (e) => {
    e.preventDefault();
    // Add your logic to submit the new top-level comment
    console.log('New Comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-xl font-semibold mb-4">Comments</h1>

      {/* Display top-level comments */}
      {comments.filter(c => !c.parent_id).map(comment => (
        <Comment key={comment.id} comment={comment} comments={comments} />
      ))}

      {/* New comment form */}
      <form onSubmit={submitComment} className="mt-6">
        <textarea
          className="w-full p-3 border rounded-lg mb-2 dark:bg-gray-600 dark:text-gray-200"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
