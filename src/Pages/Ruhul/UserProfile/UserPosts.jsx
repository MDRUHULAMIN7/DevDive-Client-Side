import PostComponent from "../../../Components/Ruhul/Card-Ruhul/PostComponent";
import UsePosts from "../../../Hooks/UsePosts";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import UseLikes from "../../../Hooks/UseLikes";
import UseDisLikes from "../../../Hooks/UseDisLike";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SkeletonLoader from "../../../Components/Ruhul/Card-Ruhul/SkeletonLoader";
import UseAuth from "../../../Hooks/UseAuth";
import PollData from "../../../Components/Ruhul/Card-Ruhul/PollData";
import PostActions from "../../../Components/Ruhul/Card-Ruhul/PostActions";
import UserModal from "./UserModal";
import { Helmet } from "react-helmet";

const UserPosts = ({ user2 }) => {
  const { email } = useParams();
  const [posts, isLoading, refetch] = UsePosts(); // Fetch posts
  const [likes] = UseLikes();
  const [dislikes] = UseDisLikes();
  const { user } = UseAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  
  useEffect(() => {
    const myPost = posts?.filter((data) => data?.userEmail === email);
    setMyPosts(myPost || []);
  }, [user2, dislikes, posts, likes, email]);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="text-2xl text-center my-10">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="p-4 mt-10 mx-auto w-full sm:w-2xl max-w-6xl ">
            <Helmet>
        <title>DevDive | UserPosts</title>
      </Helmet>
      <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100">Posts : {myPosts?.length && myPosts.length}</h1>
      {myPosts.length > 0 ? (
        myPosts.map((data, index) => (
          <div
            key={index}
            className="mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-gray-700 w-full"
          >
            <div className="flex flex-col md:flex-row justify-between items-start mb-3">
              <div className="flex items-center mb-3 md:mb-0">
                <Link to={`/users/${data?.userEmail}`}>
                  <img
                    src={data.profilePicture}
                    alt="User"
                    className="rounded-full border border-primary h-10 w-10 object-cover"
                  />
                </Link>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {data.username}
                  </h3>
                  <PostComponent data={data} />
                </div>
              </div>
              <UserModal
                data={data}
                refetch={refetch}
                id={data._id}
                isOpen={openDropdownId === data._id}
                toggleDropdown={toggleDropdown}
              />
            </div>

            <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {data?.title}
            </h2>
            {data.body && (
              <div className="text-gray-700 dark:text-gray-300 mb-4">
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.body.slice(0, 200),
                  }}
                />
                <Link
                  className="text-blue-600 mt-1 block"
                  to={`/post-details/${data._id}`}
                >
                  See more...
                </Link>
              </div>
            )}

            {data?.poll?.length > 0 && (
              <div className="text-gray-700 dark:text-gray-300 mb-4">
                <PollData pollPost={data} />
              </div>
            )}


            {
              data.images.length && 
              (  <div > 
             <img 
  className="
    rounded-lg 
    mb-2 
    w-full 
    h-auto 
    max-h-[500px] 
    object-cover 
    sm:object-contain 
    lg:object-fill 
    transition-all duration-300 ease-in-out
    shadow-md
  "
  src={data.images[0]} 
  alt="Post photo"
/>

              </div>)
              
            }

            <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
              <PostActions data={data} user={user} />

              <div className="flex items-center space-x-4">
                <Link
                  to={`/detailsWithComments/${data._id}#commentSection`}
                  className="flex items-center space-x-1 hover:text-blue-500"
                >
                  <FaCommentAlt className="h-5 w-5" />
                  <span className="text-md">{data?.comments || 0}</span>
                </Link>
                <button className="flex items-center space-x-1 hover:text-gray-800">
                  <FaShare className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-2xl text-center my-10">No Posts Found</p>
      )}
    </div>
  );
};

export default UserPosts;
