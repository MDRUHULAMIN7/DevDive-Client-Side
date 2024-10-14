import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import DeleteButton from "./DeleteButton";

const ChatModal = ({ message, sender, openModalId, setOpenModalId, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [editedMessage, setEditedMessage] = useState(message.message); 


  const toggleModal = (id) => {
    setOpenModalId((prevId) => (prevId === id ? null : id));
  };


  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setOpenModalId(null);
  };

  const handleEditMessage = (id) => {
    const updatedMessage = `${editedMessage} (edited)`; 

    if (id) {
      axiosPublic
        .put(`/edit/${id}`, { message: updatedMessage })
        .then((res) => {
          if (res) refetch(); 
          setIsEditModalOpen(false); 
        })
        .catch((err) => {
          console.error(err);
          refetch();
        });
    }
  };

  return (
    <>
      <section className="relative">
     
        <button onClick={() => toggleModal(message._id)}>
          <BsThreeDotsVertical />
        </button>

        {/* Dropdown Modal for Delete and Edit Options */}
        {openModalId === message._id && (
          <div
            className={`absolute shadow-lg rounded-lg p-2 space-y-2 z-20 bg-white dark:bg-gray-700 
              mt-2 w-40
              ${
                message.senderEmail === sender.email
                  ? "left-20 md:left-0 top-full transform md:translate-x-0 -translate-x-1/2"
                  : "md:right-0 right-20 top-full transform md:translate-x-0 translate-x-1/2"
              }`}
          >
            <div className="flex flex-col gap-y-2">
              <DeleteButton message={message} refetch={refetch} />
              <button
                onClick={handleEditClick}
                className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Edit Message Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 space-y-4">
            <h2 className="text-xl font-semibold text-center">Edit Message</h2>
            <textarea
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditMessage(message._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;
