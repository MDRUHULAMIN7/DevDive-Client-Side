import { useContext, useState } from "react";
import UserFollowers from "./UserFollowers";
import UserFollowing from "./UserFollowing";
import UserPosts from "./UserPosts";
import ArchiveDetails from "../../../Components/Nur/ArchiveDetails";
import { AuthContext } from "../../../Providers/AuthProvider";

const ProfileTab = (data) => {
  const userData = data && data;
  const { user } = useContext(AuthContext);
  console.log(user);

  const [activeTab, setActiveTab] = useState("posts"); // Default tab
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 capitalize">
      {/* Tab Header */}
      <div className="flex justify-center  mb-4">
        <button
          className={`py-2 px-2 md:px-4 font-semibold ${
            activeTab === "posts"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("posts")}>
          Posts
        </button>
        {userData.data.users.mainuser?.email === user?.email && (
          <button
            className={`py-2 px-2 md:px-4  font-semibold ${
              activeTab === "Archive"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Archive")}>
            Archive
          </button>
        )}
        <button
          className={`py-2  px-2 md:px-4  font-semibold ${
            activeTab === "followers"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("followers")}>
          Followers
        </button>
        <button
          className={`py-2  px-2 md:px-4  font-semibold ${
            activeTab === "following"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("following")}>
          Following
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        {activeTab === "followers" && (
          <UserFollowers
            followerdata={userData.data.users.followers}></UserFollowers>
        )}
        {activeTab === "following" && (
          <UserFollowing
            followingdata={userData.data.users.following}></UserFollowing>
        )}
        {activeTab === "posts" && (
          <UserPosts user2={userData.data.users.mainuser}></UserPosts>
        )}
        {activeTab === "Archive" && (
          <ArchiveDetails
            archiveDataUser={
              userData.data.users.mainuser.email
            }></ArchiveDetails>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
