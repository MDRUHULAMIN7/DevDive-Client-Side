import { useQuery } from "@tanstack/react-query";
import UseAuth from "../UseAuth";
import useAxiosPublic from "../useAxiosPublic";

const UseLeaderBoardLikes = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: leaderBoardLikes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["leaderBoardLikes", user?.email],

    enabled: true,
    queryFn: async () => {
      const res = await axiosPublic.get(`/leaderBoardLikes`);
      return [res.data];
    },
  });

  return [leaderBoardLikes, isLoading, refetch];
};

export default UseLeaderBoardLikes;
