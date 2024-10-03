import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReplies = (id) => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: replies = [] } = useQuery({
    queryKey: ["replies", id],
    queryFn: async () => {
      if (!id) return [];
      const res = await axiosPublic.get(`/getReplies/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  return [replies, refetch];
};

export default useReplies;