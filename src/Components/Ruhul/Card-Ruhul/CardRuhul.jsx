import { useState, useEffect } from "react";
import { FaCommentAlt, FaShare } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import UseAuth from "../../../Hooks/UseAuth";
import UseLikes from "../../../Hooks/UseLikes";
// import UseDisLikes from "../../../Hooks/UseDisLike";
import UseAllComments from "../../../Hooks/adnan/UseAllComments";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SkeletonLoader from "./SkeletonLoader";
import PostComponent from "./PostComponent";
import PollData from "./PollData";
import FollowButton from "./FollowButton";
import DropDown from "./DropDown";
import PostActions from "./PostActions";

const CardRuhul = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [likes] = UseLikes();
  // const [disLikes] = UseDisLikes();
  const [comments] = UseAllComments();
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  // const [reLoad, setReLoad] = useState(false);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const fetchPosts = async () => {
    try {
      // setIsLoading(true);
      const res = await axiosPublic.get(`/random-posts?page=${page}&limit=5`);
      const fetchedPosts = res.data;
      setPosts((prevPosts) => {
        const uniquePosts = [...prevPosts, ...fetchedPosts];
        return [...new Map(uniquePosts.map((post) => [post._id, post])).values()];
      });
      setNewPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
      setPage((prevPage) => prevPage + 1);
      if (fetchedPosts.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filteredPosts = posts;
    if (sortOption === "my-liked-posts") {
      const likedPostIds = likes
        .filter((like) => like?.email === user?.email)
        .map((like) => like.postId);
      filteredPosts = posts.filter((post) => likedPostIds.includes(post._id));
    } else if (sortOption === "my-commented-posts") {
      const commentedPostIds = comments
        .filter((comment) => comment?.userName === user?.displayName)
        .map((comment) => comment.contentId);
      filteredPosts = posts.filter((post) =>
        commentedPostIds.includes(post._id)
      );
    }
    setNewPosts(filteredPosts);
  }, [sortOption, posts, likes, comments, user]);

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <section>
      {/* Filter component */}
      <div className="flex justify-end">
        <select
          className="w-36 p-1 border dark:border-themeColor3 rounded-md outline-none bg-white text-black dark:bg-themeColor dark:text-white"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled selected>
            Filter
          </option>
          <option value="all-posts">All</option>
          <option value="my-liked-posts">Liked Posts</option>
          <option value="my-commented-posts">Commented Posts</option>
        </select>
      </div>

      <InfiniteScroll
        dataLength={newPosts.length} // Length of filtered posts
        next={fetchPosts} // Function to fetch more posts
        hasMore={hasMore} // Check if more posts are available
        loader={<SkeletonLoader value={"PostCard"} />} // Loading skeleton
      >
        {newPosts?.length > 0 && (
          newPosts?.map((data) => (
            <div
              key={data._id}
              className="mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 my-4 md:mx-auto border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
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
                    <PostComponent data={data}></PostComponent>
                  </div>
                  <div className="ml-5 mr-3">
                    {user?.email && user.email !== data.userEmail && (
                      <FollowButton user={user} data={data}></FollowButton>
                    )}
                  </div>
                </div>
                <div className="relative flex items-center gap-2">
                  <DropDown
                    id={data._id}
                    isOpen={openDropdownId === data._id}
                    toggleDropdown={toggleDropdown}
                    archiveData={data}
                  ></DropDown>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                {data?.title}
              </h2>
              {data.body && (
                <div className="text-gray-700 dark:text-gray-300">
                  <p>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data.body && data?.body?.slice(0, 200),
                      }}
                    />
                    <Link
                      className="text-blue-600 mt-1 block"
                      to={`/post-details/${data._id}`}
                    >
                      See more....
                    </Link>
                  </p>
                </div>
              )}

              {data?.poll?.length > 0 && (
                <div className="text-gray-700 dark:text-gray-300">
                  <PollData pollPost={data}></PollData>
                </div>
              )}

              <div className="my-4">
                {data.images[0] && (
                  <Swiper
                    spaceBetween={30}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper h-[300px] md:h-[400px] rounded-lg"
                  >
                    {data?.images?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="h-[300px] md:h-[400px] w-full flex justify-center items-center overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt="Post"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              <div className="flex flex-wrap justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center space-x-4">
                  <PostActions data={data} user={user}></PostActions>
                </div>

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
        )}
      </InfiniteScroll>
    </section>
  );
};

export default CardRuhul;
