
import useAxiosPublic from '../useAxiosPublic';
import UseAuth from '../UseAuth';
import { useQuery } from '@tanstack/react-query';

const UseAllComments = () => {
  const { user } = UseAuth();
    const axiosPublic = useAxiosPublic();
    const ruhul = true

    const { data: allComments = [], isLoading, refetch } = useQuery({

        queryKey: ['allComments', user?.email],
        enabled: ruhul, // Ensure query runs only if user email is available and not loading
        queryFn: async () => {
            const res = await axiosPublic.get(`/getComments`); // Fetch posts data
            return res.data; // Return the data directly, assuming it's an array
        },
    });

   




    return [allComments, isLoading, refetch];
};

export default UseAllComments;