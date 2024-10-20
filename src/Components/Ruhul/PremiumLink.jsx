import { FaCrown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const PremiumLink = () => {
  return (
    <NavLink
      to="/get-premium"
      className={({ isActive }) =>
        `group relative flex items-center gap-4 px-6  
        rounded-full bg-gradient-to-br from-blue-500 to-cyan-600
        text-white font-semibold transition-all duration-500 
        hover:scale-110 hover:shadow-xl hover:shadow-cyan-400/50 
        ${
          isActive
            ? "backdrop-blur-xl bg-opacity-70"
            : "bg-opacity-90 hover:bg-opacity-100"
        }`
      }
    >
      {/* Floating Avatar */}
      <div
        className="relative w-12 h-12 rounded-full overflow-hidden 
        border-4 border-white shadow-md hover:shadow-cyan-400/70 
        animate-pulse"
      >
        <img
          src="https://res.cloudinary.com/dpomtzref/image/upload/v1729360296/50804_hnbrab.jpg"
          alt="Premium Avatar"
          className="object-cover"
        />
      </div>

      {/* Premium Text with Crown Icon */}
      <div className="flex items-center space-x-2">
        <FaCrown className="text-yellow-400 w-6 h-6 animate-bounce" />
        <span className=" font-bold tracking-wide">
          Get Premium
        </span>
      </div>

      {/* Animated Arrow Icon */}
      <span className="ml-auto group-hover:translate-x-2 transition-transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>

      {/* Confetti Animation */}
      <div className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-100 confetti-animation" style={{ position: 'relative', height: '100px' }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="confetti"
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              backgroundColor: '#ffcc00',
              opacity: 0.8,
              animation: `fall 2s infinite ease-in`,
              left: `${(index + 1) * 20}%`, // Spread confetti across the width
              animationDelay: `${index * 0.2}s`, // Stagger the fall
            }}
          />
        ))}
      </div>

      {/* Inline Styles for Keyframes */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }
      `}</style>
    </NavLink>
  );
};

export default PremiumLink;
