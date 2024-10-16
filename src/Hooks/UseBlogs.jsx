
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UseBlogs = () => {
    
        const {user,loading}=UseAuth()
     const axiosPublic=useAxiosPublic()
 
     
        const {data:blogs=[0],isLoading,refetch}=useQuery({
            queryKey:['blogs',user?.email],
            enabled:!!user?.email && !loading,
            queryFn: async () => {
                const res = await axiosPublic.get(`/get-blog`);
                return [res.data];
                
            },
          
        })
          

        return [blogs[0],isLoading,refetch]
    
};

export default UseBlogs;