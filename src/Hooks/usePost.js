import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePost = (id) => {
    const axiosPublic = useAxiosPublic();
  const { refetch:postRefetch, data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) return [];
      const res = await axiosPublic.get(`/getpost/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  return [post, postRefetch];
};

export default usePost;