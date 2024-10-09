import { BsThreeDots } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { FaRegFlag } from "react-icons/fa6";
import { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
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
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import UseLikes from "../../../Hooks/UseLikes";
import UseDisLikes from "../../../Hooks/UseDisLike";
import PostComponent from "./PostComponent";
import UseFollowers from "../../../Hooks/UseFollowers";
import LikeDislikeFilter from "../../adnan/LikeDislikeFilter";
import DevLoader from "../../Fardus/DevLoader/DevLoader";

const CardRuhul = () => {
  const { user } = UseAuth(); // Get user info from auth hook
  let [posts, isLoading, refetch] = UsePosts(); // Fetch posts
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [likes] = UseLikes();
  const [dislikes] = UseDisLikes();
  const [newPosts, setNewPosts] = useState([]);
  const [follwers] = UseFollowers();
  // console.log(follwers);

  

  const handleFollow = async (postId, postUsername) => {
    if (!user) {
      toast("You need to log in to Follow / Unfollow.");
      return;
    }

    const newuser = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };

    if (newuser?.email && newuser?.photo) {
      try {
        // Make POST request to follow/unfollow the user
        const res = await axiosPublic.post(`/follow/${postId}`, { newuser });

        const { message } = res.data;

        await refetch(); // Refresh the data

        if (message === "Unfollowed successfully") {
          toast(`Unfollowed ${postUsername}`);
        } else if (message === "Followed successfully") {
          toast(`Following ${postUsername}`);
        } else {
          toast(`No changes made for ${postUsername}`);
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("An error occurred while processing your request.");
      }
    } else {
      toast("Invalid user data. Please log in again.");
    }
  };

  const handleLike = async (postId) => {
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
        .post(`/like/${postId}`, { newuser })
        .then((res) => {
          refetch();
          console.log(res.data);
        })
        .catch((err) => {
          refetch();
          console.log(err);
        });
    }
  };
  const handleDislike = async (postId) => {
    if (!user) {
      toast("You need to log in to dislike a post.");
      return;
    }
    const newuser = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };
    if (newuser?.email && newuser?.photo) {
      await axiosPublic
        .post(`/dislike/${postId}`, { newuser })
        .then((res) => {
          refetch();
          console.log(res.data);
        })
        .catch((err) => {
          refetch();
          console.log(err);
        });
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (isLoading) {
    return (
      <div className=" text-2xl text-center my-10 ">Post is loading ....</div>
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
                <div className="ml-5 mr-3">
                  <button
                    onClick={() => handleFollow(data._id, data.username)}
                    className={`p-1 font-semibold text-sm text-white rounded-xl w-full h-8 bg-blue-700`}>
                    {follwers &&
                    follwers.find(
                      (a) =>
                        a.followerEmail === user?.email &&
                        a.followingEmail === data?.userEmail
                    )
                      ? "Following"
                      : "Follow"}
                  </button>
                </div>
              </div>
              <div className="relative flex items-center gap-2">
                <div onClick={toggleDropdown} className="p-2 dark:hover:bg-gray-700 hover:bg-gray-200 rounded-full duration-200 cursor-pointer">
                  <BsThreeDots/>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-36 w-32 rounded-xl shadow-lg z-10">
                    <ul className="m-0 p-0 bg-white dark:bg-themeColor rounded-xl">
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
                  onClick={() => {
                    handleLike(data._id);
                  }}
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
                  onClick={() => {
                    handleDislike(data._id);
                  }}
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
                  to={`/detailsWithComments/${data._id}#commentSection`}
                  className="flex items-center space-x-1 hover:text-blue-500"
                >
                  <FaCommentAlt className="h-5 w-5" />
                  <span className="text-sm "> {data?.comments  || 0}</span>
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
