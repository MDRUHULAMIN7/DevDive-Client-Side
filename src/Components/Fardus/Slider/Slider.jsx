import React, { useState } from 'react';

const Slider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 3) < slides.length ? prevIndex + 3 : prevIndex
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 3) >= 0 ? prevIndex - 3 : prevIndex
        );
    };

    return (
        <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${(currentIndex / 3) * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0 p-2">
                        <div className="relative">
                            <img src={slide.image} alt={slide.title} className="w-full rounded-lg h-[225px] object-cover" />
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 p-4 rounded-lg">
                                <h2 className="text-xl font-bold text-white">{slide.title}</h2>
                                <p className="text-white text-center">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
            >
                Prev
            </button>
            <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out"
            >
                Next
            </button>

        </div>
    );
};

export default Slider;
