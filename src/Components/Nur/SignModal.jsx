import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { uploadImage } from "../../Hooks/imageUpload";
import { ImCross } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";

const SignModal = () => {
  const axiosPublic = useAxiosPublic();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isResetPasswordMode, setIsResetPasswordMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    createUser,
    updateuserprofile,
    signInUser,
    googleSigin,
    isModalOpen,
    setIsModalOpen,
    gitHubLogin,
    passwordResetEmail,
  } = useContext(AuthContext);

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const handleResetPassword = () => {
    console.log("reset password hit ");
    setIsResetPasswordMode(!isResetPasswordMode);
  };

  const handleGoogleSignIn = () => {
    googleSigin().then(async (result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
        role: "member",
        userType: "normal",
      };
      await axiosPublic.post("/users", userInfo).then(() => {});

      const userLastLoinTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        lastLoginAt: result.user?.metadata?.lastLoginAt,
      };

      await axiosPublic
        .put(`/users/${result.user?.email}`, userLastLoinTime)
        .then(() => {
          toast.success("Google Sign In successful.");
          setIsModalOpen(false);
        });
    });
  };

  const HandleGitHub = () => {
    gitHubLogin().then(() => {
      toast.success("Continue With GitHub successful.");
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    signInUser(email, password)
      .then(() => {
        toast.success("Sign In successful.");
        setIsModalOpen(false);
      })
      .catch(() => {
        toast.error("Sign In failed. Please check your Email and Password.");
      });
  };

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
        userType: "normal",
      };

      console.log(newUser);

      const result = await createUser(email, password);
      const userLastLoginTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        lastLoginAt: result.user?.metadata?.lastLoginAt,
      };

      const response = await fetch(`${import.meta.env.VITE_URL}users`, {
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
      await axiosPublic.put(`/users/${result.user?.email}`, userLastLoginTime);

      toast.success("Registration successful.");

      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResetPasswordFunction = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
    passwordResetEmail(email)
      .then(() => {
        toast.success("Reset Password Email sent successfully.");
        setIsResetPasswordMode(false);
      })
      .catch((error) => {
        toast.error("Failed to send password reset email : " + error.message);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "modal-overlay") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full items-center justify-center flex">
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center p-2 md:p-10 backdrop-blur-sm ">
          <div className="bg-white  p-4 md:p-10 rounded-2xl dark:bg-themeColor3 dark:border-white  relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-red-600 cursor-pointer md:hidden">
              <ImCross></ImCross>
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-16 cursor-pointer  md:hidden bg-slate-200 rounded-full flex items-center justify-center">
              <IoMdArrowBack className="flex items-center justify-center size-5"></IoMdArrowBack>
            </button>
            <h2 className="text-3xl font-semibold mb-4 dark:text-white">
              {!isSignUpMode && !isResetPasswordMode && <div> Sign In</div>}
              {isSignUpMode && !isResetPasswordMode && <div> Sign Up</div>}
              {isModalOpen && isResetPasswordMode && (
                <div>
                  <button
                    onClick={() => setIsResetPasswordMode(!isResetPasswordMode)}
                    className="absolute top-2 left-2 cursor-pointer size-10 hover:bg-slate-200 flex items-center justify-center hover:rounded-full">
                    <IoMdArrowBack className="flex items-center justify-center"></IoMdArrowBack>
                  </button>
                  Reset Your Password
                </div>
              )}
            </h2>
            {!isResetPasswordMode ? (
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
            ) : (
              <div className="text-wrap max-w-md">
                Enter your email address and we’ll send you a link to reset your
                password
              </div>
            )}
            {!isSignUpMode && !isResetPasswordMode && (
              <>
                <div className="my-4 gap-2 flex flex-col">
                  <button
                    onClick={handleGoogleSignIn}
                    className="border-2 p-2 rounded-full flex items-center">
                    <FcGoogle className="size-6" />
                    <span className="flex flex-grow  justify-center">
                      Continue With Google
                    </span>
                  </button>
                  <button
                    onClick={HandleGitHub}
                    className="border-2 p-2 rounded-full flex items-center">
                    <FaGithub className="size-6" />
                    <span className="flex flex-grow  justify-center ">
                      Continue With GitHub
                    </span>
                  </button>
                </div>

                <div className="flex items-center">
                  <hr className="flex-grow" />
                  <span className="mx-5">OR</span> <hr className="flex-grow" />
                </div>

                <form onSubmit={handleSignIn}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-themeColor3 dark:text-white dark:placeholder:text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-themeColor3 dark:text-white dark:placeholder:text-white"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        className="absolute right-3 top-3 ml-2 text-pm-color hover:text-sec-color"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}>
                        {!showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>
                  <p className="text-blue-500">
                    <span
                      className="cursor-pointer"
                      onClick={handleResetPassword}>
                      Forgot Password?
                    </span>
                  </p>
                  <p className="my-2">
                    New to DevDive?{" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={toggleSignUpMode}>
                      Sign Up
                    </span>
                  </p>

                  <button
                    type="submit"
                    className="bg-pm-color hover:bg-sec-color text-white px-4 py-2 rounded-xl w-full mt-4 text-lg">
                    Sign In
                  </button>
                </form>
              </>
            )}
            {isSignUpMode && !isResetPasswordMode && (
              <>
                <div className="animate-fade-in mt-4">
                  <form onSubmit={handleRegister}>
                    <div className="mb-4 pt-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-themeColor3 dark:text-white dark:placeholder:text-white"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="mb-4 pt-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
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

                    <div className="mb-4 pt-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-themeColor3 dark:text-white dark:placeholder:text-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="mb-4 pt-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-themeColor3 dark:text-white dark:placeholder:text-white"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          className="absolute right-3 top-3 ml-2 text-pm-color hover:text-sec-color"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                          }}>
                          {!showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>
                    </div>

                    <p className="my-2">
                      Have An Account?{" "}
                      <span
                        className="text-blue-500"
                        onClick={toggleSignUpMode}>
                        Sign In
                      </span>
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
            {isModalOpen && isResetPasswordMode && (
              <form
                onSubmit={handleResetPasswordFunction}
                className="pt-4 h-[440px] flex flex-col justify-between">
                <div className="mb-4 flex-shrink-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-themeColor3 dark:text-white dark:placeholder:text-white"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="mt-6">
                    <span className="text-blue-500 cursor-pointer h-full flex">
                      Need Help?
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-pm-color hover:bg-sec-color text-white px-4 py-2 rounded-xl w-full mt-4 text-lg">
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignModal;
