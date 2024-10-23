import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePayments = (email) => {
    const axiosPublic = useAxiosPublic();
  const { refetch:paymentRefetch, data:payments } = useQuery({
    queryKey: ["payments", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosPublic.get(`/get-payment-history/${email}`);
      return res.data;
    },
    enabled: !!email,
  });
  return [payments, paymentRefetch];
};

export default usePayments;