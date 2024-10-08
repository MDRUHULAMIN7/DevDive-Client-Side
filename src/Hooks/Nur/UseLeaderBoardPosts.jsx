import { useQuery } from "@tanstack/react-query";
import UseAuth from "../UseAuth";
import useAxiosPublic from "../useAxiosPublic";


const UseLeaderBoardPosts = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: leaderBoardPosts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["leaderBoardPosts", user?.email],
    enabled: true,
    queryFn: async () => {
      const res = await axiosPublic.get(`/leaderBoardPosts`);
      return res.data;
    },
  });

  // console.log(leaderBoardPosts);

  return [leaderBoardPosts, isLoading, refetch];
};

export default UseLeaderBoardPosts;
