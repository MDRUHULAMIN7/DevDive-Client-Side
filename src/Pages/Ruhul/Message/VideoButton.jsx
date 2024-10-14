import { useState, useRef, useEffect } from "react";
import { FaVideo } from "react-icons/fa";
import { createPortal } from "react-dom";

const VideoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        className="text-2xl text-blue-500"
        onClick={toggleModal}
      >
        <FaVideo />
      </button>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
              ref={modalRef}
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
              <h2 className="text-lg font-semibold mb-4">Join Video Room</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted");
                  setIsModalOpen(false); // Close modal on submit
                }}
              >
                <input
                  type="text"
                  placeholder="Enter Room Name"
                  className="border border-gray-300 p-2 rounded w-full mb-4"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Join Room
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default VideoButton;
