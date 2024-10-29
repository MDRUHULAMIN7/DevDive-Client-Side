import UseAllReports from "../../Hooks/Nur/UseAllReports";
import { FaTrash } from "react-icons/fa6";
import AllPostModal from "../../Pages/Ruhul/Admin/Component/AllPostModal";
import { useState } from "react";
import { useSelector } from "react-redux";
const SeeReports = () => {
  const { data } = UseAllReports();
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
  console.log(data);

  return (
    <section className="text-gray-800 dark:text-gray-100">
      <div className="container mx-auto md:p-4 p-1">
        <h2 className="text-2xl font-bold mb-4">Post List</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="py-3 px-4 text-left">No.</th>
                <th className="py-3 px-4 text-left">Post Title</th>
                <th className="py-3 px-4 text-left">Report By</th>
                <th className="py-3 px-4 text-left">Details</th>
                <th className="py-3 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((singlePostData, index) => (
                  <tr
                    key={index}
                    className="border-b py-5 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{singlePostData.title}</td>
                    <td className="px-4 flex items-center">
                      {/* add report by user image here {singlePostData.reportBy.photoURL} */}

                      <img
                        src={singlePostData?.reportBy?.photoURL}
                        alt={singlePostData?.reportBy?.name || "User"}
                        className="w-10 h-10 rounded-full object-cover border"
                      />

                      <div className="flex flex-col">
                        <span className="pt-3 px-4 text-left">
                          {" "}
                          {singlePostData.reportBy.name}
                        </span>
                        <span className="pb-3 px-4 text-left">
                          {" "}
                          ({singlePostData.reportBy.email})
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4  space-x-2">
                      <button
                        onClick={() => openModal(singlePostData)}
                        className="bg-blue-500 text-white px-2 py-1 rounded">
                        View
                      </button>
                    </td>
                    <td className="py-3 px-4  space-x-2">
                      <button className="dark:text-red-500 px-2 py-1 rounded-full">
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
