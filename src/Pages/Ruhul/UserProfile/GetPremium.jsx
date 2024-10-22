import { Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

const GetPremium = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const openModal = (price) => {
    setSelectedPrice(price);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const completePayment = () => {

    closeModal();
  };
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
  <style>{`
  @keyframes glow {
    0% {
      text-shadow: 0 0 1px #00bfff, 0 0 3px #00bfff;
    }
    50% {
      text-shadow: 0 0 3px #00bfff, 0 0 7px #00bfff;
    }
    100% {
      text-shadow: 0 0 1px #00bfff, 0 0 3px #00bfff;
    }
  }

  .glow-text:hover {
    animation: glow 2s infinite alternate;
  }

  .glow-button {
    box-shadow: 0 0 3px #00bfff, 0 0 5px #00bfff;
    transition: box-shadow 0.2s;
  }

  .glow-button:hover {
    box-shadow: 0 0 5px #00bfff, 0 0 10px #00bfff;
  }

  .glow-image {
    box-shadow: 0 0 2px #00bfff, 0 0 4px #00bfff;
  }

  @keyframes gradientGlow {
    0% {
      border-color: #4ade80;
      box-shadow: 0 0 2px #4ade80;
    }
    50% {
      border-color: #60a5fa;
      box-shadow: 0 0 2px #60a5fa, 0 0 15px #60a5fa;
    }
    100% {
      border-color: #4ade80;
      box-shadow: 0 0 2px #4ade80;
    }
  }

  .glow-border {
    animation: gradientGlow 5s infinite;
  }
`}</style>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-12 lg:px-24">


        <div className="space-y-6">
          <h1 className="text-4xl flex justify-center items-center lg:text-5xl font-extrabold tracking-tight text-blue-500">
            <img className="h-20 mr-2" src="https://res.cloudinary.com/dpomtzref/image/upload/v1729342679/logo_gxujbv.png" alt="Logo" />
            DevDive Premium
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Unlock a world of premium content and features with <strong>DevDive Premium</strong>. Get exclusive access to mentors, real-time support, and live screen-sharing sessions.
          </p>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Premium Features:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
             
              <li>Direct access to premium mentors</li>
              <li>Real-time meetings with screen-sharing</li>
              <li>24/7 premium support</li>
            </ul>
          </div>

         
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 mt-8">
          
            <Link  className="w-full md:w-2/3 mt-2 md:mt-0">
              <button   onClick={() => openModal(3999)} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold px-6 py-3 rounded-lg glow-button transition duration-300 w-full">
                <FaBangladeshiTakaSign className="text-xl" />
                <span>3999 / year (Save 40%)</span>
              </button>
            </Link>
          </div>
        </div>

      
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dpomtzref/image/upload/v1729341671/DALL_E_2024-10-19_18.37.13_-_A_cheerful_white_mascot_character_with_a_red_antenna__sitting_on_an_elegant_royal_throne._The_throne_is_decorated_with_gold_and_plush_blue_cushions._T-removebg-preview_ndxf81.png"
            alt="DevDive Mascot"
            className="rounded-3xl shadow-2xl w-full  glow-image transition-transform duration-300 object-cover hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white dark:to-gray-900 rounded-3xl"></div>
        </div>
      </div>


      <div className=" mt-32 mx-auto px-4">
  <h1 className="text-center text-3xl font-semibold mb-14 text-blue-600 dark:text-blue-400">
    Embrace Professional Life with DevDive
  </h1>

 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[
      {
        title: 'Mentors Support',
        img: 'https://res.cloudinary.com/dpomtzref/image/upload/v1729360296/50804_hnbrab.jpg',
        description:
          'Our experienced mentors provide personalized guidance, answer questions, and offer advice.',
      },
      {
        title: 'Live Meet',
        img: 'https://res.cloudinary.com/dpomtzref/image/upload/v1729360893/11785892_4814043_dhlodx.jpg',
        description: 'Join real-time meetings to learn and grow directly with industry experts.',
      },
      {
        title: 'Screen Share',
        img: 'https://res.cloudinary.com/dpomtzref/image/upload/v1729361121/7800160_3745856_n2xnty.jpg',
        description: 'Share your screen to get hands-on help and solve problems quickly.',
      },
      {
        title: 'Chat Support',
        img: 'https://res.cloudinary.com/dpomtzref/image/upload/v1729361284/5569546_2880024_nsxhep.jpg',
        description: 'Message our mentors and receive expert guidance within 6 hours.',
      },
    ].map((feature, index) => (
      <div
        key={index}
        className="glow-border flex flex-col items-center space-y-4 p-6 border-2 rounded-lg shadow-lg 
                   hover:shadow-2xl hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800"
      >
        <img
          src={feature.img}
          alt={feature.title}
          className="h-32 w-auto rounded-md transition-transform duration-300 hover:scale-110"
        />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {feature.title}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300">{feature.description}</p>
      </div>
    ))}




  </div>
  <div className="flex flex-col md:flex-row w-fit lg:w-1/2 md:w-2/3 mx-auto space-x-0 md:items-center md:justify-center md:space-x-4 mt-16">
           
            <Link  onClick={() => openModal(3999)}  className="w-full md:w-1/2 mt-2 md:mt-0">
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold px-6 py-3 rounded-lg glow-button transition duration-300 w-full">
                <FaBangladeshiTakaSign className="text-xl" />
                <span>3999 / year (Save 40%)</span>
              </button>
            </Link>
          </div>
</div>

<p className="text-center   md:w-1/2 mt-10 flex  justify-center mx-auto text-xs">Subscriptions automatically renew <br />

* Custom app icons are only available through a paid DevDive Premium subscription.</p>

  

<PaymentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCompletePayment={completePayment}
        price={selectedPrice}
      />
    </section>
  );
};

export default GetPremium;
