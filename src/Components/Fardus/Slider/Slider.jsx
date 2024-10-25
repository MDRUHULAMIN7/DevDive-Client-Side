
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import PostComponent from '../../Ruhul/Card-Ruhul/PostComponent';
import UsePopularPosts from '../../../Hooks/UsePopularPosts';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../Ruhul/Card-Ruhul/SkeletonLoader';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useEffect } from 'react';

const Slider = () => {
    const axiosPublic = useAxiosPublic();
    const [popularPosts, setPopularPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const load = [1, 2, 3]

    const fetchData = async() =>{
        setIsLoading(true)
        const {data} = await axiosPublic.get('/get-popular-posts')
        const { posts, totalPosts } = data;
        setPopularPosts(posts)
        setIsLoading(false)
    }

    useEffect(() =>{
        fetchData()
    },[])

    return (

        <div className='rounded-xl'>
            {
                isLoading ? <Swiper
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1, // 1 slide for small screens
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 2, // 2 slides for tablets
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3, // 3 slides for larger devices
                        },
                    }}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        load.map((slide, index) => (
                            <SwiperSlide key={index} className="relative rounded-xl">
                                <SkeletonLoader value={"Slider"} />
                            </SwiperSlide>
                        ))
                    }


                </Swiper> : <Swiper
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1, // 1 slide for small screens
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 2, // 2 slides for tablets
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3, // 3 slides for larger devices
                        },
                    }}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        popularPosts.map((slide, index) => (
                            <SwiperSlide key={index} className="relative rounded-xl">
                                <Link to={`/post-details/${slide._id}`}>
                                    <div className="w-full h-[225px] relative rounded-xl">
                                        {/* Image with consistent size */}
                                        {
                                            slide.images.length >= 0 && <img className="w-full h-full object-cover rounded-xl" src={slide.images[0]} />
                                        }
                                        <div className="absolute rounded-xl inset-0 bg-black bg-opacity-60"></div>

                                        {/* Text Content */}
                                        <div className="absolute bottom-4 rounded-2xl text-left z-10 text-white space-y-3 p-4">
                                            <h3 className="font-bold text-sm">{slide.title}</h3>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-10 h-10 object-cover rounded-full'>
                                                    <img src={slide?.profilePicture} alt="" className='w-10 h-10 object-cover rounded-full' />
                                                </div>
                                                <div>
                                                    <h3 className='text-xs mb-1 font-semibold'>{slide?.username}</h3>
                                                    <span className="block text-gray-500 dark:text-gray-400 text-xs">{slide?.userEmail}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))
                    }


                </Swiper>

            }
        </div>
    );
};

export default Slider;
