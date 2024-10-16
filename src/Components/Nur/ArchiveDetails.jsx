import  { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useIndividualArchiveData from "../../Hooks/Nur/useIndividualArchiveData";

const ArchiveDetails = () => {
  const { user } = useContext(AuthContext); // Get the user info

  const {
    data: archiveData,
    isLoading,
    error,
  } = useIndividualArchiveData(user?.email); // Fetch archived data based on user email

  // useEffect(() => {
  //   if (archiveData) {
  //     updateArchiveData(archiveData);
  //   }
  // }, [archiveData, updateArchiveData]); // Get the user info


  console.log(archiveData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!archiveData || archiveData.length === 0)
    return <p>No archive data found.</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Archived Posts</h1>
      {archiveData.map((post) => (
        <div key={post._id} className="p-5 border rounded-lg shadow-md">
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
          <p
            className="mt-2 text-md"
            dangerouslySetInnerHTML={{ __html: post.body }}></p>
          {post.images.length > 0 && (
            <div className="mt-4 flex space-x-4">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
          <p className="mt-2">
            <strong>Likes:</strong> {post.likes} | <strong>Dislikes:</strong>{" "}
            {post.dislikes} | <strong>Comments:</strong> {post.comments}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            <strong>Archived By:</strong> {post.archivedBy.name} (
            {post.archivedBy.email})
          </p>
        </div>
      ))}
    </div>
  );
};

export default ArchiveDetails;
