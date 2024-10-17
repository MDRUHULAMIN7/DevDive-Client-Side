import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useCheckArchiveStatus = (post_id, email) => {
  const axiosPublic = useAxiosPublic();
console.log("useCheckArchiveStatus",post_id, email);

  const { data, isLoading, error,refetch } = useQuery({
    queryKey: ["checkArchiveStatus", post_id, email],
    queryFn: async () => {
      if (!post_id || !email)
        throw new Error("Post ID and email are required.");

      const response = await axiosPublic.get("/checkArchivedStatus", {
        params: { post_id, email },
      });

      return response.data;
    },
    enabled: !!post_id && !!email, // Enable only if post_id and email are present
  });

  return { archived: data?.archived, isLoading, error,refetch };
};

export default useCheckArchiveStatus;
