import { useEffect, useState } from "react";
import { axiosPublic } from "../../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import UseAuth from "../../../../Hooks/UseAuth";

const AllPayments =()=>{
    const [alldata, setAllData]=useState([0])
    const [loading, setLoading] = useState(false);

const { user } = UseAuth();
 
    useEffect(() => {
    setLoading(true);
        const fetchData = async () => {
          try {
            console.log('Fetching mentor data...');
            const response = await axiosPublic.get(`/get-all-payments`);
    
            if (response.data ) {
           setAllData(response.data);
            }
          } catch (error) {
            toast.error("something went wrong please try again later", error);
          } finally {
            setLoading(false);
          }
        };
    
        if (user?.email) {
          fetchData();
        }
      }, [user.email]);
    
      return (
        loading ? (
          <div>Loading...</div>
        ) : (
          <section>
        {alldata?.length}
          </section>
        )
      );
      
}

export default AllPayments;