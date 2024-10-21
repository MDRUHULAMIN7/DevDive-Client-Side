import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useIndividualArchiveData from "../../Hooks/Nur/useIndividualArchiveData";
import { handleUnarchive } from "./HandleUnarchive";

const ArchiveDetails = ({ archiveDataUser }) => {
  console.log("archiveDataUser", archiveDataUser);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext); // Get the user info

  const {
    data: archiveData,
    isLoading,
    error,
    refetch,
  } = useIndividualArchiveData(user?.email);

  console.log(archiveData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Error state

  if (archiveData?.length === 0) {
    // Show a custom message if no archived posts
    return <p>You have not archived any post.</p>;
  }

  return (
    <div className="space-y-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-semibold ">Archived Posts</h1>
      {archiveData?.map((post) => (
        <div
          key={post._id}
          className="p-5 border rounded-lg shadow-md hover:cursor-pointer">
          <div className="sm:flex">
            <div
              onClick={() => navigate(`/post-details/${post.post_id}`)}
              className="flex-grow">
              <h2 className="text-xl font-bold">
                {post.title || "No title available"}
              </h2>
              <p className="text-gray-600">By: {post.username || "Unknown"}</p>
              <p className="text-sm text-gray-500">
                Archived At:{" "}
                {post.archivedAt
                  ? new Date(post.archivedAt).toLocaleString()
                  : "Not available"}
              </p>
            </div>
            <div className="flex items-center justify-end">
              {/* add unarchive button  */}
              <button
                onClick={() =>
                  handleUnarchive(post.post_id, archiveDataUser, refetch)
                }
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4">
                Unarchive
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchiveDetails;
