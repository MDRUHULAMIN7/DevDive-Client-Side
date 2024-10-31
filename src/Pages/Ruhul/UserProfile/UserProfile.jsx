import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { fetchUsers } from "../../../Features/Users/UsersSlices";

import { AiOutlineBars } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";
import { FaFileArchive } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlinePostAdd, MdPayment } from "react-icons/md";
import { Helmet } from "react-helmet";

import UseAuth from "../../../Hooks/UseAuth";
import Switcher1 from "../../../Components/Fardus/Switcher1/Switcher1";
import Logo from "../../../Components/Fardus/Logo/Logo";

const UserProfile = () => {
  const { email } = useParams();
  const { user } = UseAuth();
  const dispatch = useDispatch();
  
  const [isActive, setActive] = useState(false);


  // Sidebar Responsive Handler
  const handleToggle = () => setActive(!isActive);







  useEffect(() => {
    if (email) {
      dispatch(fetchUsers(email));
    }
  }, [dispatch, email]);

  return (
    <section className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
     
      <Helmet>
        <title>DevDive | UserProfile</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r dark:bg-gray-900 w-64 p-5 shadow-md transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Logo and Navigation */}
          <div>
      <div className="mb-5">
      <Logo></Logo>
      </div>

            <nav className="space-y-5">
              <NavLink
                to={`/users/${email}/profile`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }
              >
                <IoPerson className="text-lg" />
                <span className="mx-3 font-medium text-xs">Profile</span>
              </NavLink>

              <NavLink
                to={`/users/${email}/posts`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }
              >
                <MdOutlinePostAdd className="text-lg" />
                <span className="mx-3 font-medium text-xs">Posts</span>
              </NavLink>

              {user?.email === email && (
                <NavLink
                  to={`/users/${email}/archive/${email}`}
                  onClick={handleToggle}
                  className={({ isActive }) =>
                    `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                      isActive ? "bg-pm-color text-white" : ""
                    }`
                  }
                >
                  <FaFileArchive className="text-lg" />
                  <span className="mx-3 font-medium text-xs">Archives</span>
                </NavLink>
              )}

              {user?.email === email && (
                <NavLink
                  to={`/users/${email}/payment-history/${email}`}
                  onClick={handleToggle}
                  className={({ isActive }) =>
                    `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                      isActive ? "bg-pm-color text-white" : ""
                    }`
                  }
                >
                  <MdPayment className="text-lg" />
                  <span className="mx-3 font-medium text-xs">Payment History</span>
                </NavLink>
              )}
            </nav>
          </div>

 
          <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md  transition-all duration-300">
  <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
    <MdOutlineDarkMode className="text-xl" />
    <span className="text-sm font-medium">Dark Mode</span>
  </div>
  <Switcher1 />
</div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-4 shadow-md z-30">
        <Link to="/" className="flex items-center">
          <img
            src="https://res.cloudinary.com/dpomtzref/image/upload/v1729491491/1000005962_n0vgih.png"
            alt="logo"
            className="h-8"
          />
          <h1 className="text-3xl text-gray-900 dark:text-gray-100">evDive</h1>
        </Link>
        <button onClick={handleToggle} className="p-2 focus:outline-none">
          <AiOutlineBars className="h-6 w-6 text-gray-900 dark:text-gray-100" />
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 min-h-screen transition-all duration-300 ${
          isActive ? "opacity-100" : "opacity-100"
        } md:ml-64 p-5`}
      >
        <Outlet />
      </div>

      {/* Overlay for Small Screens */}
      {isActive && (
        <div className="fixed inset-0 z-20 lg:hidden bg-black opacity-50" onClick={handleToggle}></div>
      )}
    </section>
  );
};

export default UserProfile;
