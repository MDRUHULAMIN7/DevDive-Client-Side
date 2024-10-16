import moment from 'moment';
import {  useRef, useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { FaReply, FaThumbsDown, FaThumbsUp } from 'react-icons/fa6';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import UseAuth from '../../Hooks/UseAuth';
import useReplies from '../../Hooks/useReplies';
import toast from 'react-hot-toast';
import useCommentLike from '../../Hooks/useCommentLike';
import useCommentDislike from '../../Hooks/useCommentDislike';
import { SlOptionsVertical } from "react-icons/sl";
import DeleteCommentButton from './DeleteCommentButton';

const Comment = ({comment,refetch,postRefetch}) => {
  
  const { user } = UseAuth();
  const axiosPublic= useAxiosPublic()
  const [replies, replyRefetch] = useReplies(comment._id);
  const [commentLikes,,likeRefetch] = useCommentLike()
  const [commentDislikes,,dislikeRefetch] = useCommentDislike()
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies]=useState(false)
  const [commentEditOption, setCommentEditOption]=useState(false)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [editedMessage, setEditedMessage] = useState(comment.comment || comment.reply); 
  const postReplyButton= useRef(null)
  const repliesSection= useRef(null)
  console.log(comment);
  console.log(replies)
  console.log(user)
    // Handle reply submission
  const handleReply = (e) => {
    e.preventDefault();
    const contentId= comment.contentId;
    const reply= replyContent;
    const userName= user.displayName;
    const userEmail= user.email;
    const userImage= user.photoURL;
    const likeCount=0;
    const disLikeCount=0;
    const replyCount=0;
    const parentId= comment._id;
    const data= {contentId,reply,userName,userEmail,userImage,likeCount,disLikeCount,replyCount,parentId}
    console.log(data)
    axiosPublic.post('/postReply',data)
    .then((result)=>{
            if(result.data.insertedId){
              replyRefetch()
              postRefetch()
              toast.success('replied')

            }
    })
    .catch((error)=>{
      toast.error(error)
    })
    setIsReplying(false);
    setReplyContent('');
  };
  const handleShowCommentEditOption=()=>{
    setCommentEditOption(!commentEditOption)
  }
  const handleLike = async (commentId) => {
    if (!user) {
      toast("You need to log in to like a post.");
      return;
    }

    const newuser = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };
    if (newuser?.email && newuser?.photo) {
      await axiosPublic
        .post(`/commentLike/${commentId}`, { newuser })
        .then((res) => {
          likeRefetch()
          refetch()
          console.log(res.data);
        })
        .catch((err) => {
          likeRefetch()
          refetch()
          console.log(err);
        });
    }
  };
  const handleDislike = async (commentId) => {
    if (!user) {
      toast("You need to log in to like a post.");
      return;
    }
    const newuser = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };
    if (newuser?.email && newuser?.photo) {
      await axiosPublic
        .post(`/commentDislike/${commentId}`, { newuser })
        .then((res) => {
          dislikeRefetch()
          refetch();
          console.log(res.data);
        })
        .catch((err) => {
          dislikeRefetch()
          refetch();
          console.log(err);
        });
    }
  };
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditMessage = (id) => {
    const updatedComment = `${editedMessage} (edited)`; 

    if (id) {
      axiosPublic
        .put(`/editComment/${id}`, { comment: updatedComment })
        .then((res) => {
          if (res) refetch(); 
          setIsEditModalOpen(false); 
        })
        .catch((err) => {
          console.error(err);
          refetch();
        });
    }
  };
  return (
        <div className='mt-4'>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm mb-2">
        <div className='flex justify-between'>
          <div className="flex items-center">
            <img
              src={comment?.userImage}
              alt="User"
              className="rounded-full h-10 w-10 object-cover"
            />
            <div className="ml-3">
              <h3 className="font-medium text-black dark:text-gray-200">{comment?.userName}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{moment(comment?.createdAt).fromNow()}</p>
            </div>
          </div>
          {
            (comment?.userName == user?.displayName)? 
            <div className='flex flex-col items-end'>
              <button className='mb-3' onClick={handleShowCommentEditOption}>
                <SlOptionsVertical />
              </button>
              {
                commentEditOption && <div className='flex flex-col gap-2 '>
                  
                  <button onClick={handleEditClick} className='border-2 border-slate-200 hover:bg-blue-400 rounded-md px-5'>Update</button>
                  {/* <button className='border-2 border-slate-500 rounded-md px-5'>Delete</button> */}
                  <DeleteCommentButton comment={comment} refetch={refetch} replyRefetch={replyRefetch} postRefetch={postRefetch}></DeleteCommentButton>
                </div>
              }
            </div>:<div></div>
          }
        </div>
        <p className="text-md text-black dark:text-gray-400">{comment.comment || comment.reply}</p>
        {/*like/dislike section  */}
        <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex items-center space-x-4">
          {/* Like */}
          <button
                onClick={() => {
                  handleLike(comment._id);
                }}
                className={`flex items-center space-x-1 hover:text-blue-500 `}
              >
                {commentLikes &&
                commentLikes.find(
                  (like) =>
                    like.commentId === comment._id && like?.email === user?.email
                ) ? (
                  <p className="flex text-blue-500 justify-center items-center gap-x-1">
                    {" "}
                    <FaThumbsUp className="h-5 w-5" />{" "}
                  </p>
                ) : (
                  <p className="flex  justify-center items-center gap-x-1">
                    {" "}
                    <FaThumbsUp className="h-5 w-5" />{" "}
                  </p>
                )}
                <span className="ml-1 text-sm text-gray-600">
                  {comment?.likeCount}
                </span>{" "}
                {/* Total likes count */}
              </button>

          {/* Dislike */}
          <button
                onClick={() => {
                  handleDislike(comment._id);
                }}
                className={`flex items-center space-x-1 hover:text-red-500 `}
              >
                {commentDislikes &&
                commentDislikes?.find(
                  (dislike) =>
                    dislike.commentId === comment._id && dislike?.email === user?.email
                ) ? (
                  <p className="flex text-red-500 justify-center items-center gap-x-1">
                    {" "}
                    <FaThumbsDown className="h-5 w-5" />{" "}
                  </p>
                ) : (
                  <p className="flex  justify-center items-center gap-x-1">
                    {" "}
                    <FaThumbsDown className="h-5 w-5" />
                  </p>
                )}
                <span className="ml-1 text-sm text-gray-600">
                  {comment?.disLikeCount}
                </span>{" "}
                {/* Total dislikes count */}
              </button>
        </div>


        <button onClick={()=>{
          setShowReplies(!showReplies)
          setTimeout(()=>{
            repliesSection.current?.scrollIntoView({ behavior: 'smooth' });
          },100)
        }} className="flex items-center space-x-1 hover:text-blue-500">
          <FaCommentAlt className="h-5 w-5" />
          <span className="text-sm">Replies  {replies.length}</span>
        </button>
        <button
            onClick={() => {
              setIsReplying(!isReplying)
              setTimeout(()=>{
                postReplyButton.current?.scrollIntoView({ behavior: 'smooth' });
              },100)
            }}
            className="text-blue-500 text-sm hover:underline"
          >
            <span className='flex items-center '><FaReply className='text-xl mr-1'/> Reply</span>
        </button>


        {/* <h1>here</h1> */}

        {/* <button className="flex items-center space-x-1 hover:text-blue-500">
          <FaShare className="h-5 w-5" />
          <span>Share</span>
        </button> */}

      </div>
      </div>
      {/* Display nested replies */}
      {(showReplies &&  replies.length > 0 )&& (
          <div ref={repliesSection} className="ml-8 mt-4 border-l-2 pl-4 rounded-b-2xl">
            {replies?.map(reply => (
              <Comment key={reply._id} comment={reply} refetch={replyRefetch} />
            ))}
          </div>
        )}
      {/* Reply form */}
      {isReplying && (
          <form onSubmit={handleReply} className="mt-2 ">
            <textarea
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <button
              type="submit"
              ref={postReplyButton}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-lg"
            >
              Post Reply
            </button>
          </form>
        )}
        {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 space-y-4">
            <h2 className="text-xl font-semibold text-center">Edit Message</h2>
            <textarea
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditMessage(comment._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default Comment;