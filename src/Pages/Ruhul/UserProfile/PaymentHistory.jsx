import { useParams } from "react-router-dom";
import usePayments from "../../../Hooks/UsePayments";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaBangladeshiTakaSign, FaTrash } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
const PaymentHistory = () => {
  const { email } = useParams();
  const [payments, paymentRefetch] = usePayments(email);


  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
console.log(payments)

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = payments?.filter(
      (payment) =>
        payment.tran_id.toLowerCase().includes(query) ||
        formatDate(payment.date).includes(query) ||
        payment.amount.toString().includes(query)
    );
    setFilteredPayments(filtered);
  }, [searchQuery, payments]);


  const totalPages = Math.ceil(filteredPayments?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = filteredPayments?.slice(startIndex, startIndex + itemsPerPage);


  const handleDelete = (id) => {
    if (!id) return;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/payments-history-delete/${id}`)
          .then((response) => {
            if (response.data.deletedCount > 0) {
              toast.success('Payment history deleted successfully');
              paymentRefetch();
            }
          })
          .catch((error) => {
            toast.error(`Error deleting payment history: ${error.message}`);
          });
      } else {
        toast.info('Action cancelled');
      }
    });
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };


  const PaymentCard = ({ payment, index }) => (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">#{index + 1}</h2>
        <button onClick={() => handleDelete(payment._id)}>
          <FaTrash className="text-red-500" />
        </button>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">Date: {formatDate(payment.date)}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300">  Transaction ID: {payment.tran_id}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 flex  items-center">Amount: {payment.amount}</p>
    </div>
  );

  return (
    <section className="max-w-6xl mx-auto md:p-4 mt-20 md:mt-5">
    <Helmet>
      <title>DevDive | PaymentHistory</title>
    </Helmet>
    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white my-6">
      Payment History
    </h1>
  
    <label className="relative block w-full md:w-1/2 lg:w-1/3 mb-6">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-gray-400">
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder="Search by Transaction ID, Date, or Amount"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 p-3 border bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
    </label>
  
    {filteredPayments?.length === 0 ? (
      <div className="text-2xl text-center text-gray-700 dark:text-gray-200 mt-10">
        No matching payment history found.
      </div>
    ) : (
      <>
        {/* Mobile View */}
        <div className="md:hidden">
          {currentPayments?.map((payment, index) => (
            <PaymentCard key={payment._id} payment={payment} index={index + startIndex} />
          ))}
        </div>
  
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-pm-color  text-gray-900 dark:text-gray-100">
                <th className="py-3 px-5 text-left">No.</th>
                <th className="py-3 px-5  text-left"> <div className="flex items-center">
                <CgCalendarDates className="text-base" /> Date</div></th>
                <th className="py-3 px-5 text-left flex items-center gap-x-1">
                  <MdOutlinePayment className="text-lg" /> Transaction ID
                </th>
                <th className="py-3 px-5 text-left  ">
              <div className=" gap-x-1 flex items-center">
              <p><FaBangladeshiTakaSign className="" /></p>  <p> Amount</p>
              </div>
                </th>
                <th className="py-3  px-5 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments?.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <td className="py-3 px-5">{index + 1 + startIndex}</td>
                  <td className="py-3 px-5">{formatDate(payment.date)}</td>
                  <td title={payment.tran_id} className="py-3 px-5">
                    {payment.tran_id}
                  </td>
                  <td className="py-3 px-5 gap-1">
                    {payment.amount} 
                  </td>
                  <td className="py-3 px-5  pl-8">
                    <button onClick={() => handleDelete(payment._id)}>
                      <FaTrash className="text-red-500 hover:text-red-600 text-lg flex justify-end transition-all" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Pagination */}
        {filteredPayments?.length > 10 && (
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </>
    )}
  </section>
  
  );
};

export default PaymentHistory;
