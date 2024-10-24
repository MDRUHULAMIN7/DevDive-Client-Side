import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import useSingleUser from "../Hooks/useSingleUser";


const FollowerProfile = () => {
    const {email}=useParams()
    console.log(email)
    const [user, isLoading, userRefetch]=useSingleUser({email})
    console.log(user)
    return (
        <section className="p-4 mx-auto mt-10  lg:mx-20 xl:mx-44  max-w-7xl">
    <Helmet>
        <title>DevDive | FollowerProfile</title>
      </Helmet>
      {/* profile section  */}
      <div className="relative">
        <img
          className="h-72 w-full rounded-xl object-cover shadow-lg"
          src={
            user?.coverPhoto||
            "https://res.cloudinary.com/dpomtzref/image/upload/v1727683977/qyVBpT-TSs20b4myZ5bvOQ_r7roxb.jpg"
          }
          alt="Cover"
        />
        <div className="absolute top-52 md:top-52 left-1/4 transform -translate-x-1/2 md:left-10 md:transform-none">
          <img
            className="h-32 w-32 md:h-44 md:w-44 rounded-full border-8 border-white dark:border-black "
            src={user?.photoUrl}
            alt="Profile"
          />
        </div>
        <div className="mt-20 md:mt-5 md:ml-56 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start text-center md:text-left">
          <div className="flex flex-col justify-center items-center md:items-start gap-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 font-Montserrat">
              {user?.name}
            </h1>
            <h4 className="text-sm text-gray-600 dark:text-gray-400">
              {user?.followers || 0} followers ·{" "}
              Role: {user?.role || 0} 
            </h4>
          </div>
          {/* {users?.users?.mainuser?.email === user?.email ? (
            <div className="mt-4 md:mt-0">
              <Link
                className="flex justify-center items-center w-fit mx-auto md:mx-0 text-lg md:text-xl gap-x-2 b text-gray-900 dark:bg-gray-800 bg-gray-300 dark:text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                to={`/edit-profile/${email}`}>
                 <FaEdit className="text-lg" />
              </Link>
            </div>
          ) : ( */}
            <Link to={`/chat/${user?.email}`}>
              <button className="bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-600 font-semibold text-xl">
                Message
              </button>
            </Link>
          {/* )} */}
        </div>
      </div>
     {/* <ProfileTab data={users}></ProfileTab> */}

    </section>
    );
};

export default FollowerProfile;