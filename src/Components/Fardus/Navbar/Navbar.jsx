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
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "../../../Hooks/imageUpload";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [openSmallMenu, setOpenSmallMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [clickPp, setClickPp] = useState(false);
  const [clickSearch, setClickSearch] = useState(false);
  const [user, setUser] = useState(true);
  const inputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "modal-overlay") {
        closeModal();
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const { createUser, updateuserprofile } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.files[0];
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    try {
      const photoUrl = photo ? await uploadImage(photo) : "";
      const newUser = {
        name,
        photoUrl,
        email,
        password,
        role: "member",
      };

      console.log(newUser);

      const result = await createUser(email, password);
      const userLastLoginTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        lastLoginAt: result.user?.metadata?.lastLoginAt,
      };

      const response = await fetch(`${import.meta.env.VITE_SERVER}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to database");
      }

      await updateuserprofile(name, photoUrl);
      await useAxiosPublic.put(
        `/users/${result.user?.email}`,
        userLastLoginTime
      );

      toast.success("Registration successful. Redirecting to home page...", {
        autoClose: 1500,
      });

      setTimeout(() => {
        Navigate(location?.state ? location.state : "/");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const removeFocus = () => {
    inputRef.current.blur();
  };

  const notification = <IoNotificationsOutline className="text-[22px]" />;
  const add = <IoAdd className="text-[22px]" />;

  return (
    <>
      <nav className="fixed w-full top-0 bg-white border-b border-black border-opacity-15">
        <div className="sm:px-6 px-3 py-3 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <HiOutlineMenuAlt1
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className="text-2xl mr-3 lg:hidden"
            />
            <Logo></Logo>
          </div>

          <div className="relative w-[580px] lg:block hidden">
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
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-200 border-black border border-transparent rounded-2xl outline-none hover:border-pm-color focus:border-pm-color"
              placeholder="Search"
            />
          </div>
          <div className="flex justify-between items-center">
            <svg
              onClick={() => {
                setClickSearch(true);
                handleFocus(); // Focus on input when search icon is clicked
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
            {!user ? (
              <div className="flex justify-between items-center mb-1">
                <button className="p-2 rounded-full  hover:bg-gray-200 duration-200 ml-3">
                  {notification}
                </button>

                <button className="flex  items-center gap-1 hover:bg-gray-200 sm:px-3 px-2 py-2 sm:rounded-2xl rounded-full duration-200 mr-3">
                  {add} <span className="sm:block hidden">Create</span>
                </button>

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
                  } w-[250px] pt-5 shadow-2xl absolute top-14 right-0 rounded-lg bg-white`}>
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

                  <div className="flex justify-between lg:px-6 px-5 py-3 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <span className="flex items-center gap-3">
                      <MdOutlineDarkMode className="text-2xl" />
                      Dark Mode
                    </span>
                    <Switcher1></Switcher1>
                  </div>

                  <span className="flex justify-start lg:px-6 px-5 py-3 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <MdLogin className="text-2xl" />
                    Log Out
                  </span>

                  <hr />

                  <span className="flex justify-start lg:px-6 px-5 py-4 my-1 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <IoSettingsOutline className="text-2xl" />
                    Setting
                  </span>

                  <hr />

                  <span className="flex justify-start lg:px-6 px-5 py-4 my-1 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
                    <MdOutlineWorkspacePremium className="text-2xl" />
                    Premium
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <button
                  className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2 mr-2 sm:text-base text-sm lg:block hidden"
                  onClick={openModal}>
                  Sign In
                </button>

                {isModalOpen && (
                  <div
                    id="modal-overlay"
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-10
                    ">
                    <div className="bg-white p-10 rounded-2xl relative">
                      <h2 className="text-3xl font-semibold mb-4">Sign In</h2>

                      <p className="text-wrap max-w-md">
                        By continuing, you agree to our{" "}
                        <a
                          href="/userAgreement"
                          className="text-blue-500 font-semibold">
                          User Agreement
                        </a>{" "}
                        and acknowledge that you understand the{" "}
                        <a
                          href="/userAgreement"
                          className="text-blue-500 font-semibold">
                          Privacy Policy
                        </a>
                        .
                      </p>

                      {!isSignUpMode && (
                        <>
                          <div className="my-4 gap-2 flex flex-col">
                            <button className="border-2 p-2 rounded-full flex items-center">
                              <FcGoogle className="size-6" />
                              <span className="flex flex-grow  justify-center">
                                Continue With Google
                              </span>
                            </button>
                            <button className="border-2 p-2 rounded-full flex items-center">
                              <FaGithub className="size-6" />
                              <span className="flex flex-grow  justify-center">
                                Continue With GitHub
                              </span>
                            </button>
                          </div>

                          <div className="flex items-center">
                            <hr className="flex-grow" />
                            <span className="mx-5">OR</span>{" "}
                            <hr className="flex-grow" />
                          </div>

                          <form>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <input
                                type="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your email"
                              />
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700">
                                Password
                              </label>
                              <input
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Enter your password"
                              />
                            </div>
                            <p className="text-blue-500">Forgot Password?</p>
                            <p className="my-2">
                              New to DevDive?{" "}
                              <button
                                className="text-blue-500"
                                onClick={toggleSignUpMode}>
                                Sign Up
                              </button>
                            </p>

                            <button
                              type="submit"
                              className="bg-pm-color hover:bg-sec-color text-white px-4 py-2 rounded-xl w-full mt-4 text-lg">
                              Sign In
                            </button>
                          </form>
                        </>
                      )}

                      {isSignUpMode && (
                        <>
                          <div className="animate-fade-in mt-4">
                            <form onSubmit={handleRegister}>
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                  placeholder="Enter your name"
                                  required
                                />
                              </div>

                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                  Upload Your Photo
                                </label>
                                <input
                                  type="file"
                                  name="photo"
                                  className="mt-1 block w-full"
                                  accept="image/*"
                                  required
                                />
                              </div>

                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                  Email
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                  placeholder="Enter your email"
                                  required
                                />
                              </div>

                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                  Password
                                </label>
                                <div className="relative">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your password"
                                    required
                                  />
                                  <button
                                    className="absolute right-2 top-4 ml-2 text-pm-color hover:text-sec-color"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShowPassword(!showPassword);
                                    }}>
                                    {!showPassword ? <FaEye /> : <FaEyeSlash />}
                                  </button>
                                </div>
                              </div>

                              <p className="my-2">
                                Already Have An Account?{" "}
                                <button
                                  className="text-blue-500"
                                  onClick={toggleSignUpMode}>
                                  Sign In
                                </button>
                              </p>

                              <button
                                type="submit"
                                className="bg-pm-color hover:bg-sec-color text-white px-4 py-2 rounded-xl w-full mt-4 text-lg">
                                Sign Up
                              </button>
                            </form>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <div className="relative">
                  <button
                    onClick={() => setOpenSmallMenu(!openSmallMenu)}
                    title="Open Menu"
                    className="text-xl rounded-full p-3 hover:bg-gray-200 duration-200">
                    <CiMenuKebab />
                  </button>

                  <div
                    className={`${
                      openSmallMenu ? "lg:block hidden" : "hidden"
                    } w-[250px] lg:py-8 py-5 shadow-2xl absolute top-14 right-0 rounded-lg bg-white`}>
                    <span className="flex justify-start lg:px-6 px-5 items-center gap-4 sm:text-sm text-xs">
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
        } py-5 space-y-4 bg-white w-full`}>
        <span className="flex justify-start lg:px-6 px-5 items-center gap-4 lg:text-base sm:text-sm text-xs">
          <MdLogin className="text-2xl" /> Sign In / Sign Up
        </span>
      </div>

      <div
        className={`fixed z-50 bottom-0 left-0 lg:hidden ${
          clickPp ? "translate-y-0" : "translate-y-[100%] hidden"
        } bg-white w-full`}>
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

        <div className="flex justify-between lg:px-6 px-5 py-3 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <span className="flex items-center gap-3">
            <MdOutlineDarkMode className="text-2xl" />
            Dark Mode
          </span>
          <Switcher1></Switcher1>
        </div>

        <span className="flex justify-start lg:px-6 px-5 py-3 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <MdLogin className="text-2xl" />
          Log Out
        </span>

        <hr />

        <span className="flex justify-start lg:px-6 px-5 py-4 my-1 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <IoSettingsOutline className="text-2xl" />
          Setting
        </span>

        <hr />

        <span className="flex justify-start lg:px-6 px-5 py-4 my-1 hover:bg-gray-100 items-center gap-4 sm:text-sm text-xs">
          <MdOutlineWorkspacePremium className="text-2xl" />
          Premium
        </span>
      </div>

      <div
        className={`${
          clickSearch
            ? "fixed w-full top-0 sm:px-6 px-4  sm:py-3 py-2 lg:hidden"
            : "hidden"
        } bg-white`}>
        <div className="flex justify-start items-center gap-3 sm:pt-0 pt-2">
          {/* Back Arrow Icon */}
          <IoArrowBackOutline
            onClick={() => {
              setClickSearch(false); // Hide search bar
              removeFocus(); // Remove focus from input when back arrow is clicked
            }}
            className="text-2xl text-gray-500"
          />

          <div className="relative">
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
              className="w-full py-2 pl-10 pr-4 text-gray-700 border-black border border-transparent rounded-2xl outline-none"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu}></Sidebar>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Navbar;
