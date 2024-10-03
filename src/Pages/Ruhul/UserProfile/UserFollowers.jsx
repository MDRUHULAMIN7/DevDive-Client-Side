

const UserFollowers = ({followerdata}) => {

    console.log(followerdata);
    return (
        <section>
            {followerdata && followerdata?.map((data,index)=><div className="flex w-fit p-3 justify-center items-center gap-x-6" key={index}> 
             
             <div ><img className="h-14 w-14 object-center rounded-full " src={data?.followerPhoto} alt="photo" /></div>
             <div className="flex flex-col  gap-y-1">
                <h1 className="text-lg font-semibold">{data?.followerName}</h1>
                <h1 className="text-sm">{data?.followerEmail}</h1>
             </div>

            </div>)}
        </section>
    );
};

export default UserFollowers;