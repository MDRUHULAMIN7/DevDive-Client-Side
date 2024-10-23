import { FaUserPlus, FaUserCheck } from "react-icons/fa"; // Import icons
import toast from "react-hot-toast";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import UseFollowers from "../../../Hooks/UseFollowers";
import { useState } from "react"; // Import useState
import  './FollowButton.css';

const FollowButton = ({ user, data }) => {
  const [followers, , refetch] = UseFollowers();
  const [loading, setLoading] = useState(false); // State for loading
  const isFollowing = followers && followers.find(
    (a) =>
      a.followerEmail === user?.email &&
      a.followingEmail === data?.userEmail
  );

  const handleFollow = async (postId, postUsername) => {
    if (!user) {
      toast("You need to log in to Follow / Unfollow.");
      return;
    }

    const newuser = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    };

    const newNotification={
      userEmail: data.userEmail,
      message: `${user?.displayName} is following you`,
      isRead: false,
      relatedPostId: null,
      relatedUserEmail: user.email,
      relatedUserName: user?.displayName,
      relatedUserPhoto: user?.photoURL,
      type: "follow"

    }

    if (newuser?.email && newuser?.photo) {
      setLoading(true); // Set loading state to true

      try {
        // Make POST request to follow/unfollow the user
        const res = await axiosPublic.post(`/follow/${postId}`, { newuser });
        const { message } = res.data;

        await refetch(); // Refresh the data

        if (message === "Unfollowed successfully") {
          toast(`Unfollowed ${postUsername}`);
        } else if (message === "Followed successfully") {
          try{
            const res1= await axiosPublic.post('/postNotification', newNotification)
            console.log(res1.data)
          }
          catch(err){
            console.error("Error:", err);
          }
          toast(`Following ${postUsername}`);
        } else {
          toast(`No changes made for ${postUsername}`);
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("An error occurred while processing your request.");
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      toast("Invalid user data. Please log in again.");
    }
  };

  return (
    <button
      onClick={() => handleFollow(data._id, data.username)}
      className={`flex items-center justify-center p-2 font-semibold text-sm text-white rounded-xl w-full h-10 transition duration-300 
        ${loading ? 'bg-gray-500 cursor-not-allowed' : (isFollowing ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-700 hover:bg-blue-800')}
      `}
      disabled={loading} // Disable button while loading
    >
      {loading ? (
        <span className="loader"></span> // Placeholder for loader
      ) : (
        <>
          {isFollowing ? <FaUserCheck className="mr-1" /> : <FaUserPlus className="mr-1" />}
          {isFollowing ? "Following" : "Follow"}
        </>
      )}
    </button>
  );
};

export default FollowButton;
