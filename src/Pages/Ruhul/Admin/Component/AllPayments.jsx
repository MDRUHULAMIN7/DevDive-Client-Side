import { useEffect, useState } from "react";
import { axiosPublic } from "../../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import UseAuth from "../../../../Hooks/UseAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const AllPayments = () => {
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = UseAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching payment data...");
        const response = await axiosPublic.get(`/get-all-payments`);

        if (response.data) {
          setAllData(response.data);
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
        All Payments ({alldata.length})
      </h1>

      <div className="overflow-hidden hidden lg:block rounded-lg shadow-md">
        {/* Table container */}
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
              {alldata.map((user, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">
                    {index + 1}
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

      {/* Mobile view */}
      <div className="block lg:hidden mt-4">
        {alldata.map((user, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
            <h2 className="font-bold text-gray-900 dark:text-gray-100">Payment {index + 1}</h2>
            <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {user?.name}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Date:</strong> {new Date(user?.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Amount:</strong> {user?.amount} <FaBangladeshiTakaSign /></p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {user?.number}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Transaction ID:</strong> {user?.tran_id}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllPayments;
