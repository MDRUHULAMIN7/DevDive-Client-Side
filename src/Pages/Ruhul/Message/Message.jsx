import { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft,  FaCrown, FaArrowRight } from "react-icons/fa"; // Icons added
import UseUser from "../../../Hooks/UseUser";
import ChatArea from "./ChatArea";
import SkeletonLoader from "../../../Components/Ruhul/Card-Ruhul/SkeletonLoader";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import UseAuth from "../../../Hooks/UseAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../Features/Users/UsersSlices";
import { MdClose } from "react-icons/md";

const Message = () => {
  const [users] = UseUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("member");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { user } = UseAuth(); 
  const { email } = useParams();
 

  const users2 = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(fetchUsers(email));
    }
  }, [dispatch, email]);



  
  useEffect(() => {
    const filtered = Array.isArray(users) ? users.filter(
      (user2) =>
        user2.email !== user.email &&
        user2.role === selectedRole &&
        user2.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : []; 
  
    setFilteredUsers(filtered);
  }, [searchTerm, users, user.email, selectedRole]);
  const handleUserClick = (user2) => {
    setSelectedUser(user2);
    setDrawerOpen(false);
  };

  const canUseDropdown =
    users2 &&
    (users2.users?.mainuser?.role !== "member" || users2?.users?.mainuser?.userType !== "normal");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); 

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
        className="lg:hidden fixed bottom-3 left-1 text-blue-500 rounded-full bg-transparent p-3 z-40"
      >
        <FaArrowLeft className="text-xl font-bold" />
      </button>

      <div
        className={`lg:hidden fixed inset-0 pt-16 bg-white dark:bg-gray-900 overflow-y-auto hide-scrollbar transition-transform z-40 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center w-full bg-gray-100 dark:bg-gray-800 rounded-md p-2">
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
  {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
    filteredUsers.map((user) => (
      <div
        key={user._id}
        onClick={() => handleUserClick(user)}
        className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
          selectedUser?._id === user._id ? "bg-blue-500 text-white" : ""
        } hover:bg-blue-600 transition`}
      >
        <img
          src={
            user.photoUrl ||
            "https://res.cloudinary.com/dpomtzref/image/upload/v1729587017/User_icon_2.svg_jjnimz.png"
          }
          alt={user.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <p className="font-medium">{user.name}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500 dark:text-gray-400">No users found.</p>
  )}
</div>

      </div>

      
      <div className="w-full hidden lg:flex flex-col lg:w-1/4 border-r p-4 bg-gray-100 dark:bg-gray-900 overflow-y-auto hide-scrollbar h-[calc(100vh-56px)]">
        <div
        
        onClick={() => {
          if (!canUseDropdown) openModal();
        }} 
        
        className="flex items-center cursor-pointer justify-center mb-4 space-x-4">
          <label className="font-semibold text-lg">Change Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border rounded bg-white dark:bg-gray-800"
            disabled={!canUseDropdown}
         
         
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
          </select>

        
          {!canUseDropdown && (
            <FaCrown  onClick={openModal} className="text-blue-500 text-xl ml-2" title="Premium User" />
          ) }
        </div>

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
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => handleUserClick(user)}
            className={`flex items-center p-2 mb-2 cursor-pointer rounded ${
              selectedUser?._id === user._id ? "bg-blue-500 text-white" : ""
            } hover:bg-blue-600 transition`}
          >
            <img
              src={
                user.photoUrl ||
                "https://res.cloudinary.com/dpomtzref/image/upload/v1729587017/User_icon_2.svg_jjnimz.png"
              }
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

    
      {isModalOpen && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

       
       <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-2xl max-w-md w-full">
       <button      className="text-xl"    onClick={closeModal} >
        <MdClose />
        </button>
        <Link   to="/get-premium"> <div className="flex items-center justify-between p-4">
           <p className="text-lg font-semibold text-gray-800 dark:text-white">
             Unlock Premium DevDive
           </p>
           <button 
    
             className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
           >
             <FaArrowRight className="text-xl" />
           </button>
         </div></Link>
         <p className="mt-4 text-gray-600 dark:text-gray-400">
           Access restricted. Unlock premium features or contact the admin for more details.
         </p>
       </div>
     </div>
     
      )}
    </section>
  );
};

export default Message;
