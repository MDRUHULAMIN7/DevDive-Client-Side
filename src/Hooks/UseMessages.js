import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const UseMessages = ({ reciver, sender }) => {
  const axiosPublic = useAxiosPublic();

  const { data: messages = [0], isLoading, refetch } = useQuery({
    queryKey: ['messages', sender?.email, reciver?.email],
    enabled: !!sender?.email && !!reciver?.email,
    queryFn: async () => {
        const res = await axiosPublic.post('/get-messages',{
            sender,
            reciver,
          });
      return res.data;
    },
  });
console.log("UseMessages", messages);

  return [messages, isLoading, refetch];
};

export default UseMessages;
