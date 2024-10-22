import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { axiosPublic } from "../../Hooks/useAxiosPublic";

const handleUnarchive = async (postId, testEmailWithRuhul, refetch) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to unarchive this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unarchive it!",
    });

    if (result.isConfirmed) {
      const response = await axiosPublic.delete(`/unarchive/${postId}`, {
        params: { email: testEmailWithRuhul },
      });
      console.log(response);

      if (response.status === 200) {
        toast.success("Post unarchived successfully!");
        refetch(); // Refetch the archive data
      }
    } else {
      toast("Unarchive cancelled");
    }
  } catch (error) {
    console.error("Error unarchiving post:", error);
    toast.error("Failed to unarchive post. Please try again.");
  }
};

export { handleUnarchive };
