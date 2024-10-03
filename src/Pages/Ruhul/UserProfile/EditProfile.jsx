import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../Features/Users/UsersSlices";
import { useParams } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri"; // Importing the image add icon

const EditProfile = () => {
  const { email } = useParams();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(fetchUsers(email));
    }
  }, [dispatch, email]);

  console.log(users);

  // Initialize state variables
  const [name, setName] = useState("");
  const [email2, setEmail2] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  // Function to handle image input
  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  return (
    <section className="p-4 mx-auto md:mx-20 lg:mx-44 max-w-7xl">
      <div className="min-h-screen flex items-center justify-center  p-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-4xl w-full p-6 flex flex-col lg:flex-row gap-6">
          {/* Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Edit Profile
            </h2>
            <form className="space-y-8">
              {/* Cover Photo */}
              <div className="relative mb-6">
                <label
                  htmlFor="coverPhotoInput"
                  className="flex  items-center justify-center gap-x-2 w-full px-4 py-2 text-sm text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-2  border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <RiImageAddLine className="text-xl text-blue-500" />
                  <span className="text-gray-500 dark:text-gray-300">
                    {coverPhoto ? "Cover Photo Selected" : "Add Cover"}
                  </span>
                  <input
                    id="coverPhotoInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setCoverPhoto)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Profile Picture */}
              <div className="relative mb-6">
                <label
                  htmlFor="profilePicInput"
                  className="flex  items-center justify-center gap-x-2 w-full px-4 py-2 text-sm text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-2  border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300"
                >
                  <RiImageAddLine className="text-xl text-blue-500" />
                  <span className="text-gray-500 dark:text-gray-300">
                    {profilePic ? "Profile Picture Selected" : "Add Profile"}
                  </span>
                  <input
                    id="profilePicInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, setProfilePic)}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Name Input */}
              <div className="relative mb-6">
                <input
                  type="text"
                  id="nameInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="nameInput"
                  className={`absolute left-4 top-0 transform transition-all duration-300
                    ${
                      name
                        ? "translate-y-[-3px] text-blue-500 text-xs"
                        : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                    }`}
                >
                  Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative mb-6">
                <input
                  type="email"
                  id="emailInput"
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                  className="block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="emailInput"
                  className={`absolute left-4 top-0 transform transition-all duration-300
                    ${
                      email2
                        ? "translate-y-[-3px] text-blue-500 text-xs"
                        : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                    }`}
                >
                  Email <span className="text-red-500 ">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Preview
            </h2>
            <div className="space-y-4">
              {/* Cover Photo Preview */}
              {coverPhoto ? (
                <div>
                  <img
                    src={coverPhoto}
                    alt="Cover Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-300">
                  No Cover Photo
                </div>
              )}

              {/* Profile Picture Preview */}
              {profilePic ? (
                <div>
                  <img
                    src={profilePic}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full mx-auto"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto flex items-center justify-center text-gray-500 dark:text-gray-300">
                  No Profile Picture
                </div>
              )}

              {/* Name and Email Preview */}
              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 dark:text-white">
                  {name || "Your Name"}
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
