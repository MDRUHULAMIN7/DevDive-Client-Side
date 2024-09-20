import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const SignModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    createUser,
    updateuserprofile,
    logout,
    signInUser,
    setUser,
    user,
    googleSigin,
  } = useContext(AuthContext);
  console.log(createUser, updateuserprofile, signInUser, setUser, googleSigin);

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

  return (
    <div className="w-full items-center justify-center  flex h-[90vh]">
      {user ? (
        <button
          className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2 sm:text-base text-sm "
          onClick={logout}>
          Sign Out
        </button>
      ) : (
        <button
          className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2 sm:text-base text-sm "
          onClick={openModal}>
          Sign In
        </button>
      )}
      {isModalOpen}
    </div>
  );
};

export default SignModal;
