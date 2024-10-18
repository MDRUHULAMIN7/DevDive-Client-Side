import { useState, useEffect } from "react";
import { FaSearch, FaBars } from "react-icons/fa"; 
import UseUser from "../../../Hooks/UseUser";
import ChatArea from "./ChatArea";
import SkeletonLoader from "../../../Components/Ruhul/Card-Ruhul/SkeletonLoader";
import { Helmet } from "react-helmet";

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users] = UseUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false); 

  // Filter users based on search input
  useEffect(() => {
    setFilteredUsers(
      users?.filter((user) =>
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
    <section className="flex flex-col lg:flex-row h-screen">
      <Helmet>
        <title>DevDive | Chat</title>
      </Helmet>

      {/* Drawer toggle button for small devices */}
      <button
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="lg:hidden absolute top-16 left-4 z-20 bg-blue-500 rounded-full shadow-md p-2"
      >
        <FaBars className="text-black dark:text-white text-5xl" size={20} />
      </button>

      {/* Overlay to disable background interactions when drawer is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer for small devices */}
      <div
        className={`fixed top-0 left-0 w-64 z-20 h-full bg-white dark:bg-gray-900 overflow-y-auto transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          overflowY: "auto",
          scrollbarWidth: "none", // For Firefox
          "-ms-overflow-style": "none", // For IE and Edge
        }}
      >
        <h2 className="font-bold text-lg mt-24 px-4">Users</h2>
        <div className="flex items-center p-4">
          <FaSearch className="text-gray-600 dark:text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-white dark:bg-gray-800 border rounded focus:outline-none"
          />
        </div>
        <div
          style={{
            height: "calc(100% - 100px)", // Adjust height based on other content
            overflowY: "auto",
            scrollbarWidth: "none", // For Firefox
            "-ms-overflow-style": "none", // For IE and Edge
          }}
        >
          {filteredUsers.map((user) => (
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
              <div className="flex-col">
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex flex-col w-1/4 border-r p-4 bg-gray-100 dark:bg-gray-900 h-screen overflow-y-auto" style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}>
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
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
              selectedUser?._id === user._id ? "bg-blue-500 text-white" : ""
            } hover:bg-blue-600 transition`}
          >
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-col hidden md:flex">
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="w-full lg:w-3/4 h-screen overflow-y-auto bg-white dark:bg-gray-900">
        <ChatArea selectedUser={selectedUser} />
      </div>
    </section>
  );
};

export default Message;
