import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UseLikes = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: likes = [],
    isLoading,
    refetch: likeRef,
  } = useQuery({
    queryKey: ["likes", user?.email], // Fetch likes based on user email
    enabled: !!user?.email && !loading, // Ensure query runs only when user is ready
    queryFn: async () => {
      const res = await axiosPublic.get("/get-likes");
      // Fetch likes
      return res.data; // Return the data as-is
    },
  });
  console.log("likes", likes);

  return [likes, isLoading, likeRef]; // Return likes, loading, and refetch function
};

export default UseLikes;
