import { BsThreeDots } from "react-icons/bs";
import { FaRegFileArchive, FaRegFlag } from "react-icons/fa";
import { handleArchive } from "../../Nur/HandleArchive&Report";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useCheckArchiveStatus from "../../../Hooks/Nur/useCheckArchiveStatus";

const DropDown = ({ id, isOpen, toggleDropdown, archiveData }) => {
  console.log("archiveData from dropdown", archiveData);
  // check archiveData._id === post_id and archivedBy.email === user.email the show already archived
  const { user } = useContext(AuthContext);

  const { archived, isLoading, error,refetch } = useCheckArchiveStatus(
    archiveData?._id,
    user?.email
  );

  console.log("is archived from dropdown", archived, isLoading, error);

  const handleArchiveClick =async () => {
    if (archived) return;
    await  handleArchive(archiveData, user);
    await  refetch();
    toggleDropdown(id);
  };

  const handleReportClick = () => {
    console.log("Report Hit");
    toggleDropdown(id);
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
              onClick={handleArchiveClick}
              className={`px-4 py-2 flex items-center gap-1 ${
                archived
                  ? "cursor-not-allowed text-gray-400"
                  : "cursor-pointer hover:bg-gray-100 dark:hover:text-black dark:bg-gray-600"
              }`}>
              <FaRegFileArchive /> {archived ? "Archived" : "Archive"}
            </li>
            <li
              onClick={handleReportClick}
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
