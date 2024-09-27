import { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
import registerAnimation2 from "../../public/Animation - 1718456224514.json"
import loadingDots from "../../public/loadingDots.json"
import Lottie from "lottie-react";
import { AuthContext } from "./AuthProvider";
import UseAuth from "../Hooks/UseAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading, setIsModalOpen}=UseAuth()
    console.log("private",user)
    // const location =useLocation();
    if(user){
        return children;
    }

    if(!user){
        setIsModalOpen(true)
    }

    if(loading){
        return <div>
            <div className="w-1/6 mx-auto h-screen flex items-center ">
                <Lottie animationData={loadingDots} />;
            </div>
        </div>
    }
    // if(user){
    //     return children;
    // }
    
    //,
    return (
        <Navigate  to={'/'}></Navigate> 
        
    )

    
        
    
    // return <div>
    //     <div className="mx-auto h-screen flex justify-center items-center bg-slate-50">
    //         <div className=" grid grid-cols-1 md:grid-cols-2  items-center gap-1 md:gap-4">
    //             <div className="">
    //                 <Lottie  animationData={registerAnimation2} />
    //             </div>
    //             <div className=" flex flex-col items-center md:items-start gap-10">
    //                 <h2 className="text-3xl font-medium ">Please Sign in First</h2>
    //                 <button onClick={() => setIsModalOpen(true)}
    //                     className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2 text-sm">
    //                     Sign In
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
};

export default PrivateRoute;