import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // React Icon for loading spinner
import { useDispatch, useSelector } from "react-redux";
import UseAuth from "../../Hooks/UseAuth";
import { fetchUsers } from "../../Features/Users/UsersSlices";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ApplyForMentor = () => {


  const users = useSelector((state) => state.users);
  
    const { user } = UseAuth();
    const dispatch = useDispatch();
    useEffect(() => {
      if (user?.email) {
        dispatch(fetchUsers(user?.email));
      }
    }, [dispatch, user?.email]);



const userId = users?.users?.mainuser?._id;
const userRole = users?.users?.mainuser?.role;

  const [mentorInfo, setMentorInfo] = useState({
    name: "",
    address: "",
    phone: "",
    linkedin: "",
    github: "",
    userId ,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

  const validatePhone = (phone) => {
    const phoneRegex = /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setMentorInfo({ ...mentorInfo, [name]: value });

    let error = "";
    if (name === "phone" && !validatePhone(value)) {
      error = "Invalid phone number format.";
    } else if ((name === "linkedin" || name === "github") && !value) {
      error = `Please provide a valid ${name} profile link.`;
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    let hasErrors = false;

    if (!validatePhone(mentorInfo.phone)) {
      setErrors((prev) => ({ ...prev, phone: "Invalid phone number format." }));
      hasErrors = true;
    }

    if (!mentorInfo.linkedin || !mentorInfo.github) {
      setErrors((prev) => ({
        ...prev,
        linkedin: "Please provide a LinkedIn profile link.",
        github: "Please provide a GitHub profile link.",
      }));
      hasErrors = true;
    }

    if (hasErrors) return;

    if(mentorInfo.userId && mentorInfo.name && mentorInfo.address && mentorInfo.phone && mentorInfo.linkedin && mentorInfo.github) {
console.log(mentorInfo)

       axiosPublic.post("/applay-mentor", mentorInfo)
       .then((res) => {
        if(res.data. insertedId){
          e.target.reset();
          toast.success("You have successfully applied for mentorship please wait for admin approve!");
        }
        console.log(res.data)
       })
       .catch((err) => {
        toast.error("Failed to apply for mentorship! Please try again later.");
         console.log(err);
       })
    }


      setLoading(false); // Stop loading after submission
 
  };

  return (
    <section className="mt-10  mx-auto">

      {

users && userRole && userRole === "mentor" &&  (

  <div className="flex flex-col mx-auto space-y-2">
  <h1 className="text-2xl font-semibold">  You are allready a Mentor! </h1>
  <p>Thanks for your hardwork and great contribution in mentor panel in DevDive</p>
  <p>Best Wishes for you</p>
  </div>
) || (
<div className=" p-8 mx-auto max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg">
    <h1 className="text-2xl font-semibold text-center mb-8">
        Apply to Become a DevDive Mentor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="mb-6 relative">
          <input
            type="text"
            name="name"
            value={mentorInfo.name}
            onChange={handleChange}
            className={`block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent`}
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className={`absolute left-4 top-0 transform transition-all duration-300 ${
              mentorInfo.name
                ? "translate-y-[-3px] text-blue-500 text-xs"
                : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
            }`}
          >
            Full Name
          </label>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>


        <div className="mb-6 relative">
          <input
            type="text"
            name="address"
            value={mentorInfo.address}
            onChange={handleChange}
            className={`block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent`}
            placeholder=" "
            required
          />
          <label
            htmlFor="address"
            className={`absolute left-4 top-0 transform transition-all duration-300 ${
              mentorInfo.address
                ? "translate-y-[-3px] text-blue-500 text-xs"
                : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
            }`}
          >
            Address
          </label>
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

      
        <div className="mb-6 relative">
          <input
            type="tel"
            name="phone"
            value={mentorInfo.phone}
            onChange={handleChange}
            className={`block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent`}
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className={`absolute left-4 top-0 transform transition-all duration-300 ${
              mentorInfo.phone
                ? "translate-y-[-3px] text-blue-500 text-xs"
                : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
            }`}
          >
            Phone Number
          </label>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

       
        <div className="mb-6 relative">
          <input
            type="url"
            name="linkedin"
            value={mentorInfo.linkedin}
            onChange={handleChange}
            className={`block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 ${
              errors.linkedin ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent`}
            placeholder=" "
            required
          />
          <label
            htmlFor="linkedin"
            className={`absolute left-4 top-0 transform transition-all duration-300 ${
              mentorInfo.linkedin
                ? "translate-y-[-3px] text-blue-500 text-xs"
                : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
            }`}
          >
            LinkedIn Profile Link
          </label>
          {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>}
        </div>

  
        <div className="mb-6 relative">
          <input
            type="url"
            name="github"
            value={mentorInfo.github}
            onChange={handleChange}
            className={`block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 ${
              errors.github ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent`}
            placeholder=" "
            required
          />
          <label
            htmlFor="github"
            className={`absolute left-4 top-0 transform transition-all duration-300 ${
              mentorInfo.github
                ? "translate-y-[-3px] text-blue-500 text-xs"
                : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
            }`}
          >
            GitHub Profile Link
          </label>
          {errors.github && <p className="text-red-500 text-xs mt-1">{errors.github}</p>}
        </div>

    
        <button
          type="submit"
          className={`w-full py-3 px-5 bg-blue-500 text-white rounded-md transition-all ${
            loading ? "opacity-75" : "hover:bg-blue-600"
          } flex items-center justify-center`}
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mr-2" /> : "Submit Application"}
        </button>
      </form>
    </div>
)
      }
    
    </section>
  );
};

export default ApplyForMentor;
