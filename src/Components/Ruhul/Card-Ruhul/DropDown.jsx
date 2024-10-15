import { BsThreeDots } from "react-icons/bs";
import { FaRegFileArchive, FaRegFlag } from "react-icons/fa";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const DropDown = ({ id, isOpen, toggleDropdown, archiveData }) => {
  console.log("archiveData", archiveData);

  const handleArchive = async (archiveData) => {
    console.log("archiveDataAfterHit", archiveData);
    try {
      const transformedData = {
        ...archiveData,
        post_id: archiveData._id,
      };
      delete transformedData._id;

      console.log("Transformed Data:", transformedData);

      const response = await axiosPublic.post("/archiveData", transformedData);
      if (response.status === 200) {
        toast.success("Data archived successfully!");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error archiving data:", error);
      if (error.response && error.response.status === 400) {
        // Handle specific 400 Bad Request error
        if (error.response.data.message === "Post already archived") {
          toast.error("Post already archived.");
        } else {
          toast.error("Failed to archive data.");
        }
      } else {
        console.error("Error archiving data:", error);
        toast.error("Failed to archive data. Try again.");
      }
    }
  };

  return (
    <section>
      <div
        onClick={() => toggleDropdown(id)}
        className="p-2 dark:hover:bg-gray-700 hover:bg-gray-200 rounded-full duration-200 cursor-pointer">
        <BsThreeDots />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-6 w-32 rounded-xl shadow-lg z-10">
          <ul className="m-0 p-0 bg-white dark:bg-themeColor rounded-xl">
            <li
              onClick={() => handleArchive(archiveData)}
              className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
              <FaRegFileArchive /> Archive
            </li>
            <li
              onClick={() => console.log("Report Hit")}
              className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
              <FaRegFlag /> Report
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default DropDown;
