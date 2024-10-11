import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchUsers } from "../../../Features/Users/UsersSlices";
import ProfileTab from "./ProfileTab";
import UseAuth from "../../../Hooks/UseAuth";

const UserProfile = () => {
  const { email } = useParams();
  const users = useSelector(state => state.users)

const {user } = UseAuth()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(email){
      dispatch(fetchUsers(email))
    }
   
  },[dispatch,email]);


 
  return (
    <section className="p-4 mx-auto md:mx-20 lg:mx-44 max-w-7xl">

      {/* profile section  */}
      <div className="relative">
        <img
          className="h-52 w-full rounded-xl object-cover shadow-lg"
          src={users?.users?.mainuser?.coverPhoto && users?.users?.mainuser?.coverPhoto || "https://res.cloudinary.com/dpomtzref/image/upload/v1727683977/qyVBpT-TSs20b4myZ5bvOQ_r7roxb.jpg" }
          alt="Cover"
        />
        <div className="absolute top-40 md:top-36 left-1/2 transform -translate-x-1/2 md:left-10 md:transform-none">
          <img
            className="h-32 w-32 md:h-44 md:w-44 rounded-full border-8 border-white dark:border-black "
            src={users?.users?.mainuser?.photoUrl}
            alt="Profile"
          />
        </div>
        <div className="mt-20 md:mt-5 md:ml-56 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start text-center md:text-left">
          <div className="flex flex-col justify-center items-center md:items-start gap-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 font-Montserrat">
            {users?.users?.mainuser?.name}
            </h1>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">
              {users?.users?.totalFollowers || 0} followers · {users?.users?.totalFollowing || 0} following
            </h4>
          </div>
          {
            users?.users?.mainuser?.email === user?.email

            &&
            <div className="mt-4 md:mt-0">
            <Link
              className="flex justify-center items-center w-fit mx-auto md:mx-0 text-lg md:text-xl gap-x-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
              to={`/edit-profile/${email}`}
            >
              Edit <FaEdit className="text-lg" />
            </Link>
          </div>
          }

         


        </div>
      </div>
{/* tab section */}
<div>
  <ProfileTab data={users}></ProfileTab>
</div>

      {/*  */}
    </section>
  );
};

export default UserProfile;
