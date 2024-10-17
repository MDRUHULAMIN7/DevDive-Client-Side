import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useCheckReportStatus = (post_id, email) => {
  const axiosPublic = useAxiosPublic();
  console.log("useCheckReportStatus", post_id, email);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["checkReportStatus", post_id, email],
    queryFn: async () => {
      if (!post_id || !email)
        throw new Error("Post ID and email are required.");

      const response = await axiosPublic.get("/checkReportStatus", {
        params: { post_id, email },
      });

      return response.data;
    },
    enabled: !!post_id && !!email, // Enable only if post_id and email are present
    refetchOnWindowFocus: false,
  });

  return { reported: data?.reported, isLoading, error, refetch };
};

export default useCheckReportStatus;
