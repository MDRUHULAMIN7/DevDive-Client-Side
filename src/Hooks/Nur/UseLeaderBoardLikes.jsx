import { useQuery } from "@tanstack/react-query";
import UseAuth from "../UseAuth";
import useAxiosPublic from "../useAxiosPublic";

const UseLeaderBoardLikes = (loadAllLikes) => {
  const { user } = UseAuth();
  const axiosPublic = useAxiosPublic();
  console.log("loadAllLikes", loadAllLikes);

  const {
    data: leaderBoardLikes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["leaderBoardLikes", user?.email, loadAllLikes],

    enabled: true,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/leaderBoardLikes?loadAllLikes=${loadAllLikes}`
      );
      return [res.data];
    },
  });

  return [leaderBoardLikes, isLoading, refetch];
};

export default UseLeaderBoardLikes;
