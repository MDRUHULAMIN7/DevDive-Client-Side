import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UsefollowingPosts = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
 
const email = user?.email;
  const {
    data: followingPosts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["followingPosts", user?.email],
    enabled:!!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-following-posts/${email}`);
      return res.data;
    },
  });

  // refetch();
 




  return [followingPosts,isLoading,refetch];

};

export default UsefollowingPosts;
