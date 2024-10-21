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
import UsePopularPosts from '../../Hooks/UsePopularPosts';
import SkeletonLoader from '../../Components/Ruhul/Card-Ruhul/SkeletonLoader';
import FollowButton from '../../Components/Ruhul/Card-Ruhul/FollowButton';
import DropDown from '../../Components/Ruhul/Card-Ruhul/DropDown';
import PostActions from '../../Components/Ruhul/Card-Ruhul/PostActions';

const Popular = () => {
    const { user } = UseAuth(); // Get user info from auth hook
    let [popularPosts, isLoading] = UsePopularPosts();
    const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is open
    const toggleDropdown = (id) => {
      setOpenDropdownId((prevId) => (prevId === id ? null : id)); // Toggle the same ID or close it
    };


     
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5; // Adjust the number of posts per page

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top on page change
    }, [currentPage]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = popularPosts?.slice(indexOfFirstPost, indexOfLastPost);

console.log(currentPosts)
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    if (isLoading) {
      return (
        <div className=" text-2xl text-center my-10 ">
          <SkeletonLoader />
          <SkeletonLoader />
        
        </div>
      );
    }

    return (
        <div className='mx-auto max-w-[1090px] pb-10 w-[95%]'>
            <Helmet>
                <title>DevDive | Popular</title>
            </Helmet>
         
            <section className="">
      {currentPosts?.length > 0 ? (
        currentPosts?.map((data, index) => (
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
              toggleDropdown={toggleDropdown} ></DropDown>
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
                  className="mySwiper h-[300px] md:h-[400px]  rounded-lg">
                  {data &&
                    data?.images?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="h-[300px] md:h-[400px]  w-full flex justify-center items-center overflow-hidden rounded-lg">
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
        <div>No Popular posts yet...</div>
      )}
    </section>

            {/* Pagination */}
            <div className="pagination flex justify-center mt-4">
                {Array.from({ length: Math.ceil(popularPosts?.length / postsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-2 mx-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Popular;
