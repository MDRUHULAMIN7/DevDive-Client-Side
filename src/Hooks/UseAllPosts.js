import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UseAllPosts = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const ruhul = true;

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", user?.email],
    enabled: ruhul,
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-posts`);
      return res.data;
    },
  });




  return [posts, isLoading, refetch];

};

export default UseAllPosts;