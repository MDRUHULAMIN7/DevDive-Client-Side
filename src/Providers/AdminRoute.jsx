import { Navigate, useLocation,  } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";
import SkeletonLoader from "../Components/Ruhul/Card-Ruhul/SkeletonLoader";
import UseAdmin from "../Hooks/Admin/UseAdmin";


const AdminRoute = ({children}) => {


  const [isAdmin] = UseAdmin()
    const{user,loading}=UseAuth();
    const location = useLocation();
    
if( loading ) {
    return <SkeletonLoader></SkeletonLoader>;
}
if(user && isAdmin) return children;

return (
    <Navigate to={'/'} state={{from:location}} replace></Navigate>
)
};

export default AdminRoute;