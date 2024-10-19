
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import UseAuth from '../../../Hooks/UseAuth';

const Chatbot = () => {
    const { user } = UseAuth();

    return (
        <Link to={`/chat/${user?.email}`} className='z-50'>
            {/* Always visible Chatbot button */}
            <button
                className={`fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform duration-500 w-12 h-12 flex justify-center items-center hover:scale-110 hover:shadow-[0_0_15px_rgba(0,123,255,0.6)] glowing-button`}
            >
                <IoChatboxEllipsesOutline className="text-2xl" />
            </button>
            <style>
                {`
                    .glowing-button {
                        box-shadow: 0 0 5px rgba(59, 130, 246, 0.7);
                        animation: glow 1.5s infinite alternate;
                    }

                    @keyframes glow {
                        0% {
                            box-shadow: 0 0 5px rgba(59, 130, 246, 0.7);
                        }
                        100% {
                            box-shadow: 0 0 20px rgba(59, 130, 246, 1);
                        }
                    }
                `}
            </style>
        </Link>
    );
};

export default Chatbot;
