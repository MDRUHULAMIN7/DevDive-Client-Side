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
import FollowButton from '../../Components/Ruhul/Card-Ruhul/FollowButton';
import DropDown from '../../Components/Ruhul/Card-Ruhul/DropDown';
import PostActions from '../../Components/Ruhul/Card-Ruhul/PostActions';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {
    const { user } = UseAuth();
    const axiosPublic = useAxiosPublic();
    const [popularPosts, setPopularPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const postsPerPage = 5; // Number of posts per fetch

    const fetchPopularPosts = async () => {
        try {
            const { data } = await axiosPublic.get(`/get-popular-posts?page=${currentPage}&limit=${postsPerPage}`);
            setPopularPosts((prevPosts) => [...prevPosts, ...data]);

            // If the data length is less than the limit, we have no more posts to load
            if (data.length < postsPerPage) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching popular posts:", error);
        }
    };

    useEffect(() => {
        fetchPopularPosts(); // Fetch posts on component mount
    }, [currentPage]);

    const loadMorePosts = () => {
        setCurrentPage((prevPage) => prevPage + 1); // Increment page number to load more posts
    };

    if (!popularPosts.length) {
        return (
            <div className="text-2xl text-center my-10">
                <SkeletonLoader value={"PostCard"} />
                <SkeletonLoader value={"PostCard"} />
            </div>
        );
    }

    return (
        <div className='mx-auto max-w-[1090px] pb-10 w-[95%]'>
            <Helmet>
                <title>DevDive | Popular</title>
            </Helmet>

            <InfiniteScroll
                dataLength={popularPosts.length} // Length of data to monitor scroll position
                next={loadMorePosts} // Function to load more posts
                hasMore={hasMore} // Whether more posts are available
                loader={<SkeletonLoader value={"PostCard"} />} // Loader while fetching more data
                endMessage={<p className="text-center mt-4">No more posts to load.</p>} // Message when no more posts
            >
                <section>
                    {popularPosts.map((data, index) => (
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

                                        <PostComponent data={data} />
                                    </div>
                                    <div className="ml-5">
                                        <FollowButton user={user} data={data}></FollowButton>
                                    </div>
                                </div>
                                <div className="relative flex items-center gap-2">
                                    <DropDown id={data._id}
                                        isOpen={openDropdownId === data._id}
                                        toggleDropdown={toggleDropdown}></DropDown>
                                </div>
                            </div>

                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                                {data?.title}
                            </h2>

                            {data.body && (
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
                            )}

                            <div className="my-4">
                                {data.images[0] && (
                                    <Swiper
                                        spaceBetween={30}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}
                                        className="mySwiper h-[300px] md:h-[400px] rounded-lg">
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
                                    {/* Like */}
                                    <PostActions data={data} user={user}></PostActions>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Link
                                        to={`/detailsWithComments/${data._id}#commentSection`}
                                        className="flex items-center space-x-1 hover:text-blue-500">
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
                    ))}
                </section>
            </InfiniteScroll>
        </div>
    );
};

export default Popular;
