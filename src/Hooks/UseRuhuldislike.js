import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";

const UseRuhuldisLikes = (userId,postId) => {

  const axiosPublic = useAxiosPublic();


  const { data: dislikesInfo = [0], isLoading, refetch:dislikeRefetch } = useQuery({
    queryKey: ["dislikesInfo",  postId],  
    enabled: !! postId, 
    queryFn: async () => {
      const res = await axiosPublic.get(`/is-disliked/${userId}/${postId}`);
     
      return res.data;  
    },
  });
   
  return [ dislikesInfo, isLoading,dislikeRefetch];
};

export default UseRuhuldisLikes;