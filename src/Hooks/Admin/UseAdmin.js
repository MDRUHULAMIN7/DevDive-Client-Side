import { useQuery } from "@tanstack/react-query";
import UseAuth from "../UseAuth";
import { axiosPublic } from "../useAxiosPublic";



const UseAdmin = () => {
    const {user,loading}=UseAuth();

    const {data:isAdmin}=useQuery({
        queryKey:[user?.email,'isadmin'],
        enabled:!loading,
        queryFn: async ()=>{
            const res =await
            axiosPublic.get(`users/admin/${user?.email}`);
            return res.data.admin
        }
    })
    console.log("isAdmin",isAdmin);
    return [isAdmin]
};

export default UseAdmin;