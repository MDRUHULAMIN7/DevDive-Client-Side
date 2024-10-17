import toast from "react-hot-toast";
import { axiosPublic } from "../../Hooks/useAxiosPublic";

const handleUnarchive = async (postId,refetch) => {
  try {
    const response = await axiosPublic.delete(`/unarchive/${postId}`); // Send request to unarchive
    if (response.status === 200) {
      toast.success("Post unarchived successfully!");
      refetch();
      // refetch useIndividualArchiveData
    }
  } catch (error) {
    console.error("Error unarchiving post:", error);
    toast.error("Failed to unarchive post. Please try again.");
  }
};

export { handleUnarchive };
