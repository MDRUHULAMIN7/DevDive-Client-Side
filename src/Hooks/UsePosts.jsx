import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UsePosts = () => {
    const { user } = UseAuth(); // Get user and loading states from your auth hook
    const axiosPublic = useAxiosPublic(); // Get axios instance
    const ruhul = true
    // Use react-query's useQuery hook to fetch posts
    const { data: posts = [], isLoading, refetch } = useQuery({
        queryKey: ['posts', user?.email],
        enabled: ruhul, // Ensure query runs only if user email is available and not loading
        queryFn: async () => {
            const res = await axiosPublic.get(`/main-posts`); // Fetch posts data
            return res.data; // Return the data directly, assuming it's an array
        },
    });

    console.log(posts); // Log the posts array to verify the result

    return [posts, isLoading, refetch]; // Return the data, loading state, and refetch function
};

export default UsePosts;
