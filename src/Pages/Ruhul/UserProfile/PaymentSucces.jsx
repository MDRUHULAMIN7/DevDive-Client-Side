import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Background Image Cover */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dpomtzref/image/upload/v1729446399/24070626_na_january_14-removebg-preview_z4fv8x.png')`,
        }}
      ></div>

      {/* Content Card with Gradient Border */}
      <div className="relative z-10 p-2 max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl 
      border-2 border-transparent bg-clip-padding">
        <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        {/* Inner Card Content */}
        <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
            Payment Successful 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Your payment was processed successfully. Enjoy your premium access!
          </p>

          <Link to="/">
            <button className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition">
              Get Started!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
