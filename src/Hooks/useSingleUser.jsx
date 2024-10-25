import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSingleUser = ({email}) => {
    const axiosPublic = useAxiosPublic();
  
    const {
      data: user,
      isLoading,
      refetch:userRefetch,
    } = useQuery({
      queryKey: ["mycarts", email],
      enabled:  !!email,
      queryFn: async () => {
        const res = await axiosPublic.get(`/getSingleUser/${email}`);
        return res.data;
      },
    });
  
  
    return [user, isLoading, userRefetch];
};

export default useSingleUser;