import moment from 'moment';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import { MdOutlineReply } from 'react-icons/md';

const Comment = ({comment}) => {
    return (
        <div className='mt-4'>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm mb-2">
      <div className="flex items-center">
          <img
            src={comment.userImage}
            alt="User"
            className="rounded-full h-10 w-10 object-cover"
          />
          <div className="ml-3">
            <h3 className="font-medium text-black dark:text-gray-200">{comment.userName}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{moment(comment.createdAt).fromNow()}</p>
          </div>
        </div>
        <p className="text-md text-black dark:text-gray-400">{comment.comment}</p>
        {/*like/dislike section  */}
        <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex items-center space-x-4">
          {/* Like */}
          <button
            // onClick={handleLike}
            className="flex items-center space-x-1 hover:text-blue-500"
          >
            <FaThumbsUp className="h-5 w-5" />
            <span className='text-black'>{comment.likeCount}</span>
          </button>

          {/* Dislike */}
          <button
            // onClick={handleDislike}
            className="flex items-center space-x-1 hover:text-red-500"
          >
            <FaThumbsDown className="h-5 w-5" />
            <span className='text-black'>{comment.disLikeCount}</span>
          </button>
        </div>


        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaCommentAlt className="h-5 w-5" />
          <span className="text-sm">Show replies</span>
        </button> */}
        <button 
            // onClick={() => setIsReplying(!isReplying)} 
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
        </div>
    );
};

export default Comment;