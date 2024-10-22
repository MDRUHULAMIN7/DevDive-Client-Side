import { useParams } from "react-router-dom";
import usePayments from "../../../Hooks/UsePayments";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const PaymentHistory =()=>{


const {email}=useParams()
const [payments,paymentRefetch]=usePayments(email)


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

    return(
        <section>
           <h1 className="text-2xl  text-gray-900 dark:text-white my-4"> Payment History </h1>
            <Helmet>
        <title>DevDive | PaymentHistory</title>
      </Helmet>
          { payments &&  payments?.length > 0 && <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                <th className="py-3 px-4 text-left">No.</th>
                                <th className="py-3 px-4 text-left">Date</th>
                                <th className="py-3 px-4 text-left">Transiction Id</th>
                                <th className="py-3 px-4 text-left">Amount</th>
                                <th className="py-3 px-4 text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               payments && payments?.length > 0 && payments?.map((payment, index) => (
                                    <tr
                                        key={index} 
                                        className="border-b py-5 border-gray-300  text-gray-900 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4">{payment.date}</td>
                                    
                                        <td className="py-3 px-4  space-x-2">
                                            {payment.tran_id}
                                            
                                        </td>
                                        <td className="py-3 px-4  space-x-2">
                                           
                                            {payment.amount}
                                        </td>
                                        <td className="py-3 px-4  space-x-2">
                                           
                                        <button 
                                        onClick={()=>handleDelete(payment._id)}>
                                            <FaTrash className="text-red-500"></FaTrash>
                                        </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>  || <div className="m-10 text-2xl text-gray-900 dark:text-white">No Payment History</div>}
        </section>
    )
}

export default PaymentHistory;