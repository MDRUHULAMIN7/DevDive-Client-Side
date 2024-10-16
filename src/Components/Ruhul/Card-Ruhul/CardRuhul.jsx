
import { useState } from "react";
import {
 
  FaCommentAlt,
  FaShare,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

// import './swiper.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import UsePosts from "../../../Hooks/UsePosts";
import { Link } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";

import PostComponent from "./PostComponent";
import LikeDislikeFilter from "../../adnan/LikeDislikeFilter";
import PollData from "./PollData";
import SkeletonLoader from "./SkeletonLoader";
import LikeButton from "./LikeButton";
import FollowButton from "./FollowButton";
import DisLikeButton from "./DisLikeButton";
import DropDown from "./DropDown";



const CardRuhul = () => {
  const { user } = UseAuth(); // Get user info from auth hook
  let [, isLoading,] = UsePosts(); // Fetch posts
  const [newPosts, setNewPosts] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null); 
  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id)); // Toggle the same ID or close it
  };
  
  
  if (isLoading) {
    return (
      <div className=" text-2xl text-center my-10 ">

        <SkeletonLoader></SkeletonLoader>
        
      </div>
      // <DevLoader></DevLoader>
    );
  }

  return (
    <section className="">
      {/* Filter component by adnan-shiragee */}
      <div className="flex justify-end">
        <LikeDislikeFilter setPosts={setNewPosts} />
      </div>
      {newPosts?.length > 0 ? (
        newPosts?.map((data, index) => (
          <div
            key={index}
            className="mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 my-4  md:mx-auto border border-gray-200 dark:border-gray-700 ">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <Link to={`/users/${data?.userEmail}`}>
                
                <img
                  src={data.profilePicture}
                  alt="User"
                  className="rounded-full border border-primary h-10 w-10 object-cover"
                /></Link>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {data.username}
                  </h3>

                  <PostComponent data={data}></PostComponent>
                </div>
                <div className="ml-5 mr-3">
                

                  <FollowButton user={user} data={data}></FollowButton>
                </div>
              </div>
              <div className="relative flex items-center gap-2">
              <DropDown id={data._id}
              isOpen={openDropdownId === data._id} 
              toggleDropdown={toggleDropdown} ></DropDown>
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              {data?.title}
            </h2>
            {
              data.body &&   <div className="text-gray-700 dark:text-gray-300 ">
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.body && data?.body?.slice(0, 200),
                  }}
                />
                <Link
                  className="text-blue-600 mt-1 block"
                  to={`/post-details/${data._id}`}>
                  See more....
                </Link>
              </p>
            </div>

            }

            {
              data.poll &&  <div className="text-gray-700 dark:text-gray-300 ">

              <PollData data={data}></PollData>
              </div>
            }
          

            <div className="my-4">
              {data.images[0] && (
                <Swiper
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper h-[300px] md:h-[400px]  rounded-lg">
                  {data &&
                    data?.images?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="h-[300px] md:h-[400px]  w-full flex justify-center items-center overflow-hidden rounded-lg">
                          <img
                            src={image} // Ensure this is a valid URL
                            alt="Post"
                            className="w-full h-full object-cover" // Use object-cover to maintain aspect ratio
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              )}
            </div>

            <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex items-center space-x-4">
                {/* Like */}

                <LikeButton data={data} user={user}></LikeButton>
                

                {/* Dislike */}
                <DisLikeButton user={user} data={data}></DisLikeButton>
            
              </div>

              <div className="flex items-center space-x-4">
               <div className="">
               
               </div>
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
            {/* {
          showComments &&  <CommentsSection comments={comments}></CommentsSection>
        } */}
          </div>
        ))
      ) : (
        <p className=" text-2xl text-center my-10 "> No Post Found </p>
        // <DevLoader></DevLoader>
      )}
    </section>
  );
};

export default CardRuhul;
