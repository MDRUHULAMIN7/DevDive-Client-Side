import { BsThreeDots } from "react-icons/bs";
import PostComponent from "../../../Components/Ruhul/Card-Ruhul/PostComponent";
import UsePosts from "../../../Hooks/UsePosts";
import { MdDelete} from "react-icons/md";
import { FaCommentAlt,FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import UseLikes from "../../../Hooks/UseLikes";
import UseDisLikes from "../../../Hooks/UseDisLike";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import UseAuth from "../../../Hooks/UseAuth";
import { BiEdit } from "react-icons/bi";
const UserPosts =()=>{
    const [posts, isLoading, refetch] = UsePosts(); // Fetch posts
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [likes] = UseLikes();
    const [dislikes] = UseDisLikes();
    const {user}=UseAuth()
    const [myPosts, setMyPosts] = useState([])

    useEffect(()=>{
        const myPost = posts && posts?.filter((data)=>data?.userEmail === user?.email);
        if(myPost?.length){
            setMyPosts(myPost)
        }

    })
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };
    if (isLoading) {
        return (
          <div className=" text-2xl text-center my-10 ">Post is loading ....</div>
        );
      }


      const handleDelete=(id)=>{
        if(window.confirm('Are you sure you want to delete this post?')){
          refetch()
        }
      }
    return (
        <section>
           
          <div>
          {myPosts?.length > 0 ? (
             myPosts?.map((data, index) => (
          <div
            key={index}
            className="mt-4 bg-white dark:bg-gray-900 shadow-md mx-1 rounded-lg p-4 my-4  md:mx-auto border border-gray-200 dark:border-gray-700 ">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <img
                  src={data.profilePicture}
                  alt="User"
                  className="rounded-full h-10 w-10 object-cover"
                />
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {data.username}
                  </h3>

                  <PostComponent data={data}></PostComponent>
                </div>
                <div className="ml-5">
                 
                </div>
              </div>
              <div className="relative flex items-center gap-2">
                <BsThreeDots
                  onClick={toggleDropdown}
                  className="cursor-pointer"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-36 w-32 bg-white rounded-xl shadow-lg z-10">
                    <ul>
                  
                      <Link to={''}  className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
                        <BiEdit /> Edit
                      </Link>
                      <button onClick={()=>handleDelete(data._id)} className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
                        <MdDelete /> Delete
                      </button>
                     
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              {data?.title}
            </h2>

            <div className="text-gray-700 dark:text-gray-300 ">
              <p>
                <span
                  dangerouslySetInnerHTML={{
                    __html: data.body && data?.body?.slice(0, 200),
                  }}
                />
                <Link
                  className="text-blue-600 mt-1 block"
                  to={`/post-details/${data._id}`}>
                  See more...
                </Link>
              </p>
            </div>

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
                <button
                 
                  className={`flex items-center space-x-1 hover:text-blue-500 `}>
                  {likes &&
                  likes.find(
                    (like) =>
                      like.postId === data._id && like?.email === user?.email
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
                    {data?.likes}
                  </span>{" "}
                  {/* Total likes count */}
                </button>

                {/* Dislike */}
                <button
                 
                  className={`flex items-center space-x-1 hover:text-red-500 `}>
                  {dislikes &&
                  dislikes?.find(
                    (like) =>
                      like.postId === data._id && like?.email === user?.email
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
                    {data?.dislikes}
                  </span>{" "}
                  
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  to={`/detailsWithComments/${data._id}`}
                  className="flex items-center space-x-1 hover:text-blue-500"
                >
                  <FaCommentAlt className="h-5 w-5" />
                  <span className="text-sm">Comments</span>
                </Link>
                <button className="flex items-center space-x-1 hover:text-gray-800">
                  <FaShare className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            {/* {
    
        } */}
          </div>
        ))
      ) : (
        <p className=" text-2xl text-center my-10 "> No Post Found </p>
      )}
          </div>
        </section>
    )
}

export default UserPosts;