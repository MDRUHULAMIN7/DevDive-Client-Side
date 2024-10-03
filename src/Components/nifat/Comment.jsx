import moment from 'moment';
import {  useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import { MdOutlineReply } from 'react-icons/md';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import UseAuth from '../../Hooks/UseAuth';
import useReplies from '../../Hooks/useReplies';
import toast from 'react-hot-toast';

const Comment = ({comment}) => {
  const { user } = UseAuth();
  const axiosPublic= useAxiosPublic()
  const [replies, refetch] = useReplies(comment._id);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  console.log(comment);
  console.log(replies)
    // Handle reply submission
  const handleReply = (e) => {
    e.preventDefault();
    const contentId= comment.contentId;
    const reply= replyContent;
    const userName= user.displayName;
    const userImage= user.photoURL;
    const likeCount=0;
    const disLikeCount=0;
    const replyCount=0;
    const parentId= comment._id;
    const data= {contentId,reply,userName,userImage,likeCount,disLikeCount,replyCount,parentId}
    console.log(data)
    axiosPublic.post('/postReply',data)
    .then((result)=>{
            if(result.data.insertedId){
              refetch()
              toast.success('replied')

            }
    })
    .catch((error)=>{
      toast.error(error)
    })
    setIsReplying(false);
    setReplyContent('');
  };
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
        <p className="text-md text-black dark:text-gray-400">{comment.comment || comment.reply}</p>
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


        <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaCommentAlt className="h-5 w-5" />
          <span className="text-sm">Show replies  {replies.length}</span>
        </button>
        <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-blue-500 text-sm hover:underline"
          >
            <span className='flex items-center '><MdOutlineReply /> Reply</span>
        </button>


        {/* <h1>here</h1> */}

        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaShare className="h-5 w-5" />
          <span>Share</span>
        </button> */}

      </div>
      </div>
      {/* Display nested replies */}
      {replies.length > 0 && (
          <div className="ml-8 mt-4 border-l-2 pl-4 rounded-b-2xl">
            {replies?.map(reply => (
              <Comment key={reply._id} comment={reply} />
            ))}
          </div>
        )}
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
        </div>
    );
};

export default Comment;