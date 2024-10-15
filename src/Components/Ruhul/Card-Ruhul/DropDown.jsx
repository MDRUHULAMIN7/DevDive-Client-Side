import { BsThreeDots } from "react-icons/bs";
import { FaRegFileArchive, FaRegFlag } from "react-icons/fa";
import { handleArchive } from "../../Nur/HandleArchive&Report";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const DropDown = ({ id, isOpen, toggleDropdown, archiveData }) => {
  const { user } = useContext(AuthContext);

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
              onClick={() => handleArchive(archiveData, user)}
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
