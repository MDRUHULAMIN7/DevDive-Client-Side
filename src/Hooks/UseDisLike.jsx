import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UseDisLikes = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = useAxiosPublic();

  const { data: dislikes = [], isLoading, refetch:dislikeRef } = useQuery({
    queryKey: ["dislikes", user?.email],  // Fetch dislikes based on user email
    enabled: !!user?.email && !loading,   // Ensure query runs only when user is ready
    queryFn: async () => {
      const res = await axiosPublic.get("/get-dislikes");  // API call
      return res.data;  // Return the data directly
    },
  });

<<<<<<< HEAD
  return [dislikes, isLoading, dislikeRef];  // Return the necessary values
=======
  console.log("UseDisLikes", dislikes);


  refetch();
  return [dislikes, isLoading, refetch];  // Return the necessary values
>>>>>>> 6e494376c0de653aa05e82eb29eeb0dd271fbc62
};

export default UseDisLikes;
