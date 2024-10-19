import { Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const GetPremium = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <style >{`
        @keyframes glow {
          0% {
            text-shadow: 0 0 2px #00bfff, 0 0 5px #00bfff;
          }
          50% {
            text-shadow: 0 0 5px #00bfff, 0 0 10px #00bfff;
          }
          100% {
            text-shadow: 0 0 2px #00bfff, 0 0 5px #00bfff;
          }
        }

        .glow-text:hover {
          animation: glow 2s infinite alternate;
        }

        .glow-button {
          box-shadow: 0 0 5px #00bfff, 0 0 10px #00bfff;
          transition: box-shadow 0.3s;
        }

        .glow-button:hover {
          box-shadow: 0 0 10px #00bfff, 0 0 20px #00bfff;
        }

        .glow-image {
          box-shadow: 0 0 5px #00bfff, 0 0 10px #00bfff;
        }
      `}</style>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-12 lg:px-24">

        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-4xl flex  justify-center items-center  lg:text-5xl font-extrabold tracking-tight text-blue-500   glow-text">
            <img className="h-20 border" src="https://res.cloudinary.com/dpomtzref/image/upload/v1729342679/logo_gxujbv.png" alt="" />evDive Premium
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Unlock a world of premium content and features with <strong>DevDive Premium</strong>. Enjoy an ad-free experience and exclusive access to mentors, real-time support, and live screen-sharing sessions.
          </p>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Premium Features:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Ads-free browsing</li>
              <li>Direct access to premium mentors</li>
              <li>Real-time meetings with screen-sharing</li>
              <li>24/7 premium support</li>
            </ul>
          </div>

          {/* Buttons Section */}
          <div className="flex space-x-4 mt-8">
            <Link to="/premium">
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg glow-button transition duration-300">
                <FaBangladeshiTakaSign className="text-xl" />
                <span>499 / month</span>
              </button>
            </Link>
            <Link to="/premium">
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold px-6 py-3 rounded-lg glow-button transition duration-300">
                <FaBangladeshiTakaSign className="text-xl" />
                <span>4999 / year (Save 40%)</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dpomtzref/image/upload/v1729341671/DALL_E_2024-10-19_18.37.13_-_A_cheerful_white_mascot_character_with_a_red_antenna__sitting_on_an_elegant_royal_throne._The_throne_is_decorated_with_gold_and_plush_blue_cushions._T-removebg-preview_ndxf81.png"
            alt="DevDive Mascot"
            className="rounded-3xl shadow-2xl w-full h-auto glow-image transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white dark:to-gray-900 rounded-3xl"></div>
        </div>
      </div>


      
    </section>
  );
};

export default GetPremium;
