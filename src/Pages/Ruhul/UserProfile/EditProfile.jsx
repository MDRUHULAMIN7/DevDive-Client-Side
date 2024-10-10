import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../Features/Users/UsersSlices";
import { useParams } from "react-router-dom";
import { RiImageAddLine } from "react-icons/ri";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import UseAuth from "../../../Hooks/UseAuth";

const EditProfile = () => {
  const { email } = useParams();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email2, setEmail2] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { updateuserprofile } = UseAuth();

  const imageHostApi = import.meta.env.VITE_Cloudinary_API_KEY;

  useEffect(() => {
    if (email) {
      dispatch(fetchUsers(email));
    }
  }, [dispatch, email]);

  const handleImageUpload = async (file, setImageState) => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "bycj1ok9");
    data.append("cloud_name", "dpomtzref");

    try {
      const res = await fetch(imageHostApi, {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const uploadResult = await res.json();
      const imageUrl = uploadResult.secure_url;
      setImageState(imageUrl);
    } catch (error) {
      setError("Failed to upload image. Please try again.");
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file)
    handleImageUpload(file, setCoverPic);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    handleImageUpload(file, setProfilePic);
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email2 && email2 !== email) {
      toast.error("Please provide your correct User Email!");
      setError("Please provide your correct User Email!");
      setLoading(false);
      return; 
    }

    const updatedUserInfo = {
      name: name || users?.users?.mainuser?.name,
      photoUrl: profilePic || users?.users?.mainuser?.photoUrl,
      coverPhoto: coverPic || users?.users?.mainuser?.coverPhoto || '',
    };

    try {
      await updateuserprofile(updatedUserInfo.name, updatedUserInfo.photoUrl);
      await axiosPublic.put(`/users-update/${email}`, updatedUserInfo);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      setError('Failed to update profile. Please try again.',error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4 mx-auto md:mx-20 lg:mx-44 max-w-7xl">
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-4xl w-full p-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h2>
            <form onSubmit={handleEditProfile} className="space-y-8">
              {/* Cover Photo */}
              <div className="relative mb-6">
                <label htmlFor="coverPhotoInput" className="flex items-center justify-center gap-x-2 w-full px-4 py-2 text-sm text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                  <RiImageAddLine className="text-xl text-blue-500" />
                  <span className="text-gray-500 dark:text-gray-300">{coverImage ? "Cover Photo Selected" : "Add Cover"}</span>
                  <input id="coverPhotoInput" type="file" accept="image/*" onChange={handleCoverPhotoChange} className="hidden" />
                </label>
              </div>

              {/* Profile Picture */}
              <div className="relative mb-6">
                <label htmlFor="profilePicInput" className="flex items-center justify-center gap-x-2 w-full px-4 py-2 text-sm text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300">
                  <RiImageAddLine className="text-xl text-blue-500" />
                  <span className="text-gray-500 dark:text-gray-300">{profilePic ? "Profile Picture Selected" : "Add Profile"}</span>
                  <input id="profilePicInput" type="file" accept="image/*" onChange={handleProfilePhotoChange} className="hidden" />
                </label>
              </div>

              {/* Name Input */}
              <div className="relative mb-6">
                <input type="text" id="nameInput" value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent" placeholder=" " />
                <label htmlFor="nameInput" className={`absolute left-4 top-0 transform transition-all duration-300 ${name ? "translate-y-[-3px] text-blue-500 text-xs" : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"}`}>
                  Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative mb-6">
                <input type="email" id="emailInput" value={email2} onChange={(e) => setEmail2(e.target.value)} className="block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent" placeholder=" " required />
                <label htmlFor="emailInput" className={`absolute left-4 top-0 transform transition-all duration-300 ${email2 ? "translate-y-[-3px] text-blue-500 text-xs" : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"}`}>
                  Email <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 transition-all duration-300">
                {loading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : "Submit"}
              </button>

              {error && <p className="text-lg text-center mx-auto my-3 text-red-500">{error}</p>}
            </form>
          </div>

          {/* Preview Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Preview</h2>
            <div className="flex flex-col items-center">
              <div className="w-full h-32 bg-gray-200 rounded-md mb-4 relative overflow-hidden">
                {coverPic && <img src={coverPic} alt="Cover Preview" className="w-full h-full object-cover" />}
              </div>
              <div className="w-28 h-28 rounded-full border border-gray-300 overflow-hidden mb-4">
                {profilePic && <img src={profilePic} alt="Profile Preview" className="w-full h-full object-cover" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name || "Your Name"}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
