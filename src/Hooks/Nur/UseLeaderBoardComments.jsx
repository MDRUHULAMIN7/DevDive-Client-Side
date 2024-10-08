import { useQuery } from "@tanstack/react-query";
import UseAuth from "../UseAuth";
import useAxiosPublic from "../useAxiosPublic";

const UseLeaderBoardComments = () => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: leaderBoardComments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["leaderBoardComments", user?.email],
    enabled: true,
    queryFn: async () => {
      const res = await axiosPublic.get(`/leaderBoardComments`);
      return res.data;
    },
  });

  console.log(leaderBoardComments);

  return [leaderBoardComments, isLoading, refetch];
};

export default UseLeaderBoardComments;
