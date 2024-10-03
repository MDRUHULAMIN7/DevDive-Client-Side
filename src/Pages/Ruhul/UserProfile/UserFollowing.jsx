

const UserFollowing = ({followingdata}) => {
    console.log(followingdata);
    return (
        <section>
            {followingdata && followingdata?.map((data,index)=><div className="flex w-fit p-3 justify-center items-center gap-x-6" key={index}> 
             
             <div ><img className="h-14 w-14 object-center rounded-full " src={data?.followingPhoto
} alt="photo" /></div>
             <div className="flex flex-col  gap-y-1">
                <h1 className="text-lg font-semibold">{data?.following}</h1>
                <h1 className="text-sm">{data?.followingEmail}</h1>
             </div>

            </div>)}

        </section>
    );
};

export default UserFollowing;