import { useEffect, useState } from "react";
import UseBlogs from "../../../../../Hooks/UseBlogs";
import { TbLetterX } from "react-icons/tb";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const PreviewBlog = () => {
  const [blogs,isLoading] = UseBlogs();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  console.log(blogs && blogs?.length);
  useEffect(() => {
    // Disable body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const formattedDescription = data?.description?.replace(/\n/g, "<br />");

  // Calculate total pages
  const totalPages = Math.ceil((blogs?.length || 0) / itemsPerPage);
  // Get the current items for the page
  const currentItems =
    blogs &&
    blogs?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if(blogs.length === 0   ){
      return (
        <div className="text-center mt-10 text-3xl md:text-4xl text-gray-900 dark:text-gray-100">No blogs found.</div>
      )
    }
  return (


    <div className="h-full text-gray-900 dark:text-gray-100">

<h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-pm-color">
              <th className="p-4">Banner</th>
              <th className="p-4">Headline</th>
              <th className="p-4 hidden md:flex">Post Date</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems?.map((user, index) => (
                <tr key={index} className="border-b dark:border-gray-600">
                  <td className="p-4 relative">
                    <img
                      src={user?.image}
                      alt={user?.headline}
                      className="w-20 h-14 rounded-2xl border dark:border-gray-500 cursor-pointer"
                    />
                  </td>
                  <td className="p-4">
                    <div className="text-gray-900 text-sm dark:text-gray-100">
                      {user?.headline?.slice(0, 30)}...
                    </div>
                  </td>
                  <td className="text-sm hidden md:flex  mt-8">{user?.dateTime}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setData(user);
                      }}
                      className="px-3 py-2 mx-auto tracking-wide text-sm text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                      more..
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      { !blogs.length > 5 && (  <div className="flex justify-center space-x-3 items-center mt-4 mx-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 disabled:text-white text-gray-900 dark:text-white rounded-md disabled:bg-gray-800"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2  bg-blue-600 text-white disabled:text-white rounded-md disabled:bg-gray-800"
        >
          Next
        </button>
      </div>)}

      {/* Enhanced Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 mb-10"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg relative overflow-hidden max-h-[80vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-400 text-white rounded-full transition duration-200"
              aria-label="Close"
            >
              <TbLetterX size={20} />
            </button>

            {/* Modal Content with Scroll */}
            <div className="h-[70vh] overflow-y-auto">
              <div className="w-full h-64 overflow-hidden rounded-lg shadow border dark:border-gray-600 mb-4">
                <img
                  src={data?.image}
                  alt="Banner Preview"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {data.headline}
                </p>
                <p className="my-3 text-gray-700 dark:text-gray-300">
                  {data.dateTime}
                </p>
                <p
                  className="text-gray-800 dark:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: formattedDescription }}
                />

              </div>
              <div className="flex justify-between items-center mt-6">
                <Link to="/" className="text-blue-500 hover:underline">
                  Learn more
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>  
  );
};

export default PreviewBlog;
