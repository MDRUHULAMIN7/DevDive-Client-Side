import { useContext, useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import {
  MdLogin,
  MdOutlineDarkMode,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import Logo from "../Logo/Logo";
import {
  IoAdd,
  IoArrowBackOutline,
  IoNotificationsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import Switcher1 from "../Switcher1/Switcher1";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Sidebar from "../Sidebar/Sidebar";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, user, setIsModalOpen } = useContext(AuthContext);
  const [openSmallMenu, setOpenSmallMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [clickPp, setClickPp] = useState(false);
  const [clickSearch, setClickSearch] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    focusInput && inputRef.current.focus();
  }, [focusInput]);

  const notification = <IoNotificationsOutline className="text-[22px] " />;
  const add = <IoAdd className="text-[22px]" />;

  return (
    <>
      <nav className="fixed w-full text-black dark:text-white top-0 bg-white dark:bg-themeColor border-b border-black dark:border-gray-700 border-opacity-15">
        <div className="sm:px-6 px-3 py-2 flex h-[56px] justify-between items-center">
          <div className="flex items-center justify-between lg:w-[189px]">
            <HiOutlineMenuAlt1
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className="text-2xl mr-3 lg:hidden"
            />
            <Logo></Logo>
          </div>

          <div className="relative w-[550px] lg:block hidden">
            <span className="absolute inset-y-0 left-0 flex justify-between items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>
            </span>

            <input
              type="text"
              className="text-sm w-full py-2 pl-10 pr-4 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-themeColor3 dark:hover:bg-[#333D42] hover:bg-gray-300 hover:bg-opacity-70 border-black rounded-2xl outline-none"
              placeholder="Search"
            />
          </div>
          <div className="flex justify-between items-center">
            <svg
              onClick={() => {
                setClickSearch(true);
                setFocusInput(!focusInput); // Focus on input when search icon is clicked
              }}
              className="w-5 h-5 lg:hidden"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {user ? (
              <div className="flex justify-between items-center">
                <button className="p-2 rounded-full  dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100  duration-200 lg:ml-0 ml-3">
                  {notification}
                </button>

                <Link to="/create-post" className="flex items-center gap-1 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 sm:px-3 px-2 py-2 sm:rounded-2xl rounded-full duration-200 mr-3">
                  {add} <span className="sm:block text-sm hidden">Create</span>
                </Link>

                <button
                  onClick={() => setClickPp(!clickPp)}
                  className="relative">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                    alt=""
                  />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white bottom-0"></span>
                </button>

                <div
                  className={`${
                    clickPp ? "lg:block hidden" : "hidden"
                  } w-[250px] pt-5 shadow-2xl absolute top-14 right-1 rounded-lg bg-white dark:bg-themeColor2`}>
                  <div className="flex items-center gap-2 px-5 py-4 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 ">
                    <div className="relative">
                      <img
                        className="object-cover w-9 h-9 rounded-full"
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                        alt=""
                      />
                      <span className="absolute bottom-0 left-6 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
                    </div>
                    <div>
                      <h2 className="text-sm">Fardus Hassan</h2>
                      <h3 className="text-xs">webdev.fardus@gmail.com</h3>
                    </div>
                  </div>

                  <div className="flex justify-between lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <span className="flex items-center gap-3">
                      <MdOutlineDarkMode className="text-2xl" />
                      Dark Mode
                    </span>
                    <Switcher1></Switcher1>
                  </div>

                  <span
                    onClick={logout}
                    className="flex justify-start lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <MdLogin className="text-2xl" />
                    Log Out
                  </span>

                  <hr className="mt-1 border-gray-200 dark:border-gray-700" />
                  <span className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <IoSettingsOutline className="text-2xl" />
                    Setting
                  </span>

                  <hr className="border-gray-200 dark:border-gray-700" />

                  <span className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <MdOutlineWorkspacePremium className="text-2xl" />
                    Premium
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <button
                  onClick={setIsModalOpen}
                  className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2 text-sm lg:block hidden">
                  Sign In
                </button>
                <div className="relative">
                  <button
                    onClick={() => setOpenSmallMenu(!openSmallMenu)}
                    title="Open Menu"
                    className="text-lg rounded-full p-2 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 duration-200 ml-2 rotate-90">
                    <CiMenuKebab />
                  </button>

                  <div
                    className={`${
                      openSmallMenu ? "lg:block hidden" : "hidden"
                    } w-[250px] lg:py-8 py-5 shadow-2xl absolute top-12 right-[-22px] rounded-lg dark:hover:text-gray-50 dark:hover:bg-themeColor3 hover:bg-gray-100 bg-white dark:bg-themeColor2`}>
                    <span
                      onClick={setIsModalOpen}
                      className="flex justify-start lg:px-6 px-5 items-center gap-4 sm:text-sm text-xs">
                      <MdLogin className="text-2xl" /> Sign In / Sign Up
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <span
        onClick={() => setOpenSmallMenu(!openSmallMenu)}
        className={`${
          openSmallMenu ? "" : "hidden"
        } w-full h-screen lg:hidden bg-black bg-opacity-20 lg:py-8 py-5 shadow-2xl fixed top-0 right-0 rounded-lg z-10`}></span>

      <span
        onClick={() => setClickPp(!clickPp)}
        className={`${
          clickPp ? "" : "hidden"
        } w-full h-screen lg:hidden bg-black bg-opacity-20 lg:py-8 py-5 shadow-2xl fixed top-0 right-0 rounded-lg z-10`}></span>

      <div
        className={`fixed z-50 bottom-0 left-0 lg:hidden ${
          openSmallMenu ? "translate-y-0" : "translate-y-[100%] hidden"
        } py-5 space-y-4 bg-white dark:bg-themeColor2 dark:hover:text-gray-50 dark:hover:bg-themeColor3 hover:bg-gray-100 w-full`}>
        <span
          onClick={setIsModalOpen}
          className="flex justify-start lg:px-6 px-5 items-center gap-4 lg:text-base sm:text-sm text-xs">
          <MdLogin className="text-2xl" /> Sign In / Sign Up
        </span>
      </div>

      <div
        className={`fixed z-50 bottom-0 left-0 lg:hidden ${
          clickPp ? "translate-y-0" : "translate-y-[100%] hidden"
        } bg-white dark:bg-themeColor2 text-black dark:text-white w-full`}>
        <div className="flex items-center gap-2 px-5 py-4 hover:bg-gray-100">
          <div className="relative">
            <img
              className="object-cover w-9 h-9 rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
              alt=""
            />
            <span className="absolute bottom-0 left-6 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
          </div>
          <div>
            <h2 className="text-sm">Fardus Hassan</h2>
            <h3 className="text-xs">webdev.fardus@gmail.com</h3>
          </div>
        </div>

        <div className="flex justify-between lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <span className="flex items-center gap-3">
            <MdOutlineDarkMode className="text-2xl" />
            Dark Mode
          </span>
          <Switcher1></Switcher1>
        </div>

        <span
          onClick={logout}
          className="flex justify-start lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <MdLogin className="text-2xl" />
          Log Out
        </span>

        <hr className="mt-1 border-gray-200 dark:border-gray-700" />

        <span className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <IoSettingsOutline className="text-2xl" />
          Setting
        </span>

        <hr className="mt-1 border-gray-200 dark:border-gray-700" />

        <span className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <MdOutlineWorkspacePremium className="text-2xl" />
          Premium
        </span>
      </div>

      <div
        className={`${
          clickSearch
            ? "fixed w-full top-0 sm:px-6 px-4 py-2 lg:hidden"
            : "hidden"
        } bg-white dark:bg-themeColor`}>
        <div className="flex justify-start items-center gap-3">
          {/* Back Arrow Icon */}
          <IoArrowBackOutline
            onClick={() => {
              setClickSearch(false); // Hide search bar
              setFocusInput(!focusInput); // Remove focus from input when back arrow is clicked
            }}
            className="text-2xl text-gray-500"
          />

          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex justify-between items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            {/* Input Element */}
            <input
              ref={inputRef}
              type="text"
              className="py-2 pl-10 pr-4 bg-transparent outline-none w-full"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu}></Sidebar>
    </>
  );
};

export default Navbar;
