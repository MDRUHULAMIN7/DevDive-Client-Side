import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

const Chatbot = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show or hide the button depending on the scroll position
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to the top of the page when the button is clicked
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <section>
            {/* Chatbot content can go here */}

            {/* Scroll to top button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform duration-500 w-12 h-12 flex justify-center items-center ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                } hover:scale-110 hover:shadow-[0_0_15px_rgba(0,123,255,0.6)]`}
                style={{ transition: 'opacity 0.5s ease, transform 0.5s ease' }}
            >
                <FaArrowUp className="text-xl" />
            </button>
        </section>
    );
};

export default Chatbot;
