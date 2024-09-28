import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UseFollowers = () => {
    const { user,loading} = UseAuth(); 
    const axiosPublic = useAxiosPublic(); 
   

    const { data: followers = [], isLoading, refetch } = useQuery({
        queryKey: ['follwers', user?.email],
        enabled: !!user?.email && !loading ,
        queryFn: async () => {
            const res = await axiosPublic.get(`/get-followers`); 
            return res.data; 
        },
    });

   

    console.log(followers); 
   refetch()
    return [followers, isLoading, refetch]; 
};

export default UseFollowers;
