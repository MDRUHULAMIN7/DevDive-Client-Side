import { FaRobot, FaBrain } from "react-icons/fa"; // Relevant AI icons!
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <Link 
            to={`/ai`} 
            onClick={toggleChat} 
            className="z-50"
        >
            <button
                className={`fixed bottom-5 right-5 
                    ${isOpen ? 'bg-green-500' : 'bg-blue-600'} 
                    text-white rounded-full shadow-2xl 
                    transition-transform duration-500 ease-out 
                    w-16 h-16 flex justify-center items-center 
                    hover:scale-125 hover:rotate-12 floating-animation glowing-border
                `}
            >
              
                {isOpen ? (
                    <FaBrain className="text-3xl animate-spin-slow" />
                ) : (
                    <FaRobot className="text-3xl animate-wiggle" />
                )}
            </button>

       
            <span 
                className="absolute bottom-20 right-8 text-sm bg-black 
                text-white px-3 py-1 rounded-md opacity-0 transition-opacity 
                duration-300 chatbot-tooltip"
            >
                Chat with DevAI!
            </span>

         
            <style>
                {`
                    /* Floating button animation */
                    .floating-animation {
                        animation: float 3s ease-in-out infinite;
                    }

                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }

                    /* Glowing border */
                    .glowing-border {
                        box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
                    }

                    /* Slow spinning brain icon */
                    .animate-spin-slow {
                        animation: spin 4s linear infinite;
                    }

                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    /* Wiggle effect for robot icon */
                    .animate-wiggle {
                        animation: wiggle 1s ease-in-out infinite;
                    }

                    @keyframes wiggle {
                        0%, 100% { transform: rotate(0deg); }
                        25% { transform: rotate(-5deg); }
                        75% { transform: rotate(5deg); }
                    }

                    /* Tooltip fade-in on hover */
                    button:hover + .chatbot-tooltip {
                        opacity: 1;
                    }
                `}
            </style>
        </Link>
    );
};

export default Chatbot;
