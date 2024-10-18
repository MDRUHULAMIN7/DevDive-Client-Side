import { useState, useEffect } from "react";
<<<<<<< HEAD
import { FaSearch, FaBars } from "react-icons/fa"; 
=======
import { FaSearch, FaBars } from "react-icons/fa"; // Import FaBars for the drawer toggle
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
import UseUser from "../../../Hooks/UseUser";
import ChatArea from "./ChatArea";
import SkeletonLoader from "../../../Components/Ruhul/Card-Ruhul/SkeletonLoader";
import { Helmet } from "react-helmet";

const Message = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users] = UseUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
<<<<<<< HEAD
  const [drawerOpen, setDrawerOpen] = useState(false); 
=======
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer visibility
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936

  // Filter users based on search input
  useEffect(() => {
    setFilteredUsers(
<<<<<<< HEAD
      users?.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
=======
      users &&
        users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
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
    <section className="flex flex-col lg:flex-row h-[calc(100vh-56px)]">
      <Helmet>
        <title>DevDive | Chat</title>
      </Helmet>

      {/* Drawer toggle button for small devices */}
      <button
<<<<<<< HEAD
        onClick={() => setDrawerOpen(!drawerOpen)}
        className="lg:hidden absolute top-16 left-4 z-20 bg-blue-500 rounded-full shadow-md p-2"
      >
        <FaBars className="text-black dark:text-white text-5xl" size={20} />
      </button>

      {/* Overlay to disable background interactions when drawer is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
=======
        onClick={() => setDrawerOpen(!drawerOpen)} // Toggle the drawer
        className="lg:hidden absolute top-16 left-4 z-20 bg-blue-500 rounded-full shadow-md p-2">
        <FaBars className="text-black dark:text-white text-5xl" size={20} />
      </button>

      {/* Drawer for small devices */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
        }`}
        onClick={() => setDrawerOpen(false)}
      />

<<<<<<< HEAD
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
=======
      <div
        className={`lg:hidden fixed top-4 left-0 bg-white dark:bg-gray-900 w-64 h-full overflow-y-auto transform transition-transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <h2 className="font-bold text-lg  mt-24 px-4">Users</h2>
        <div className="flex items-center  p-4">
          <FaSearch className="text-gray-600 dark:text-gray-400 mr-2 " />
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-white dark:bg-gray-800 border rounded focus:outline-none"
          />
        </div>
<<<<<<< HEAD
        <div
          style={{
            height: "calc(100% - 100px)", // Adjust height based on other content
            overflowY: "auto",
            scrollbarWidth: "none", // For Firefox
            "-ms-overflow-style": "none", // For IE and Edge
          }}
        >
          {filteredUsers.map((user) => (
=======
        {filteredUsers &&
          filteredUsers.map((user) => (
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
<<<<<<< HEAD
                selectedUser?._id === user._id ? "bg-blue-500" : ""
              } hover:bg-blue-600 transition`}
            >
=======
                selectedUser?._id === user._id ? "bg-blue-500 " : ""
              } hover:bg-blue-600 transition`}>
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
<<<<<<< HEAD
              <div className="flex-col">
=======
              <div className="flex-col ">
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
          ))}
<<<<<<< HEAD
        </div>
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex flex-col w-1/4 border-r p-4 bg-gray-100 dark:bg-gray-900 h-screen overflow-y-auto" style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}>
=======
      </div>

      {/* Sidebar for larger screens */}
      <div className="w-full hidden lg:flex flex-col lg:w-1/4 border-r p-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto hide-scrollbar h-[calc(100vh-56px)]">
        <style>{`
          .hide-scrollbar {
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
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
<<<<<<< HEAD
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
=======
        {filteredUsers &&
          filteredUsers.map((user) => (
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
              <div className="flex-col hidden md:flex">
                <p className="font-medium">{user.name}</p>
              </div>
>>>>>>> 10364c6c7aeb53d3aec8386fcecb9d6fdea55936
            </div>
          ))}
      </div>

      {/* Chat Area */}
      <div className="w-full lg:w-3/4  overflow-y-auto bg-white dark:bg-gray-900 h-[calc(100vh-56px)]">
        <ChatArea selectedUser={selectedUser} />
      </div>
    </section>
  );
};

export default Message;
