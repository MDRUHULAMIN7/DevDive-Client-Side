import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UseFollowers = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = useAxiosPublic();

  // Correct query with proper key spelling ('followers', not 'follwers')
  const {
    data: follwers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["follwers", user?.email],
    enabled: !!user?.email && !loading, // Ensures query only runs if user is available
    queryFn: async () => {
      const res = await axiosPublic.get("/get-followers");
      return res.data;
    },
  });

<<<<<<< HEAD
  return [ follwers, isLoading, refetch ]; // Return as an object for clarity
=======
  console.log("UseFollowers", follwers);

  return [follwers, isLoading, refetch]; // Return as an object for clarity
>>>>>>> 6e494376c0de653aa05e82eb29eeb0dd271fbc62
};

export default UseFollowers;
