import { useEffect, useState } from "react";
import { axiosPublic } from "../../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import UseAuth from "../../../../Hooks/UseAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const AllPayments = () => {
  const [alldata, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = UseAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(`/get-all-payments`);

        if (response.data) {
          setAllData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user.email]);

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    const filtered = alldata.filter(
      (item) =>
        item?.name?.toLowerCase().includes(value) ||
        item?.number?.includes(value) ||
        item?.tran_id?.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="p-4 mt-14 lg:mt-3">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        All Payments ({filteredData.length})
      </h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name, phone, or transaction ID..."
            className="w-full px-4 py-2 text-gray-900 border dark:border-gray-300 border-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
        </div>
      </div>

      {/* No Data Message */}
      {filteredData.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            No payments found. Please try again .
          </p>
        </div>
      ) : (
        <>
          {/* Table View */}
          <div className="overflow-hidden hidden lg:block rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <th className="p-4 text-left">No.</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Date</th>
                    <th className="p-4 text-left">Amount</th>
                    <th className="p-4 text-left">Phone</th>
                    <th className="p-4 text-left">Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                    >
                      <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        {user?.name}
                      </td>
                      <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        {new Date(user?.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 flex items-center gap-x-1 font-semibold text-gray-900 dark:text-gray-100">
                        {user?.amount} <FaBangladeshiTakaSign />
                      </td>
                      <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        {user?.number}
                      </td>
                      <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                        {user?.tran_id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile */}
          <div className="block lg:hidden mt-4">
            {currentData.map((user, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
                <h2 className="font-bold text-gray-900 dark:text-gray-100">
                  Payment {index + 1 + (currentPage - 1) * itemsPerPage}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Name:</strong> {user?.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Date:</strong>{" "}
                  {new Date(user?.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Amount:</strong> {user?.amount} <FaBangladeshiTakaSign />
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Phone:</strong> {user?.number}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Transaction ID:</strong> {user?.tran_id}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

       {/* Pagination  */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllPayments;
