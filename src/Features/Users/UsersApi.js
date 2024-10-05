import { axiosPublic } from "../../Hooks/useAxiosPublic";

export const getUsers = async (email) => {
    const response = await axiosPublic.get('/one-user',{
        params:{email}
    });
    return response.data; // Axios automatically returns `data` in the response
  };

