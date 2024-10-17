import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UseLikes = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = useAxiosPublic();

<<<<<<< HEAD

  const { data: likes = [], isLoading, refetch:likeRef } = useQuery({
    queryKey: ["likes", user?.email],  // Fetch likes based on user email
    enabled: !!user?.email && !loading,  // Ensure query runs only when user is ready
    queryFn: async () => {
      const res = await axiosPublic.get("/get-likes");
        // Fetch likes
      return res.data;  // Return the data as-is
    },
  });
   
  return [likes, isLoading,likeRef]; // Return likes, loading, and refetch function
=======
  const {
    data: likes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["likes", user?.email], // Fetch likes based on user email
    enabled: !!user?.email && !loading, // Ensure query runs only when user is ready
    queryFn: async () => {
      const res = await axiosPublic.get("/get-likes"); // Fetch likes
      return res.data; // Return the data as-is
    },
  });

  refetch();
  console.log("UseLikes", likes);

  return [likes, isLoading, refetch]; // Return likes, loading, and refetch function
>>>>>>> 6e494376c0de653aa05e82eb29eeb0dd271fbc62
};

export default UseLikes;
