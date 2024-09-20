import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import { toast} from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { uploadImage } from "../../Hooks/imageUpload";

const SignModal = () => {
  const axiosPublic = useAxiosPublic();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    createUser,
    updateuserprofile,
    logout,
    signInUser,
    setUser,
    user,
    googleSigin,
    isModalOpen,
    setIsModalOpen,
  } = useContext(AuthContext);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSignUpMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const signOut = () => {
    logout()
      .then(() => {
        setUser(null);
      })
      .catch(() => {});
  };

  const handleGoogleSignIn = () => {
    googleSigin().then(async (result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photoUrl: result.user?.photoURL,
        role: "member",
      };
      await axiosPublic.post("/users", userInfo).then(() => {});

      const userLastLoinTime = {
        lastSignInTime: result.user?.metadata?.lastSignInTime,
        lastLoginAt: result.user?.metadata?.lastLoginAt,
      };

      await axiosPublic
        .put(`/users/${result.user?.email}`, userLastLoinTime)
        .then(() => {
          toast.success("Login successful. Please Wait for Redirect");
          closeModal();
        });
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
        closeModal();
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
        userType: "normal"
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

      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
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

  return (
    <div className="w-full items-center justify-center  flex h-[90vh]">
      {user ? (
        <button
          className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2 sm:text-base text-sm "
          onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button
          className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2 sm:text-base text-sm "
          onClick={openModal}>
          Sign In
        </button>
      )}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-10
                    ">
          <div className="bg-white p-10 rounded-2xl relative">
            <h2 className="text-3xl font-semibold mb-4">
              {isSignUpMode ? "Sign Up" : "Sign In"}
            </h2>

            <p className="text-wrap max-w-md">
              By continuing, you agree to our{" "}
              <a href="/userAgreement" className="text-blue-500 font-semibold">
                User Agreement
              </a>{" "}
              and acknowledge that you understand the{" "}
              <a href="/userAgreement" className="text-blue-500 font-semibold">
                Privacy Policy
              </a>
              .
            </p>

            {!isSignUpMode && (
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
                  <button className="border-2 p-2 rounded-full flex items-center cursor-not-allowed">
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
                    <input
                      type="password"
                      name="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter your password"
                      required
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
      )}{" "}
      {/* <ToastContainer></ToastContainer> */}
    </div>
  );
};

export default SignModal;
