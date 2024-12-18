import { useContext, useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import {
  MdLogin,
  MdOutlineDarkMode,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import Logo from "../Logo/Logo";
import User from "../../../assets/User_icon_2.svg.png";
import {
  IoAdd,
  IoArrowBackOutline,
  IoChatboxEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import Switcher1 from "../Switcher1/Switcher1";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import Sidebar from "../Sidebar/Sidebar";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import PostComponent from "../../Ruhul/Card-Ruhul/PostComponent";
import UseAdmin from "../../../Hooks/Admin/UseAdmin";
import NotificationBtn from "../../nifat/NotificationBtn";

const Navbar = ({ setClickPp, clickPp, focusInput, setFocusInput }) => {
  const axiosPublic = useAxiosPublic();
  const { logout, user, setIsModalOpen } = useContext(AuthContext);
  const [openSmallMenu, setOpenSmallMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  // const [clickPp, setClickPp] = useState(false);
  const [clickSearch, setClickSearch] = useState(false);
  // const [focusInput, setFocusInput] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const inputRef = useRef(null);
  const [isAdmin] = UseAdmin();
  useEffect(() => {
    focusInput && inputRef.current.focus();
  }, [focusInput]);

  const handleSearch = async (e) => {
    const { data } = await axiosPublic.get(
      `/posts/search/post?search=${e.target.value}`
    );
    setSearchData(data);
  };

//   const notification = <IoNotificationsOutline className="text-[22px] " />;
  const add = <IoAdd className="text-[22px]" />;

  return (
    <>
      <nav className="fixed w-full z-[100] text-black dark:text-white top-0 bg-white dark:bg-themeColor border-b border-black dark:border-gray-700 border-opacity-15">
        <div className="sm:px-6 px-3 py-2 flex h-[56px] justify-between items-center">
          <div className="flex items-center justify-start">
            <HiOutlineMenuAlt1
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className="text-2xl mr-3 xl:hidden"
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
              // value={searchValue}
              onChange={handleSearch}
              onClick={() => setFocusInput(true)}
              // onFocus={() => setFocusInput(true)} // Set focus state on input focus
              // onBlur={() => setFocusInput(false)} // Optional: reset focus state when input loses focus
              type="text"
              className={`text-sm w-full py-2 pl-10 pr-4 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-themeColor3 dark:hover:bg-[#333D42] dark:focus:bg-[#333D42] hover:bg-gray-300 focus:bg-gray-200 hover:bg-opacity-70 border-black ${
                searchData.length > 0 && focusInput ? "rounded-b-none" : ""
              } rounded-2xl outline-none`}
              placeholder="Search"
            />
            <div
              className={`${
                searchData.length > 0 && focusInput ? "block" : "hidden"
              } absolute w-full h-[85vh] bg-gray-200 dark:bg-[#333D42] rounded-b-2xl border-t dark:border-gray-700 border-gray-400 p-4 overflow-y-auto scrollBar pb-0`}>
              {searchData.map((item, index) => (
                <Link to={`/post-details/${item._id}`} key={index}>
                  <div className="flex justify-between items-center gap-5">
                    <div className="">
                      <h4 className="font-semibold text-sm mb-2">
                        {item.title}
                      </h4>
                      <PostComponent data={item}></PostComponent>
                      <p
                        className="text-[10px] mb-4 mt-2"
                        dangerouslySetInnerHTML={{
                          __html: item.body && item.body.slice(0, 150),
                        }}
                      />
                      <div className="flex justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full">
                          <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={item.profilePicture}
                            alt="User profile"
                          />
                        </div>
                        <h5 className="text-xs font-medium text-nowrap">
                          {item.username}
                        </h5>
                      </div>
                    </div>

                    {item.images.length > 0 && (
                      <div className="rounded-xl w-[200px] min-w-[200px] object-cover h-[150px]">
                        <img
                          className="rounded-xl w-[200px] object-cover h-[150px]"
                          src={item.images[0]}
                          alt="Post thumbnail"
                        />
                      </div>
                    )}
                  </div>
                  <hr className="my-3 border-gray-400 dark:border-gray-700" />
                </Link>
              ))}
            </div>
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
                {/* <button className="p-2 rounded-full  dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100  duration-200 lg:ml-0 ml-3">
                  {notification}
                </button> */}
                <NotificationBtn></NotificationBtn>
                <Link
                  to="/create-post/text-post"
                  className="flex items-center gap-1 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 sm:px-3 px-2 py-2 sm:rounded-2xl rounded-full duration-200 mr-3">
                  {add} <span className="sm:block text-sm hidden">Create</span>
                </Link>

                <button
                  onClick={() => setClickPp(!clickPp)}
                  // onFocus={() => setClickPp(true)}
                  // onBlur={() => setClickPp(false)}

                  className="relative">
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src={user?.photoURL || User}
                    alt="user"
                  />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 absolute right-0 ring-1 ring-white bg-green-400 bottom-0"></span>
                </button>

                <div>
                  <div
                    className={`${
                      clickPp ? "lg:block hidden" : "hidden"
                    } w-[250px] pt-5 shadow-2xl absolute top-14 right-1 rounded-lg bg-white dark:bg-themeColor2`}>
                    <Link
                      to={`/users/${user?.email}/profile`}
                      className="flex items-center gap-2 px-5 py-4 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 ">
                      <Link
                        to={`/users/${user?.email}/profile`}
                        className="relative">
                        <img
                          className="object-cover w-9 h-9 rounded-full"
                          src={user?.photoURL || User}
                          alt="user"
                        />
                        <span className="absolute bg-green-500 bottom-0 left-6 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white"></span>
                      </Link>
                      <div>
                        <h2 className="text-sm">{user?.displayName}</h2>
                        <h3 className="text-xs">{user?.email}</h3>
                      </div>
                    </Link>

                    <div className="flex justify-between lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                      <span className="flex items-center gap-3">
                        <MdOutlineDarkMode className="text-2xl" />
                        Dark Mode
                      </span>
                      <Switcher1></Switcher1>
                    </div>

                    <span
                      onClick={() => {
                        logout();
                      }}
                      className="flex justify-start lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                      <MdLogin className="text-2xl" />
                      Log Out
                    </span>

                    <hr className="mt-1 border-gray-200 dark:border-gray-700" />

                    {isAdmin && (
                      <Link
                        to={"/admin/settings/manage-users"}
                        className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                        <IoSettingsOutline className="text-2xl" />
                        Admin Setting
                      </Link>
                    )}
                    <Link
                      to={`/chat/${user?.email}`}
                      className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                      <IoChatboxEllipsesOutline className="text-2xl" />
                      chat
                    </Link>

                    <hr className="border-gray-200 dark:border-gray-700" />
                    <Link to={"/get-premium"}>
                      <span className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                        <MdOutlineWorkspacePremium className="text-2xl" />
                        Get Premium
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsModalOpen(true)}
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
                      onClick={() => {
                        setIsModalOpen(true);
                        setOpenSmallMenu(!openSmallMenu);
                      }}
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
        className={`fixed z-[100] bottom-0 left-0 lg:hidden ${
          openSmallMenu ? "translate-y-0" : "translate-y-[100%] hidden"
        } py-5 space-y-4 bg-white dark:bg-themeColor2 dark:hover:text-gray-50 dark:hover:bg-themeColor3 hover:bg-gray-100 w-full`}>
        <span
          onClick={() => {
            setIsModalOpen(true);
            setOpenSmallMenu(!openSmallMenu);
          }}
          className="flex justify-start lg:px-6 px-5 items-center gap-4 lg:text-base sm:text-sm text-xs">
          <MdLogin className="text-2xl" /> Sign In / Sign Up
        </span>
      </div>

      <div
        className={`fixed z-[100] bottom-0 left-0 lg:hidden ${
          clickPp ? "translate-y-0" : "translate-y-[100%] hidden"
        } bg-white dark:bg-themeColor2 text-black dark:text-white w-full`}>
        <Link
          to={`/users/${user?.email}/profile`}
          className="flex items-center gap-2 px-5 py-4 hover:bg-gray-100">
          <div className="relative">
            <img
              className="object-cover w-9 h-9 rounded-full"
              src={user?.photoURL || User}
              alt="user"
            />
            <span className="absolute bottom-0 left-6 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white bg-green-400"></span>
          </div>
          <div>
            <h2 className="text-sm">{user?.displayName}</h2>
            <h3 className="text-xs">{user?.email}</h3>
          </div>
        </Link>

        <div className="flex justify-between lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <span className="flex items-center gap-3">
            <MdOutlineDarkMode className="text-2xl" />
            Dark Mode
          </span>
          <Switcher1></Switcher1>
        </div>

        <span
          onClick={() => {
            logout();
            setClickPp(false);
          }}
          className="flex justify-start lg:px-6 px-5 py-3 dark:hover:text-gray-50 dark:hover:bg-gray-700 dark:hover:bg-opacity-30 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <MdLogin className="text-2xl" />
          Log Out
        </span>

        <hr className="mt-1 border-gray-200 dark:border-gray-700" />

        {isAdmin && (
          <Link
          to={"/admin/settings/manage-users"}
          className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <IoSettingsOutline className="text-2xl" />
          Admin Setting
        </Link>
        )}
        <Link
          to={`/chat/${user?.email}`}
          className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <IoChatboxEllipsesOutline className="text-2xl" />
          chat
        </Link>

        <hr className="mt-1 border-gray-200 dark:border-gray-700" />

        <Link to={"/get-premium"}>
                      <span className="flex justify-start lg:px-6 px-5 py-4 my-1 dark:hover:text-gray-50 dark:hover:bg-opacity-30 dark:hover:bg-gray-700 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                        <MdOutlineWorkspacePremium className="text-2xl" />
                        Get Premium
                      </span>
                    </Link>
      </div>

      <div
        className={`${
          clickSearch ? "fixed w-full top-0 py-2 lg:hidden z-[101]" : "hidden"
        } bg-white dark:bg-themeColor`}>
        <div className="flex justify-start items-center gap-3">
          {/* Back Arrow Icon */}
          <IoArrowBackOutline
            onClick={() => {
              setClickSearch(false); // Hide search bar
              setFocusInput(false); // Remove focus from input when back arrow is clicked
            }}
            className="text-2xl text-gray-500 ml-4"
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
              onChange={handleSearch}
              onClick={() => setFocusInput(true)}
              type="text"
              className="py-2 pl-10 pr-4 bg-transparent outline-none w-full"
              placeholder="Search"
            />
            <div
              className={`${
                searchData.length > 0 && focusInput ? "block" : "hidden"
              } absolute w-screen h-[calc(100vh-56px)] dark:bg-themeColor2 p-4 top-[49px] right-0 overflow-y-auto scrollBar pb-0`}>
              {searchData.map((item, index) => (
                <Link to={`/post-details/${item._id}`} key={index}>
                  <div className="flex justify-between items-center gap-5">
                    <div className="">
                      <h4 className="font-semibold text-sm mb-2">
                        {item.title}
                      </h4>
                      <PostComponent data={item}></PostComponent>
                      <p
                        className="text-[10px] mb-4 mt-2"
                        dangerouslySetInnerHTML={{
                          __html: item.body && item.body.slice(0, 150),
                        }}
                      />
                      <div className="flex justify-start items-center gap-2">
                        <div className="w-8 h-8 rounded-full">
                          <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={item.profilePicture}
                            alt="User profile"
                          />
                        </div>
                        <h5 className="text-xs font-medium">{item.username}</h5>
                      </div>
                    </div>

                    {item.images.length > 0 && (
                      <div className="rounded-xl min-w-[100px] w-[100px] h-[75px] sm:w-[200px] sm:min-w-[200px] object-cover  sm:h-[150px]">
                        <img
                          className="rounded-xl min-w-[100px] w-[100px] h-[75px] sm:w-[200px] object-cover sm:h-[150px]"
                          src={item.images[0]}
                          alt="Post thumbnail"
                        />
                      </div>
                    )}
                  </div>
                  <hr className="my-3 border-gray-400 dark:border-gray-700" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu}></Sidebar>
    </>
  );
};

export default Navbar;