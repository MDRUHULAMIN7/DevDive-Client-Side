import { BsThreeDots } from "react-icons/bs";
import { FaRegFileArchive, FaRegFlag } from "react-icons/fa";

const DropDown = ({ id, isOpen, toggleDropdown }) => {
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
            <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
              <FaRegFileArchive /> Archive
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-black cursor-pointer flex items-center gap-1">
              <FaRegFlag /> Report
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default DropDown;
