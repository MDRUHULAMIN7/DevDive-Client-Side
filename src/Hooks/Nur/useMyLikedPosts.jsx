import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useMyLikedPosts = (userEmail) => {
  const axiosPublic = useAxiosPublic();

  console.log("userEmail in hook:", userEmail);

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myLikedPosts", userEmail],
    queryFn: async () => {
      if (!userEmail) {
        throw new Error("User email is required.");
      }

      const response = await axiosPublic.get(`/getMyLikedPosts/${userEmail}`);
      console.log("Response from /getMyLikedPosts:", response.data);

      return response.data;
    },
    enabled: !!userEmail,
    refetchOnWindowFocus: false,
  });

  return [data, isLoading, error, refetch];
};

export default useMyLikedPosts;
