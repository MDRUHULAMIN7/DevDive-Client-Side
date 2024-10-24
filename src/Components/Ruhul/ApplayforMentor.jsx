import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // React Icon for loading spinner
import { useDispatch, useSelector } from "react-redux";
import UseAuth from "../../Hooks/UseAuth";
import { fetchUsers } from "../../Features/Users/UsersSlices";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ApplyForMentor = () => {
  const { user } = UseAuth();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [mentorInfo, setMentorInfo] = useState({
    name: "",
    address: "",
    phone: "",
    linkedin: "",
    github: "",
   
  useremail: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const useremail = users?.users?.mainuser?.email;
  const userRole = users?.users?.mainuser?.role;

  // Fetch user data if email exists
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchUsers(user?.email));
    }
  }, [dispatch, user?.email]);

  // Update mentorInfo with useremail when available
  useEffect(() => {
    if (useremail) {
      setMentorInfo((prev) => ({ ...prev,
     useremail }));
    }
  }, [useremail]);

  const validatePhone = (phone) => /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorInfo((prev) => ({ ...prev, [name]: value }));

    let error = "";
    if (name === "phone" && !validatePhone(value)) {
      error = "Invalid phone number format.";
    } else if ((name === "linkedin" || name === "github") && !value) {
      error = `Please provide a valid ${name} profile link.`;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validationErrors = {};
    if (!validatePhone(mentorInfo.phone)) validationErrors.phone = "Invalid phone number format.";
    if (!mentorInfo.linkedin) validationErrors.linkedin = "Please provide a LinkedIn profile link.";
    if (!mentorInfo.github) validationErrors.github = "Please provide a GitHub profile link.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosPublic.post("/applay-mentor", mentorInfo);
      if (response.data.insertedId) {
        toast.success("Successfully applied for mentorship! Await admin approval.");
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply for mentorship! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (userRole === "mentor") {
    return (
      <div className="flex flex-col mx-auto space-y-2">
        <h1 className="text-2xl font-semibold">You are already a Mentor!</h1>
        <p>Thanks for your hard work and contribution to the DevDive mentor panel.</p>
        <p>Best wishes for you!</p>
      </div>
    );
  }

  return (
    <section className="mt-10 mx-auto p-8 max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-8">Apply to Become a DevDive Mentor</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "address", "phone", "linkedin", "github"].map((field) => (
          <div key={field} className="mb-6 relative">
            <input
              type={field === "phone" ? "tel" : field === "linkedin" || field === "github" ? "url" : "text"}
              name={field}
              value={mentorInfo[field]}
              onChange={handleChange}
              className={`block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent`}
              placeholder=" "
              required
            />
            <label
              htmlFor={field}
              className={`absolute left-4 top-0 transform transition-all duration-300 ${
                mentorInfo[field]
                  ? "translate-y-[-3px] text-blue-500 text-xs"
                  : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              }`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
          </div>
        ))}

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
    </section>
  );
};

export default ApplyForMentor;
