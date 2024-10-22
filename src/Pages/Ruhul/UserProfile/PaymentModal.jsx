import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa6";
import { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";

const PaymentModal = ({ isOpen, onClose,  price }) => {
  const { user } = UseAuth();
  const [formData, setFormData] = useState({
    number: "",
    email: user?.email || "",
    name: user?.displayName || "",
    address: "",
  });

  const [errors, setErrors] = useState({ number: "", address: "" });

  if (!isOpen) return null;

  const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "number") {
      if (!value || validatePhone(value)) {
        setErrors((prevErrors) => ({ ...prevErrors, number: "" }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          number: "Please enter a valid phone number.",
        }));
      }
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const { number, address } = formData;

    if (errors.number || !number || !address) {
      console.log("Validation failed.");
      return;
    }

    const paymentInfo = {
      ...formData,
      amount: price,
      date: Date.now(),
    };

    console.log("Payment Info:", paymentInfo);

    {
      paymentInfo.amount &&

      axiosPublic.post('/payment',paymentInfo)
      .then((response) => {
        
        if(response.data.url){
          window.location.replace(response.data.url);
        }
        
      })
      .catch((err)=>{
        console.log(err);
        // setError(err.message);
      })
    }
    // onCompletePayment();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 md:px-auto bg-black bg-opacity-60 backdrop-blur-md transition-all top-10 duration-500 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl w-[420px] border-t-4 border-blue-600 dark:border-blue-500"
      >
        <div className="flex flex-col items-center space-y-2 mb-6">
          <img
            src="https://res.cloudinary.com/dpomtzref/image/upload/v1729342679/logo_gxujbv.png"
            alt="User Avatar"
            className="w-20 h-20 rounded-full shadow-lg"
          />
          <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            Confirm Payment
          </h2>
          <p className="text-sm text-center text-gray-700 dark:text-gray-400">
            {price === 499
              ? "After Payment you can use Premium DevDive for 1 Month"
              : "After Payment you can use Premium DevDive for 1 Year"}
          </p>
        </div>

        <p className="text-center text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Amount:{" "}
          <span className="font-extrabold text-blue-600 dark:text-blue-300">
            {price} BDT
          </span>
        </p>

        <form className="space-y-5" onSubmit={handlePayment}>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              required
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your phone number"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your address"
            />
          </div>

          <div className="mt-8 flex justify-between space-x-4">
            <button
              className="w-full py-3 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
            className="w-full"
              style={{
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                color: "#fff",
                fontWeight: "600",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 0 25px rgba(59, 130, 246, 1)")
              }
              onMouseLeave={(e) =>
                (e.target.style.boxShadow = "0 0 15px rgba(59, 130, 246, 0.5)")
              }
              type="submit"
            >
              Pay Now
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400">
          <span className="text-lg">
            <FaLock />
          </span>
          <p className="text-sm">SSLCommerz secures your payment.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;
