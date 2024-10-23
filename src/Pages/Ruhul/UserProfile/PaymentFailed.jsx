import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <section>
      <div className="flex justify-center items-center h-[90vh] ">
        <div className="text-center space-y-6">
          {/* Avatar or Illustration */}
          <div className="w-32 h-32 mx-auto">
            <img
              src="https://res.cloudinary.com/dpomtzref/image/upload/v1729445863/24014053_6844333-removebg-preview_n0lro7.png"
              alt="Payment Failed"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text Content */}
          <h1 className="text-4xl font-bold text-gray-800">Payment Failed</h1>
          <p className="text-gray-600">
            Sorry, the payment process failed. Please try again.
          </p>

          {/* Retry Button */}
          <Link to={"/"}>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-transform transform hover:scale-105">
              Try Again Later
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentFailed;
