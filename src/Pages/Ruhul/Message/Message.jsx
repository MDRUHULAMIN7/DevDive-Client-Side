import { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import UseUser from "../../../Hooks/UseUser";
import ChatArea from "./ChatArea";
import SkeletonLoader from "../../../Components/Ruhul/Card-Ruhul/SkeletonLoader";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const Message = () => {
 
  const [users] = UseUser();
  const [selectedUser, setSelectedUser] = useState(users && users?.map((user1)=>user1?.email));
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

const {email}=useParams()
  useEffect(() => {
    setFilteredUsers(
     users && users?.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setDrawerOpen(false);
  };

  if (!users) {
    return (
      <section>
        <SkeletonLoader />
      </section>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row h-[calc(100vh-56px)] relative">
      <Helmet>
        <title>DevDive | Chat</title>
      </Helmet>

      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed bottom-3 left-2 text-blue-500  rounded-full bg-transparent p-3 z-40">
      <FaArrowLeft  className="text-xl font-bold " />
      </button>

      

      {/* Full-screen Drawer for Mobile */}
      <div
        className={`lg:hidden fixed inset-0 pt-16 bg-white dark:bg-gray-900 overflow-y-auto hide-scrollbar transition-transform z-40 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="p-4 flex items-center border-b border-gray-300 dark:border-gray-700">
        

          <div className="flex items-center  w-full bg-gray-100 dark:bg-gray-800 rounded-md p-2">
            <FaSearch className="text-gray-600 dark:text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

       
        <div className="p-4">
          <h2 className="font-bold text-lg mb-4">Users</h2>
          {filteredUsers && filteredUsers?.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
                selectedUser?._id === user._id ? "bg-blue-500 text-white" : ""
              } hover:bg-blue-600 transition`}>
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <p className="font-medium">{user.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar for Larger Screens */}
      <div className="w-full hidden lg:flex flex-col lg:w-1/4 border-r p-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto hide-scrollbar h-[calc(100vh-56px)]">
        <style>{`
          .hide-scrollbar {
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex items-center mb-4">
          <FaSearch className="text-gray-600 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-white dark:bg-gray-800 border rounded focus:outline-none"
          />
        </div>

        <h2 className="font-bold text-lg mb-4">Users</h2>
        {filteredUsers && filteredUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
              selectedUser?._id === user._id ? "bg-blue-500 text-white" : ""
            } hover:bg-blue-600 transition`}>
            <img
              src={user.photoUrl || 'https://res.cloudinary.com/dpomtzref/image/upload/v1729587017/User_icon_2.svg_jjnimz.png'}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-col hidden md:flex">
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full lg:w-3/4 overflow-y-auto bg-white dark:bg-gray-900 h-[calc(100vh-56px)]">
        <ChatArea email={email} selectedUser={selectedUser} />
      </div>
    </section>
  );
};

export default Message;
