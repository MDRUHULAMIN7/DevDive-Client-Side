import toast from "react-hot-toast";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import UseFollowers from "../../../Hooks/UseFollowers";


const  FollowButton =({user,data})=> {
    const [follwers,,refetch] = UseFollowers();
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
    
        if (newuser?.email && newuser?.photo) {
          try {
            // Make POST request to follow/unfollow the user
            const res = await axiosPublic.post(`/follow/${postId}`, { newuser });
    
            const { message } = res.data;
    
            await refetch(); // Refresh the data
    
            if (message === "Unfollowed successfully") {
              toast(`Unfollowed ${postUsername}`);
            } else if (message === "Followed successfully") {
              toast(`Following ${postUsername}`);
            } else {
              toast(`No changes made for ${postUsername}`);
            }
          } catch (err) {
            console.error("Error:", err);
            toast.error("An error occurred while processing your request.");
          }
        } else {
          toast("Invalid user data. Please log in again.");
        }
      };
    
  return (
    <button
    onClick={() => handleFollow(data._id, data.username)}
    className={`p-1 font-semibold text-sm text-white rounded-xl w-full h-8 bg-blue-700`}>
    {follwers &&
    follwers.find(
      (a) =>
        a.followerEmail === user?.email &&
        a.followingEmail === data?.userEmail
    )
      ? "Following"
      : "Follow"}
  </button>
  )
}
export default  FollowButton;