import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UsePopularPosts = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const ruhul = true;

  const {
    data: popularPosts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", user?.email],
    enabled: ruhul,
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-popular-posts`);
      return res.data;
    },
  });


 

console.log(popularPosts);


  return [popularPosts,isLoading,refetch];

};

export default UsePopularPosts;
