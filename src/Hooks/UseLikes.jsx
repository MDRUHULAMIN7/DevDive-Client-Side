import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UseLikes = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = useAxiosPublic();

  const { data: likes = [0], isLoading, refetch } = useQuery({
    queryKey: ['likes', user?.email],  // Fetch likes based on user's email
    enabled: !!user?.email && !loading,  // Only fetch if user email is available and not loading
    queryFn: async () => {
      const res = await axiosPublic.get(`/get-likes`);
      return [res.data];  // Return response data
    },
  });
  refetch()
  return [likes[0], isLoading, refetch];
};

export default UseLikes;
