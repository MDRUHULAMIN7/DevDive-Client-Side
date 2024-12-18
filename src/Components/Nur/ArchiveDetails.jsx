import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import useIndividualArchiveData from "../../Hooks/Nur/useIndividualArchiveData";
import { handleUnarchive } from "./HandleUnarchive";
import { Helmet } from "react-helmet";

const ArchiveDetails = () => {
  const {testEmailWithRuhul} =useParams()
  console.log("testEmailWithRuhul", testEmailWithRuhul);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext); // Get the user info

  const {
    data: archiveData,
    isLoading,
    error,
    refetch,
  } = useIndividualArchiveData(user?.email);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Error state

  if (archiveData?.length === 0) {
    // Show a custom message if no archived posts
    return <p>You have not archived any post.</p>;
  }

  return (
    <div className="space-y-8 text-gray-900 dark:text-gray-100">
        <Helmet>
        <title>DevDive | Archives</title>
      </Helmet>
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
                  handleUnarchive(post.post_id, testEmailWithRuhul, refetch)
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
