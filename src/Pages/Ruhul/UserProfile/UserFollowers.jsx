import { Link } from "react-router-dom";


const UserFollowers = ({followerdata}) => {

    console.log(followerdata);
    return (
        <section className="text-gray-900 dark:text-gray-100">
            {followerdata && followerdata?.map((data,index)=><div className="flex w-fit p-3 justify-center items-center gap-x-6" key={index}> 
             
             <Link to={`/users/${data?.followerEmail}/profile`}><img className="h-14 w-14 object-center rounded-full " src={data?.followerPhoto} alt="photo" /></Link>
             <div className="flex flex-col  gap-y-1">
                <h1 className="text-lg font-semibold">{data?.followerName}</h1>
                <h1 className="text-sm">{data?.followerEmail}</h1>
             </div>

            </div>)}
        </section>
    );
};

export default UserFollowers;