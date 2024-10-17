import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useIndividualArchiveData = (userEmail) => {
  const axiosPublic = useAxiosPublic();
console.log(userEmail);

  const query = useQuery({
    queryKey: ["archiveData", userEmail],
    queryFn: async () => {
      if (!userEmail) throw new Error("userEmail is required");

      const response = await axiosPublic.get(`/getIndividualArchiveData`, {
        params: { userEmail: userEmail },
      });

      // Handle unexpected API responses
      if (!response.data) throw new Error("No data found");

      return response.data;
    },
    enabled: !!userEmail,
  });

  return query;
};

export default useIndividualArchiveData;
