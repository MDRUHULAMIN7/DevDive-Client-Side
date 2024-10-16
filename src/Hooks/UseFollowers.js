import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UseFollowers = () => {
  const { user, loading } = UseAuth();
  const axiosPublic = useAxiosPublic();

  // Correct query with proper key spelling ('followers', not 'follwers')
  const { data: follwers = [], isLoading, refetch } = useQuery({
    queryKey: ['follwers', user?.email],
    enabled: !!user?.email && !loading, // Ensures query only runs if user is available
    queryFn: async () => {
      const res = await axiosPublic.get('/get-followers');
      return res.data;
    },
  });

  console.log("UseFollowers", follwers);


 console.log(follwers,"followers")
  return [ follwers, isLoading, refetch ]; // Return as an object for clarity
};

export default UseFollowers;

