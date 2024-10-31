import UseAllReports from "../../Hooks/Nur/UseAllReports";
import { FaTrash } from "react-icons/fa6";
import AllPostModal from "../../Pages/Ruhul/Admin/Component/AllPostModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
const SeeReports = () => {
  const { data, refetch } = UseAllReports();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((state) => state.users);
  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title:
        "<span class='text-blue-400 text-xl md:text-2xl'>Are you sure to delete this report?</span>",
      html: "<span class='text-gray-600 dark:text-white text-base'>You won't be able to revert this!</span>",
      icon: "warning",
      background: "bg-white dark:bg-gray-800",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it!",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out",
        cancelButton:
          "inline-block bg-red-500 text-white font-bold py-2 px-4 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 ease-in-out",
        popup: "rounded-lg p-6 dark:bg-gray-800 bg-white",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (id) {
          await axiosPublic
            .delete(`/adminDeleteReport/${id}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  title: "<span class='text-blue-400 text-2xl'>Deleted!</span>",
                  html: "<span class='text-gray-600 dark:white text-base'>Your Post  has been deleted.</span>",
                  icon: "success",
                  background: "bg-white dark:bg-gray-800",
                  confirmButtonText: "OK",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton:
                      "inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out",
                  },
                });
              }
            })
            .catch((err) => {
              refetch();
              toast.error(err);
            });
        }
      }
    });
  };

  console.log(data);

  return (
    <section className="text-gray-800 dark:text-gray-100">
      <div className="container mx-auto md:p-4 p-1">
        <h2 className="text-2xl font-bold mb-4">Post List</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="py-3 px-1 md:px-4 text-left">No.</th>
                <th className="py-3 px-1 md:px-4 text-left hidden md:block">
                  Report By
                </th>
                <th className="py-3 px-1 md:px-4 text-left">Post Title</th>
                <th className="py-3 px-1 md:px-4 text-left">Reason</th>
                <th className="py-3 px-1 md:px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((singlePostData, index) => (
                  <tr
                    key={index}
                    className="border-b py-5 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <td className="py-3 px-1 md:px-4">{index + 1}</td>
                    <Link
                      to={`/users/${singlePostData.reportBy.email}/profile`}
                      className="cursor-pointer px-1 md:px-4 items-center hidden md:flex">
                      <img
                        src={singlePostData?.reportBy?.photoURL}
                        alt={singlePostData?.reportBy?.name || "User"}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div className="flex flex-col">
                        <span className="pt-3 px-1 md:px-4 text-left">
                          {singlePostData.reportBy.name}
                        </span>
                        <span className="pb-3 px-1 md:px-4 text-left">
                          ({singlePostData.reportBy.email})
                        </span>
                      </div>
                    </Link>
                    <td
                      onClick={() => openModal(singlePostData)}
                      className="py-3 px-1 md:px-4 hover:cursor-pointer">
                      {singlePostData.title}
                    </td>
                    <td className="py-3 px-1 md:px-4 hover:cursor-pointer">
                      {singlePostData.reportBy.reportReason}
                    </td>
                    <td className="py-3 px-1 md:px-4  space-x-2">
                      <button
                        onClick={() => handleDelete(singlePostData._id)}
                        className="text-red-500 px-2 py-1 rounded-full">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <AllPostModal
            user={users.users.mainuser}
            data={selectedPost}
            onClose={closeModal}></AllPostModal>
        )}
      </div>
    </section>
  );
};

export default SeeReports;
