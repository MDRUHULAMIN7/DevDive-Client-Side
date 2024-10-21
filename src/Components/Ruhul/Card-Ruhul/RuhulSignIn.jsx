import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub, FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import UseAuth from "../../../Hooks/UseAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { uploadImage } from "../../../Hooks/imageUpload";

const RuhulSignIn = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateuserprofile, signInUser, googleSigin, isModalOpen, setIsModalOpen, gitHubLogin } = UseAuth();

  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSignUpMode = () => setIsSignUpMode(!isSignUpMode);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await googleSigin();
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
        role: "member",
        userType: "normal",
      };
      await axiosPublic.post("/users", userInfo);
      toast.success("Google Sign In successful.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Google Sign In failed.",error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await gitHubLogin();
      const userInfo = {
        name: result.user?.displayName || "GitHub User",
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
        role: "member",
        userType: "normal",
      };
      await axiosPublic.post("/users", userInfo);
      toast.success("GitHub Sign In successful.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("GitHub Sign In failed.",error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = e.target;

    try {
      await signInUser(email.value, password.value);
      toast.success("Sign In successful.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Sign In failed. Please check your credentials.",error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, photo, email, password } = e.target;

    if (password.value.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const photoUrl = photo.files[0] ? await uploadImage(photo.files[0]) : "";
      const newUser = {
        name: name.value,
        email: email.value,
        password: password.value,
        photoUrl,
        role: "member",
        userType: "normal",
      };

      await createUser(email.value, password.value);
      await axiosPublic.post("/users", newUser);
      await updateuserprofile(name.value, photoUrl);
      toast.success("Registration successful.");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Registration failed.",error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "modal-overlay") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [setIsModalOpen]);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-300 to-purple-400 dark:bg-gradient-to-tl dark:from-gray-800 dark:to-gray-900`}>
    {/* Header and Dark Mode Toggle */}
    <div className="absolute top-4 right-4 flex items-center gap-4">
      <h2 className="text-2xl font-extrabold text-white dark:text-gray-100">{isSignUpMode ? "Sign Up" : "Sign In"}</h2>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform transform hover:scale-105"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  
    {isModalOpen && (
      <div
        id="modal-overlay"
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-6 md:p-8"
      >
        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-2xl relative w-full max-w-lg transition-transform transform duration-500 scale-100">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute md:hidden top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <ImCross />
          </button>
  
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-200">
            {isSignUpMode ? "Create Your Account" : "Welcome Back!"}
          </h2>
  
          {isLoading ? (
            <div className="flex justify-center my-4">
              <RotatingLines width="50" strokeColor={darkMode ? "#fff" : "#007bff"} />
            </div>
          ) : (
            <>
              {/* Social Sign-In Buttons */}
              {!isSignUpMode && (
                <div className="flex items-center justify-center gap-4 mb-6">
                  {/* Google Sign-In */}
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 border dark:border-gray-600 rounded-lg py-2 flex items-center justify-center transition-transform transform hover:scale-105 shadow-md"
                  >
                    <FcGoogle className="text-2xl mr-2" /> Google
                  </button>
                  {/* GitHub Sign-In */}
                  <button
                    onClick={handleGitHubSignIn}
                    className="w-full bg-gray-800 text-white py-2 flex items-center justify-center rounded-lg transition-transform transform hover:scale-105 shadow-md"
                  >
                    <FaGithub className="text-2xl mr-2 text-white" /> Continue with GitHub
                  </button>
                </div>
              )}
  
              <div className="flex items-center justify-center my-4">
                <hr className="w-full border-t border-gray-300" />
                <span className="text-gray-500 mx-4">OR</span>
                <hr className="w-full border-t border-gray-300" />
              </div>
  
              {/* Form */}
              <form
                onSubmit={isSignUpMode ? handleRegister : handleSignIn}
                className="space-y-6"
              >
                {isSignUpMode && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition-transform transform hover:scale-105"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
  
                    <div className="flex flex-col">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Upload Photo
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          id="file-upload"
                          className="hidden"
                          onChange={(e) => {
                            const fileName = e.target.files[0]?.name;
                            const fileInputLabel = document.getElementById("file-input-label");
                            fileInputLabel.textContent = fileName || "Choose a photo";
                          }}
                        />
                        <label
                          htmlFor="file-upload"
                          id="file-input-label"
                          className="block w-full cursor-pointer bg-indigo-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-xl py-3 text-center flex items-center justify-center transition-transform transform hover:scale-105 shadow-inner"
                        >
                          <FaUpload className="mr-2" /> Choose a photo
                        </label>
                      </div>
                    </div>
                  </>
                )}
  
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition-transform transform hover:scale-105"
                    placeholder="Enter your email"
                    required
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition-transform transform hover:scale-105"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
  
                <button
                  type="submit"
                  className="bg-indigo-500 text-white font-semibold rounded-xl py-2 w-full transition-transform transform hover:scale-105 hover:bg-indigo-600 shadow-lg"
                >
                  {isSignUpMode ? "Register" : "Sign In"}
                </button>
              </form>
  
              <div className="mt-4 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  {isSignUpMode ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    className="text-indigo-500 hover:underline transition"
                    onClick={toggleSignUpMode}
                  >
                    {isSignUpMode ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )}
  </div>
  
  );
};

export default RuhulSignIn;
