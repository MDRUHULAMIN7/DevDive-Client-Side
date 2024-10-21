import { FaCrown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";
import { useEffect } from "react";
import { fetchUsers } from "../../Features/Users/UsersSlices";

const PremiumLink = () => {
  const users = useSelector((state) => state.users);
  const { user } = UseAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchUsers(user?.email));
    }
  }, [dispatch, user?.email]);

  const isPremium = users?.users?.mainuser?.userType === 'premium';

  return (
    <div>
      {isPremium ? (
      
        <div className="flex items-center gap-6 justify-center p-8 rounded-xl bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 shadow-lg">
          <FaCrown className="text-orange-300 w-20 h-20" />
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white">Welcome, Premium DevDive!</h1>
            <p className="text-white/80">Enjoy your exclusive benefits 🎉</p>
          </div>
        </div>
      ) : (
        // Link to Unlock Premium
        <NavLink
          to="/get-premium"
          className={({ isActive }) =>
            `group relative flex items-center gap-6 px-8 py-2 transition-all duration-300 rounded-xl shadow-lg 
            ${isActive ? "bg-blue-700 text-white" : "border-gradient-glow"} 
            hover:scale-105 hover:shadow-2xl`
          }
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <div>
            <div
              className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center shadow-md"
            >
              <FaCrown className="text-white w-8 h-8" />
            </div>

            <div className="flex flex-col text-gray-900 dark:text-white">
              <span className="text-xl font-semibold">Unlock Premium</span>
              <p className="text-sm text-gray-900 dark:text-white/80">
                Enjoy exclusive benefits
              </p>
            </div>

            <div
              className="ml-auto flex items-center px-3 justify-center w-10 h-10 
              dark:bg-white/10 bg-gray-400 rounded-full transition-transform duration-300 
              group-hover:translate-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 dark:text-white text-gray-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>

            <div
              className="absolute inset-0 pointer-events-none opacity-100 
              group-hover:opacity-0 confetti-container transition-opacity duration-300"
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="confetti"
                  style={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    backgroundColor: index % 2 === 0 ? "#fdd835" : "#ff4081",
                    borderRadius: "50%",
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    animation: `float 3s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Keyframe Animation for Floating Confetti */}
          <style>{`
            @keyframes float {
              0% {
                transform: translateY(0px);
                opacity: 1;
              }
              50% {
                transform: translateY(-10px);
                opacity: 0.8;
              }
              100% {
                transform: translateY(0px);
                opacity: 1;
              }
            }

            .border-gradient-glow {
              border: 2px solid;
              border-image-slice: 1;
              border-image-source: linear-gradient(45deg, #3b82f6, #06b6d4);
              background: transparent;
              color: white;
              box-shadow: 0 0 15px 5px rgba(59, 130, 246, 0.5);
            }
          `}</style>
        </NavLink>
      )}
    </div>
  );
};

export default PremiumLink;
