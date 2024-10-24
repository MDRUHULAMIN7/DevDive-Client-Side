import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";


const useNotifications = () => {
    const { user,loading } = UseAuth();
    const axiosPublic = useAxiosPublic();
    // console.log('hello',postId)
    const { data: notifications = [], isLoading, refetch:notificationRefetch } = useQuery({

        queryKey: ['notifications', user?.email],
        enabled:!!user?.email && !loading, // Ensure query runs only if user email is available and not loading
        queryFn: async () => {
            const res = await axiosPublic.get(`/getNotifications/${user.email}`); // Fetch posts data
            return res.data; // Return the data directly, assuming it's an array
        },
    });
    
    return [notifications, isLoading, notificationRefetch];
};

export default useNotifications;