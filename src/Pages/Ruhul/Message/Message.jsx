import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import React Icons
import UseUser from "../../../Hooks/UseUser";
import ChatArea from "./ChatArea";
import SkeletonLoader from "../../../Components/Ruhul/Card-Ruhul/SkeletonLoader";


const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users] = UseUser();
  const scrollRef = useRef(null); // Ref for scrolling

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" }); // Scroll left
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" }); // Scroll right
    }
  };
if(!users){

  return(
    <section>
      <SkeletonLoader></SkeletonLoader>
    </section>
  )
}
  return (
    <section className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar for larger screens */}
      <div className="w-full hidden lg:flex flex-col lg:w-1/4 border-r p-2 md:p-4 bg-gray-100 dark:bg-gray-900 h-screen overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Users</h2>
        {users?.length &&
          users?.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
                selectedUser?._id === user._id ? "bg-blue-500" : ""
              } hover:bg-blue-600 transition`}
            >
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-col hidden md:flex">
                <p className="font-medium ">{user.name}</p>
              
              </div>
            </div>
          ))}
      </div>

      {/* Horizontal User Slider for Mobile */}
      <div className="relative lg:hidden flex items-center">
   
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-blue-500  rounded-full shadow-md p-1"
          style={{ top: "50%", transform: "translateY(-50%)" }} 
        >
          <FaChevronLeft className="text-gray-700 dark:text-gray-300" size={20} />
        </button>

 
        <div
          ref={scrollRef}
          className="flex gap-x-4 p-2 bg-gray-100 dark:bg-gray-900 overflow-x-auto overflow-y-hidden whitespace-nowrap px-4"
          style={{
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch', 
          }}
        >
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`flex-shrink-0 flex flex-col items-center cursor-pointer p-1 rounded-full transition duration-200 ease-in-out ${
                selectedUser?._id === user._id ? "bg-blue-500" : ""
              } hover:bg-blue-200 transform hover:scale-105`}
            >
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-14 h-14 rounded-full border border-gray-300 shadow-md"
              />
              
            </div>
          ))}
        </div>

 
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-blue-500 rounded-full shadow-md p-1"
          style={{ top: "50%", transform: "translateY(-50%)" }} 
        >
          <FaChevronRight className="text-gray-700 dark:text-gray-300" size={20} />
        </button>
      </div>

 
      <div className="w-full lg:w-3/4 md:h-screen overflow-y-auto bg-white dark:bg-gray-900">
        <ChatArea selectedUser={selectedUser} />
      </div>
    </section>
  );
};

export default Message;
