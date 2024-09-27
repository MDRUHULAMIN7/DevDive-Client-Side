
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UseLikes = () => {
    
        const {user,loading}=UseAuth()
     const axiosPublic=useAxiosPublic()
 
     
        const {data:likes=[0],isLoading,refetch}=useQuery({
            queryKey:['likes',user?.email],
            enabled:!!user?.email && !loading,
            queryFn: async () => {
                const res = await axiosPublic.get(`/get-likes`);
                return [res.data];
                
            },
          
        })
           refetch()

        return [likes[0],isLoading,refetch]
    
};

export default UseLikes;