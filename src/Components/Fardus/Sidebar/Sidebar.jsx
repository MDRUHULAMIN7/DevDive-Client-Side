import { FaArrowTrendUp } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { MdBarChart } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { FcAbout } from "react-icons/fc";
import { NavLink } from "react-router-dom";

const Sidebar = ({ setOpenMenu, openMenu }) => {
  return (
    <aside
      className={`z-[100] scrollBar fixed flex flex-col w-64 xl:translate-x-0 ${
        openMenu
          ? "translate-x-0 duration-200 ease-in-out"
          : "translate-x-[-256px] duration-200 ease-in-out"
      } h-[calc(100vh-56px)] px-4 py-8 overflow-y-auto bg-white dark:bg-themeColor border-r dark:border-gray-700 rtl:border-r-0 rtl:border-l mt-[57px]`}>
      <div className="flex flex-col justify-between ">
        <nav className="space-y-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <IoMdHome className="text-lg" />
            <span className="mx-3 font-medium text-xs">Home</span>
          </NavLink>

          <NavLink
            to="/popular"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <FaArrowTrendUp className="text-lg" />
            <span className="mx-4 font-medium text-xs">Popular</span>
          </NavLink>

          <NavLink
            to="/following"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 duration-200 hover:bg-pm-color hover:text-white rounded-md ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <RiUserFollowFill className="text-lg" />
            <span className="mx-4 font-medium text-xs">Following</span>
          </NavLink>

          {/* <NavLink
            to="/all"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 duration-200 hover:bg-pm-color hover:text-white rounded-md ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <MdBarChart className="text-lg" />
            <span className="mx-4 font-medium text-xs">All</span>
          </NavLink> */}

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <NavLink
            to="/blogCard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <TfiWrite className="" />
            <span className="mx-3 font-medium text-xs">Blogs</span>
          </NavLink>
          <NavLink
            to="/leaderBoard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <MdBarChart className="" />
            <span className="mx-3 font-medium text-xs">Leaderboard</span>
          </NavLink>
          <NavLink
            to="/archiveDetails"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <MdBarChart className="" />
            <span className="mx-3 font-medium text-xs">Archive</span>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white ${
                isActive ? "bg-pm-color text-white" : ""
              }`
            }>
            <FcAbout className="text-lg" />
            <span className="mx-3 font-medium text-xs">About</span>
          </NavLink>
          <hr className="my-6 border-gray-200 dark:border-gray-700" />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
