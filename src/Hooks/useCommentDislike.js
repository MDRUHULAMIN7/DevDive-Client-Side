import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";


const useCommentDislike = () => {
    const {user,loading}=UseAuth()
     const axiosPublic=useAxiosPublic()
 
     
        const {data:commentDislikes=[0],isLoading,refetch}=useQuery({
            queryKey:['commentDislikes',user?.email],
            enabled:!!user?.email && !loading,
            queryFn: async () => {
                const res = await axiosPublic.get(`/getCommentDislikes`);
                return [res.data];
                
            },
          
        })
           refetch()

        return [commentDislikes[0],isLoading,refetch]
};

export default useCommentDislike;