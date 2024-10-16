
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UseUSer = () => {

        const {user,loading}=UseAuth()
     const axiosPublic=useAxiosPublic()


        const {data:users=[0],isLoading,refetch}=useQuery({
            queryKey:['mycarts',user?.email],
            enabled:!!user?.email && !loading,
            queryFn: async () => {
                const res = await axiosPublic.get(`/get-users`);
                return [res.data];

            },

        })
           

        return [users[0],isLoading,refetch]

};

export default UseUSer;