import { Helmet } from 'react-helmet';
import Slider from '../../Components/Fardus/Slider/Slider';
import CardRuhul from '../../Components/Ruhul/Card-Ruhul/CardRuhul';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecentPostCard from '../../Components/Fardus/RecentPostCard/RecentPostCard';
import Chatbot from '../../Components/Ruhul/Cahtbot/Chatbot';
import { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SkeletonLoader from '../../Components/Ruhul/Card-Ruhul/SkeletonLoader';



const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    console.log(posts);

    // Fetch posts from API in batches
    const fetchPosts = async () => {
        try {
            const res = await axiosPublic.get(`/main-posts?page=${page}&limit=5`);
            const newPosts = res.data;

            setPosts(prevPosts => {
                const uniquePosts = [...prevPosts, ...newPosts];
                // Remove duplicates by using Set
                return [...new Map(uniquePosts.map(post => [post._id, post])).values()];
            });

            if (newPosts.length < 5) {
                setHasMore(false);
            } else {
                setPage(prevPage => prevPage + 1); // Move this inside else to avoid incrementing if less than 5
            }


        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []); // Initial fetch on component mount

    return (
        <div className='mx-auto max-w-[1090px] w-[95%] pt-3'>
            <Helmet>
                <title>DevDive | Home</title>
            </Helmet>
            <Slider />

            <div className="flex justify-between lg:mx-auto mt-5 ">
                <div className="lg:w-[68%] w-full space-y-5">
                    <CardRuhul />
                </div>

                {/* Infinite Scroll for Recent Posts */}
                <div id="scrollableDiv" className="sticky top-[68px] scrollBar h-[calc(100vh-80px)] overflow-y-auto lg:w-[28%] w-[32%] border dark:border-gray-800 rounded-xl py-5 px-3 lg:block hidden">
                    <h2 className="font-semibold text-black dark:text-white mb-5 px-3">Recent Posts</h2>

                    <InfiniteScroll
                        dataLength={posts.length} // Length of the posts array
                        next={fetchPosts} // Function to load more posts
                        hasMore={hasMore} // Check if more posts are available
                        loader={<SkeletonLoader value={"SideBar"}/>} // Loader when fetching
                        scrollableTarget="scrollableDiv"
                    >
                        <div className="space-y-5">
                            {posts.map((post) => (
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

export default Home;
