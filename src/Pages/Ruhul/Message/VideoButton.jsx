import { useState, useRef, useEffect, useCallback } from "react";
import { FaVideo } from "react-icons/fa";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const VideoButton = ({meetingLink,setMeetingLink}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  // Generate a meeting link when the modal opens
  useEffect(() => {
    if (isModalOpen) {
      const roomId = Math.random().toString(36).substring(2, 10); // Generate random room ID
      const link = `${window.location.origin}/room/${roomId}`;
      setMeetingLink(link); // Store the generated link
    }
  }, [isModalOpen,setMeetingLink]);

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

  const handleForm = useCallback(
    (e) => {
      e.preventDefault();
      const form = e.target;
      const roomId = meetingLink.split("/room/")[1]; // Extract room ID from link

      if (roomId) {
        navigate(`/room/${roomId}`); // Navigate to the room
        setIsModalOpen(false); // Close the modal
        form.reset(); // Reset the form
      }
    },
    [meetingLink, navigate]
  );

  const copyLink = () => {
    navigator.clipboard.writeText(meetingLink).then(() => {
      alert("Meeting link copied to clipboard!");
    });
  };

  return (
    <>
      <button className="text-2xl text-blue-500" onClick={toggleModal}>
        <FaVideo />
      </button>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div
              ref={modalRef}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
              <h2 className="text-lg text-black dark:text-white font-semibold mb-4">
                Join or Create Video Room
              </h2>
              <form onSubmit={handleForm}>
                <input
                  type="text"
                  name="roomId"
                  value={meetingLink}
                  readOnly
                  className="border dark:bg-gray-800 border-gray-300 p-2 rounded w-full mb-2"
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mb-4"
                >
                  Copy Link
                </button>
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Start Meeting
                  </button>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default VideoButton;
