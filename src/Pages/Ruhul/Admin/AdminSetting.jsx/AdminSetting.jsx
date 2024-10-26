import { Link, NavLink, Outlet } from "react-router-dom";

import { AiOutlineBars } from "react-icons/ai";

import { FaChalkboardTeacher, FaRegFlag, FaUsers } from "react-icons/fa";
import {  MdOutlineDarkMode, MdOutlinePayments, MdOutlinePostAdd } from "react-icons/md";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";


import Switcher1 from "../../../../Components/Fardus/Switcher1/Switcher1";
import Logo from "../../../../Components/Fardus/Logo/Logo";
const AdminSetting = () => {
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };



  return (
    <section className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}

      <Helmet>
        <title>DevDive | AdminSetting</title>
      </Helmet>
      <div
        className={`fixed top-0 left-0 h-full bg-white  border-r dark:bg-gray-900 w-64 p-5 shadow-md transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-5">
              <Logo></Logo>
            </div>

            <nav className="space-y-5">
              {/* ManageUSers */}

              <h1 className="text-xl pl-4 text-gray-900 dark:text-gray-100">
                Admin Settings
              </h1>
              <NavLink
                to={`/admin/settings/manage-users`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <FaUsers className="text-lg" />
                <span className="mx-3 font-medium text-xs">ManageUsers</span>
              </NavLink>
              <NavLink
                to={`/admin/settings/manage-mentors`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <FaChalkboardTeacher className="text-lg" />
                <span className="mx-3 font-medium text-xs">
                  Approved Mentors
                </span>
              </NavLink>

              {/* AllPosts */}
              <NavLink
                to={`/admin/settings/allposts`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  ` text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <MdOutlinePostAdd className="text-lg" />
                <span className="mx-3 font-medium text-xs">AllPosts</span>
              </NavLink>

              {/* followers */}
              <NavLink
                to={`/admin/settings/followers`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <RiUserFollowLine className="text-lg" />
                <span className="mx-3 font-medium text-xs">Followers</span>
              </NavLink>
              {/* Pots blog*/}

              <NavLink
                to={`/admin/settings/postsBlog`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <TfiWrite className="text-md" />
                <span className="mx-3 font-medium text-xs">Posts Blogs</span>
              </NavLink>
              {/* All blog*/}

              <NavLink
                to={`/admin/settings/allpayments`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <MdOutlinePayments className="text-md" />
                <span className="mx-3 font-medium text-xs">All Payments</span>
              </NavLink>
              <NavLink
                to={`/admin/settings/allBlogs`}
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <TfiWrite className="text-md" />
                <span className="mx-3 font-medium text-xs">All Blogs</span>
              </NavLink>
              <NavLink
                onClick={handleToggle}
                className={({ isActive }) =>
                  `text-gray-800 dark:text-gray-100 flex items-center px-4 py-2 rounded-md hover:bg-pm-color hover:text-white ${
                    isActive ? "bg-pm-color text-white" : ""
                  }`
                }>
                <FaRegFlag className="text-md" />
                <span className="mx-3 font-medium text-xs">See Reports</span>
              </NavLink>
            </nav>
            <hr className="my-8" />
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
        <Link to="/" className="flex items-center ">
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
        } md:ml-64 p-5`}>
        <Outlet />
      </div>

      {/* Overlay for Small Screens */}
      {isActive && (
        <div className="fixed  z-20 lg:hidden" onClick={handleToggle}></div>
      )}
    </section>
  );
};

export default AdminSetting;
