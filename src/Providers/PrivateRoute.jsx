import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import loadingDots from "../../public/loadingDots.json"
import Lottie from "lottie-react";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location =useLocation();
    if(loading){
        return <div>
            <div className="w-1/6 mx-auto h-screen flex items-center ">
                <Lottie animationData={loadingDots} />;
            </div>
        </div>
    }
    if(user){
        return children;
    }
    
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;