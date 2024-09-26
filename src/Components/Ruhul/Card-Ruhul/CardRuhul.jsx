import { BsThreeDots } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { FaRegFlag } from "react-icons/fa6";
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import UsePosts from "../../../Hooks/UsePosts";
import { Link } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const CardRuhul = () => {
  const { user } = UseAuth(); // Get user info from auth hook
  const [posts] = UsePosts(); // Fetch posts
  const [userLikes, setUserLikes] = useState({}); // Track likes per user
  const [userDislikes, setUserDislikes] = useState({}); // Track dislikes per user
  const [postLikesCount, setPostLikesCount] = useState({}); // Track total likes count
  const [postDislikesCount, setPostDislikesCount] = useState({}); // Track total dislikes count
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [joined, setJoined] = useState(false);
 const axiosPublic= useAxiosPublic()
console.log(userLikes);
console.log(userDislikes);
console.log(postLikesCount);
console.log(postLikesCount);
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
    console.log(res.data);
  })
  .catch(err=>{
    console.log(err);
  })
 }
   

  if (userLikes[postId]) {
    // User already liked, so remove the like
    setUserLikes(prev => ({ ...prev, [postId]: undefined }));
    setPostLikesCount(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
  } else {
    // Add the like
    setUserLikes(prev => ({ ...prev, [postId]: true }));
    setPostLikesCount(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));

    // If the user has disliked the post, remove the dislike
    if (userDislikes[postId]) {
      setUserDislikes(prev => ({ ...prev, [postId]: undefined }));
      setPostDislikesCount(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
    }
  }
};

const handleDislike = (postId) => {
  if (!user) {
    alert("You need to log in to dislike a post.");
    return;
  }

  if (userDislikes[postId]) {
    // User already disliked, so remove the dislike
    setUserDislikes(prev => ({ ...prev, [postId]: undefined }));
    setPostDislikesCount(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
  } else {
    // Add the dislike
    setUserDislikes(prev => ({ ...prev, [postId]: true }));
    setPostDislikesCount(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));

    // If the user has liked the post, remove the like
    if (userLikes[postId]) {
      setUserLikes(prev => ({ ...prev, [postId]: undefined }));
      setPostLikesCount(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
    }
  }
};


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleJoin = () => {
    setJoined(!joined);
  };

  return (
    <section>
      {posts && posts?.map((data, index) => (
        <div key={index} className="mt-4 bg-white dark:bg-gray-800 shadow-md mx-1 rounded-lg p-4 my-4 max-w-2xl md:mx-auto border border-gray-200 dark:border-gray-700 sm:max-w-full lg:max-w-3xl">
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
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper h-[300px] md:h-[450px] rounded-lg"
            >
              {data.images && data.images.map((image, imgIndex) => (
                <SwiperSlide key={imgIndex}>
                  <div className="h-[300px] md:h-[450px] w-full flex justify-center items-center overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt="Post"
                      className="max-w-none h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center space-x-4">
              {/* Like */}
              <button
                onClick={() => handleLike(data._id)}
                className={`flex items-center space-x-1 hover:text-blue-500 ${userLikes[data._id] ? 'text-blue-500' : ''}`}
              >
                <FaThumbsUp className="h-5 w-5" />
                <span>{userLikes[data._id] ? 'Liked' : 'Like'}</span>
                <span className="ml-1 text-xs text-gray-600">{postLikesCount[data._id] || 0}</span> {/* Total likes count */}
              </button>

              {/* Dislike */}
              <button
                onClick={() => handleDislike(data._id)}
                className={`flex items-center space-x-1 hover:text-red-500 ${userDislikes[data._id] ? 'text-red-500' : ''}`}
              >
                <FaThumbsDown className="h-5 w-5" />
                <span>{userDislikes[data._id] ? 'Disliked' : 'Dislike'}</span>
                <span className="ml-1 text-xs text-gray-600">{postDislikesCount[data._id] || 0}</span> {/* Total dislikes count */}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 hover:text-gray-800">
                <FaCommentAlt className="h-5 w-5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-800">
                <FaShare className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardRuhul;
