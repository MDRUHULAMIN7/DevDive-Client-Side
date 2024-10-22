
import { FaShare } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import PostComponent from '../../../../Components/Ruhul/Card-Ruhul/PostComponent';
import { Link } from 'react-router-dom';
import { FaCommentAlt } from 'react-icons/fa';
import PostActions from '../../../../Components/Ruhul/Card-Ruhul/PostActions';

const AllPostModal = ({ data, onClose, user }) => {




    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-3xl mx-4 md:mx-auto overflow-y-auto max-h-[90vh]">
                <div className="mt-4 bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 my-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-3">
                        <div className="flex items-center mb-4 md:mb-0">
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
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {data?.title}
                    </h2>

                    <div className="text-gray-700 dark:text-gray-300 mb-4">
                        <p>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: data.body && data?.body?.slice(0, 100),
                                }}
                            />
                            <Link className="text-blue-600 mt-1 block" to={`/post-details/${data._id}`}>
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
                                className="mySwiper h-[200px] md:h-[300px] rounded-lg"
                            >
                                {data?.images?.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="h-[200px] md:h-[300px] w-full flex justify-center items-center overflow-hidden rounded-lg">
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
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <PostActions data={data} user={user}></PostActions>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link to={`/detailsWithComments/${data._id}`} className="flex items-center space-x-1 hover:text-blue-500">
                                <FaCommentAlt className="h-5 w-5" />
                                <span className="text-sm">Comments</span>
                            </Link>
                            <button className="flex items-center space-x-1 hover:text-gray-800">
                                <FaShare className="h-5 w-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllPostModal;
