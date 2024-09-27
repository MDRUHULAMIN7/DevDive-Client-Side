
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UseDisLikes = () => {
    
        const {user,loading}=UseAuth()
     const axiosPublic=useAxiosPublic()
 
     
        const {data:dislikes=[0],isLoading,refetch}=useQuery({
            queryKey:['dislikes',user?.email],
            enabled:!!user?.email && !loading,
            queryFn: async () => {
                const res = await axiosPublic.get(`/get-dislikes`);
                return [res.data];
                
            },
          
        })
           refetch()

        return [dislikes[0],isLoading,refetch]
    
};

export default UseDisLikes;