import { Helmet } from 'react-helmet';
import { useState, useEffect } from "react";
import {
  FaCommentAlt,
  FaShare,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import UseAuth from '../../Hooks/UseAuth';
import PostComponent from '../../Components/Ruhul/Card-Ruhul/PostComponent';
import SkeletonLoader from '../../Components/Ruhul/Card-Ruhul/SkeletonLoader';
import DropDown from '../../Components/Ruhul/Card-Ruhul/DropDown';
import PostActions from '../../Components/Ruhul/Card-Ruhul/PostActions';
import Chatbot from '../../Components/Ruhul/Cahtbot/Chatbot';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecentPostCard from '../../Components/Fardus/RecentPostCard/RecentPostCard';
import Slider from '../../Components/Fardus/Slider/Slider';

const Following = () => {
    const { user } = UseAuth();
    const axiosPublic = useAxiosPublic();
    const [followingPosts, setFollowingPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [hasMoreFollowing, setHasMoreFollowing] = useState(true);
    const [page, setPage] = useState(1);
    const [page2, setPage2] = useState(1);
    const [recentPosts, setRecentPosts] = useState([]);
    const [hasMoreRecent, setHasMoreRecent] = useState(true);
    

    const fetchFollowingPosts = async () => {
      try {
          const res = await axiosPublic.get(`/get-following-posts/${user?.email}?page=${page2}&limit=5`);
          const newPosts = res.data;
  
          setFollowingPosts(prevPosts => {
              const uniquePosts = [...prevPosts, ...newPosts];

              return [...new Map(uniquePosts.map(post => [post._id, post])).values()];
          });
  

          if (newPosts.length < 5) {
              setHasMoreFollowing(false);
          } else {
              setPage2(prevPage => prevPage + 1);
          }
      } catch (error) {
          console.error("Error fetching following posts:", error);
      }
  };
  

    // Fetch recent posts
    const fetchRecentPosts = async () => {
        try {
            const res = await axiosPublic.get(`/main-posts?page=${page}&limit=5`);
            const newPosts = res.data;

            setRecentPosts(prevPosts => {
                const uniquePosts = [...prevPosts, ...newPosts];
                return [...new Map(uniquePosts.map(post => [post._id, post])).values()];
            });

            if (newPosts.length < 5) {
                setHasMoreRecent(false);
            } else {
                setPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error("Error fetching recent posts:", error);
        }
    };


    useEffect(() => {
        fetchFollowingPosts();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchFollowingPosts();
        fetchRecentPosts();
        setIsLoading(false);
    }, [user?.email]);

    const toggleDropdown = (id) => {
        setOpenDropdownId(prevId => (prevId === id ? null : id)); 
    };

    console.log(user?.email);

    return (
        <div className='mx-auto max-w-[1090px] pb-10 w-[95%]'>
            <Helmet>
                <title>DevDive | Following</title>
            </Helmet>
            <div className='mt-3'>
            <Slider/>
            </div>
            <div className="flex justify-between lg:mx-auto mt-5">
                <div className="lg:w-[68%] w-full space-y-5">
                    <section className="">
                        {isLoading ? (
                            <div className="text-2xl text-center my-10">
                                <SkeletonLoader value={"PostCard"} />
                                <SkeletonLoader value={"PostCard"} />
                            </div>
                        ) : (
                            <InfiniteScroll
                                dataLength={followingPosts.length}
                                next={fetchFollowingPosts} 
                                hasMore={hasMoreFollowing} 
                                loader={<SkeletonLoader value={"PostCard"} />}
                                scrollableTarget="scrollableDiv"
                            >
                                {followingPosts.length > 0 ? followingPosts.map((data, index) => (
                                    <div key={index} className="mt-4 bg-white dark:bg-gray-900 shadow-md mx-1 rounded-lg p-4 my-4 md:mx-auto border border-gray-200 dark:border-gray-700">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center">
                                                <img src={data.profilePicture} alt="User" className="rounded-full h-10 w-10 object-cover" />
                                                <div className="ml-3">
                                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{data.username}</h3>
                                                    <PostComponent data={data} />
                                                </div>
                                            </div>
                                            <div className="relative flex items-center gap-2">
                                                <DropDown id={data._id} isOpen={openDropdownId === data._id} toggleDropdown={toggleDropdown} />
                                            </div>
                                        </div>
                                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{data?.title}</h2>
                                        {data.body && (
                                            <div className="text-gray-700 dark:text-gray-300 mb-3">
                                                <p>
                                                    <span dangerouslySetInnerHTML={{ __html: data.body?.slice(0, 200) }} />
                                                    <Link className="text-blue-600 mt-1 block" to={`/post-details/${data._id}`}>See more...</Link>
                                                </p>
                                            </div>
                                        )}
                                        {data.images[0] && (
                                            <Swiper spaceBetween={30} pagination={{ clickable: true }} modules={[Pagination]} className="mySwiper h-[300px] md:h-[400px] rounded-lg">
                                                {data.images.map((image, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className="h-[300px] md:h-[400px] w-full flex justify-center items-center overflow-hidden rounded-lg">
                                                            <img src={image} alt="Post" className="w-full h-full object-cover" />
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        )}
                                        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm mt-3">
                                            <div className="flex items-center space-x-4">
                                                <PostActions data={data} user={user} />
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <Link to={`/detailsWithComments/${data._id}#commentSection`} className="flex items-center space-x-1 hover:text-blue-500">
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
                                )) : <SkeletonLoader value={"PostCard"} />}
                            </InfiniteScroll>
                        )}
                    </section>
                </div>

                {/* Infinite Scroll for Recent Posts */}
                <div id="scrollableDiv" className="sticky top-[68px] scrollBar h-[calc(100vh-80px)] overflow-y-auto lg:w-[28%] w-[32%] border dark:border-gray-800 rounded-xl py-5 px-3 lg:block hidden">
                    <h2 className="font-semibold text-black dark:text-white mb-5 px-3">Recent Posts</h2>

                    <InfiniteScroll
                        dataLength={recentPosts.length} 
                        next={fetchRecentPosts}
                        hasMore={hasMoreRecent}
                        loader={<SkeletonLoader value={"SideBar"} />}
                        scrollableTarget="scrollableDiv"
                    >
                        <div className="space-y-5">
                            {recentPosts.map((post) => (
                                <div key={post._id}>
                                    <RecentPostCard post={post} />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>

                <Chatbot />
            </div>
        </div>
    );
};

export default Following;
