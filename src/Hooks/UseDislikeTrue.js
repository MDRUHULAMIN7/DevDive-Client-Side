import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";

const UseTrue= (Id) => {

  const axiosPublic = useAxiosPublic();


  const { data: TrueInfo = [0], isLoading, refetch:likeTrueRefetch } = useQuery({
    queryKey: ["TrueInfo",Id],  
    enabled: !!Id ,  
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-single-post/${Id}`);
      // console.log("response from use ruhul like",res.data);
      return res.data
    },
  });
  // console.log("likeInfo", likeInfo);
   
  return [ TrueInfo, isLoading,likeTrueRefetch]
};

export default UseTrue;