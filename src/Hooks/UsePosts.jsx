import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";

const UsePosts = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  const ruhul = true;

  const {
    data: postsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", user?.email],
    enabled: ruhul,
    queryFn: async () => {
      const res = await axiosPublic.get(`/main-posts`);
      return res.data;
    },
  });

  const posts = postsData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  // refetch();

  console.log("usePostHook", posts);


  return [posts, isLoading, refetch];

};

export default UsePosts;
