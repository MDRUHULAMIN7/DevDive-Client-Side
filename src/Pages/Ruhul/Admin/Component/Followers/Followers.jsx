import { useEffect, useState } from 'react';

import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';

const Followers = () => {
    const [followersData, setFollowersData] = useState([]);
     const axiosPublic = useAxiosPublic()
 
    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axiosPublic.get('/followers/all');
                console.log('API Response:', response.data);
                const followers = Array.isArray(response.data) ? response.data : [];
                console.log(followers);
                setFollowersData(followers);
            } catch (error) {
                console.error('Error fetching followers data:', error);
            }
        };

        fetchFollowers();
    }, [axiosPublic]);

    

    return (
        <section className="p-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-left m-4"> Followers</h1>
            {followersData.length > 0 ? (
                followersData.map((user, index) => (
                    <div key={index} className="m-4 p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">{user.user}</h2>
                        <ol className="list-decimal ml-5">
                        {user.followers
    .filter((follower, idx, self) =>
        idx === self.findIndex((t) => (
            t.email === follower.email // Change this to a property that uniquely identifies followers
        ))
    )
    .map((follower, idx) => (
        <li key={idx} className="mt-2 flex items-center">
    <img 
        src={follower.photo} 
        alt={follower.name} 
        className="w-10 h-10 rounded-full mr-4" 
    />
    <div className="flex flex-col"> 
        <p className="font-semibold">{follower.name} ({follower.email})</p>
        <p className="text-sm text-gray-500">Followed on: {follower.followTime}</p>
    </div>
</li>
    ))}

                        </ol>
                    </div>
                ))
            ) : (
                <p>No followers found</p>
            )}
        </section>
    );
};

export default Followers;
