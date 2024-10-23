import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";

const UseRuhulLikes = (userId,postId) => {

  const axiosPublic = useAxiosPublic();


  const { data: likeInfo = [0], isLoading, refetch:likeRefetch } = useQuery({
    queryKey: ["likesInfo",postId],  
    enabled: !!postId,  
    queryFn: async () => {
      const res = await axiosPublic.get(`/is-liked/${userId}/${postId}`);
      // console.log("response from use ruhul like",res.data);
      return res.data
    },
  });
  // console.log("likeInfo", likeInfo);
   
  return [ likeInfo, isLoading,likeRefetch]
};

export default UseRuhulLikes;
