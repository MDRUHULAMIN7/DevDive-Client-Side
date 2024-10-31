import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const UseAllReports = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allReports"],
    queryFn: async () => {
      const response = await axiosPublic.get("/allReports");
      return response.data;
    },
  });

  return { data, isLoading, error, refetch };
};

export default UseAllReports;
