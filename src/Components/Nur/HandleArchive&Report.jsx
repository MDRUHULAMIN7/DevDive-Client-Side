import { toast } from "react-hot-toast";
import { axiosPublic } from "../../Hooks/useAxiosPublic";

const handleArchive = async (archiveData, user) => {
  console.log("archiveDataAfterHit", archiveData);

  console.log("user from handled archive", user);

  try {
    const transformedData = {
      ...archiveData,
      post_id: archiveData._id,
      archivedBy: {
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      },
      archivedAt: new Date(),
    };
    delete transformedData._id;

    console.log("Transformed Data:", transformedData);

    const response = await axiosPublic.post("/archiveData", transformedData);

    if (response.status === 200) {
      toast.success("Data archived successfully!");
      console.log(response.data);
    }
  } catch (error) {
    // console.error("Error archiving data:", error);

    if (error.response && error.response.status === 400) {
      if (error.response.data.message === "Post already archived") {
        toast.error("Post already archived.");
      } else {
        toast.error("Failed to archive data.");
      }
    } else {
      toast.error("Failed to archive data. Try again.");
    }
  }
};

export { handleArchive };
