
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

const Slider = ({ slides }) => {


    return (

        <div className='rounded-xl'>
            <Swiper
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
                    slides.map((slide, index) => (
                        <SwiperSlide key={index} className="relative rounded-xl">
                            <div className="w-full h-[225px] relative rounded-xl">
                                {/* Image with consistent size */}
                                <img className="w-full h-full object-cover rounded-xl" src={slide.image} alt={slide.title} />
                                <div className="absolute rounded-xl inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                                {/* Text Content */}
                                <div className="absolute bottom-4 rounded-xl left-4 z-10 text-white space-y-2 p-4">
                                    <h3 className="text-lg font-bold">{slide.title}</h3>
                                    <p className="text-sm">{slide.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }


            </Swiper>
        </div>
    );
};

export default Slider;
