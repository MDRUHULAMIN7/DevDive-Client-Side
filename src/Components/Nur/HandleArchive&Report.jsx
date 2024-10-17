import { toast } from "react-hot-toast";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

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
      toast.success("Post archived successfully!");
      console.log(response.data);
    }
  } catch (error) {
    // console.error("Error archiving data:", error);

    if (error.response && error.response.status === 400) {
      if (
        error.response.data.message === "Post already archived by this user"
      ) {
        toast.error("Post already archived by you.");
      } else {
        toast.error("Failed to archive data.");
      }
    } else {
      toast.error("Failed to archive data. Try again.");
    }
  }
};

export { handleArchive };

const handleReport = async (archiveData, user) => {
  console.log("Handle Report console", archiveData, user);

  try {
    const { value: reason } = await Swal.fire({
      title: "Report Post",
      input: "textarea",
      inputLabel: "Reason for reporting this post",
      inputPlaceholder: "Type your reason here...",
      inputAttributes: {
        "aria-label": "Type your reason here",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter a reason to submit your report!";
        }
      },
      preConfirm: (value) => {
        if (!value) {
          Swal.disableButtons(); // Disable submit button when input is empty
        }
      },
    });

    if (reason) {
      const transformedReportData = {
        ...archiveData,
        post_id: archiveData._id,
        reportBy: {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          reportReason: reason, // Add the reason to the report data
        },
        reportAt: new Date(),
      };

      delete transformedReportData._id;

      console.log("Transformed Report Data:", transformedReportData);

      // Simulate sending the report data to the backend
      toast.success("Report submitted successfully!");
    } else {
      toast("Report cancelled."); // Show cancellation toast
    }
  } catch (error) {
    console.error("Error handling report:", error);
    toast.error("Something went wrong. Please try again.");
  }
};

export { handleReport };
