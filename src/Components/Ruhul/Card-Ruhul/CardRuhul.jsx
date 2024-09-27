import { BsThreeDots } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { FaRegFlag } from "react-icons/fa6";
import {useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
 
// import './swiper.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import UsePosts from "../../../Hooks/UsePosts";
import { Link } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import UseLikes from "../../../Hooks/UseLikes";
import UseDisLikes from "../../../Hooks/UseDisLike";

import CommentsSection from "../../nifat/CommentSection";

const CardRuhul = () => {
  const { user } = UseAuth(); // Get user info from auth hook
  const [posts,,refetch] = UsePosts(); // Fetch posts
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [joined, setJoined] = useState(false);
 const axiosPublic= useAxiosPublic()
 const [likes]=UseLikes()
  const [dislikes]=UseDisLikes()
  
  const [showComments, setShowComments]=useState(false)
  const [comments, setComments] = useState([]);
  const handleComment=()=>{
    setShowComments(!showComments)
    console.log('showing comments')
    fetch('../../../../public/comments.json')
    .then((response) => response.json())
    .then((data) => setComments(data))
    .catch((error) => console.error('Error fetching the comments:', error));
    
  }





 const handleLike = async(postId) => {
 
  if (!user) {
    toast("You need to log in to like a post.");
    return;
  }

const newuser={
   name:user?.displayName,
   email:user?.email,
   photo:user?.photoURL
 }
 if(newuser?.email && newuser?.photo){
  
  await axiosPublic.post(`/like/${postId}`,{newuser})
  .then(res=>{
    refetch()
    console.log(res.data);

  })
  .catch(err=>{
    refetch()
    console.log(err);
  })
 }
   

 
};
 const handleDislike= async(postId) => {
  if (!user) {
    toast("You need to log in to like a post.");
    return;
  }
const newuser={
   name:user?.displayName,
   email:user?.email,
   photo:user?.photoURL
 }
 if(newuser?.email && newuser?.photo){
  await axiosPublic.post(`/dislike/${postId}`,{newuser})
  .then(res=>{
    refetch()
    console.log(res.data);
  })
  .catch(err=>{
    refetch()
    console.log(err);
  })
 }
   

 
};

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleJoin = () => {
    setJoined(!joined);
  };
  console.log(posts);

  return (
    <section>
      {posts?.length && posts?.map((data, index) => (
        <div key={index} className="mt-4 bg-white dark:bg-gray-900 shadow-md mx-1 rounded-lg p-4 my-4  md:mx-auto border border-gray-200 dark:border-gray-700 ">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <img
                src={data.profilePicture}
                alt="User"
                className="rounded-full h-10 w-10 object-cover"
              />
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{data.username}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Posted: {data.createdAt}</p>
              </div>
            </div>
            <div className="relative flex items-center gap-2">
              <button
                onClick={toggleJoin}
                className={`p-1 font-semibold text-sm text-white rounded-xl w-full h-8 ${joined ? 'bg-green-600' : 'bg-blue-700'}`}
              >
                {joined ? 'Unfollow' : 'Follow'}
              </button>
              <BsThreeDots onClick={toggleDropdown} className="cursor-pointer" />
              {dropdownOpen && (
                <div className="absolute right-0 mt-36 w-32 bg-white rounded-xl shadow-lg z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
                      <MdSaveAlt /> Save
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
                      <BiHide /> Hide
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
                      <FaRegFlag /> Report
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
            {data.title}
          </h2>

          <div className="text-gray-700 dark:text-gray-300">
            <p>
              <span dangerouslySetInnerHTML={{ __html: data.body.slice(0, 200) }} />
              <Link className="text-blue-600" to={`/post-details/${data._id}`}>more...</Link>
            </p>
          </div>

          <div className="my-4">
          <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-[300px] md:h-[400px]  rounded-lg"
        >
  
          {
            data && data?.images?.map((image,index)=><SwiperSlide key={index}>
  <div className="h-[300px] md:h-[400px]  w-full flex justify-center items-center overflow-hidden rounded-lg">
  <img
    src={image} // Ensure this is a valid URL
    alt="Post"
    className="w-full h-full object-cover" // Use object-cover to maintain aspect ratio
  />
</div>





            </SwiperSlide>)
          }
     
        
       
        </Swiper>

          </div>

          <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center space-x-4">
              {/* Like */}
              <button
                onClick={() => {
                  handleLike(data._id);
                  
                }}
                className={`flex items-center space-x-1 hover:text-blue-500 `}
              >
         
                {likes && likes.find(like=> like.postId === data._id && like?.email === user?.email) ? <p className="flex text-blue-500 justify-center items-center gap-x-1"> <FaThumbsUp className="h-5 w-5"/> </p> : <p className="flex  justify-center items-center gap-x-1"> <FaThumbsUp className="h-5 w-5"/> </p>}
               
             
                <span className="ml-1 text-sm text-gray-600">{data?.likes}</span> {/* Total likes count */}
              </button>

              {/* Dislike */}
              <button
                onClick={() => {
                  handleDislike(data._id);
                 
                }}
                className={`flex items-center space-x-1 hover:text-red-500 `}
              >
                {dislikes && dislikes?.find(like=> like.postId === data._id && like?.email === user?.email) ? <p className="flex text-red-500 justify-center items-center gap-x-1"> <FaThumbsDown className="h-5 w-5"/> </p> : <p className="flex  justify-center items-center gap-x-1"> <FaThumbsDown className="h-5 w-5"/></p>}
                <span className="ml-1 text-sm text-gray-600">{data?.dislikes}</span> {/* Total dislikes count */}
              </button>
            </div>

            <div className="flex items-center space-x-4">
            <button onClick={handleComment} className="flex items-center space-x-1 hover:text-blue-500">
          <FaCommentAlt className="h-5 w-5" />
          <span className="text-sm">Comments</span>
        </button>
              <button className="flex items-center space-x-1 hover:text-gray-800">
                <FaShare className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
          {
          showComments &&  <CommentsSection comments={comments}></CommentsSection>
        }
        </div>
       
      ))}
      
    </section>
  );
};

export default CardRuhul;
