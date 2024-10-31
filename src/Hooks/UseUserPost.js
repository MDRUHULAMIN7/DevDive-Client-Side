import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UseUserPost = ( email) => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
console.log(email);

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", user?.email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user-posts/${email}`);
      return res.data;
    },
  });


console.log(posts);


  return [posts, isLoading, refetch];

};

export default UseUserPost;