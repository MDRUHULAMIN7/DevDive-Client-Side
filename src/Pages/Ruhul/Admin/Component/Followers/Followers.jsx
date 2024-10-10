import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';

const Followers = () => {
    const [followersData, setFollowersData] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axiosPublic.get('/followers/all');
                console.log('API Response:', response.data);

                // Check if the API response is an array and set the followers data
                const followers = Array.isArray(response.data) ? response.data : [];
                setFollowersData(followers);
            } catch (error) {
                console.error('Error fetching followers data:', error);
            }
        };

        fetchFollowers();
    }, [axiosPublic]);

    return (
        <section className="p-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-left m-4">Followers</h1>

            {followersData.length > 0 ? (
                followersData.map((user, index) => (
                    <div key={index} className="m-4 p-4 border rounded-lg shadow-md">
                        {/* Display the "following" user's image and email */}
                        <div className="flex items-center mb-4">
                            <img
                                src={user.followingPhoto}
                                alt={user.following}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{user.following}</h2>
                                <p className="text-sm text-gray-600">{user.followingEmail}</p>
                            </div>
                        </div>

                        {/* Show number of followers */}
                        <p className="text-sm font-medium mb-2">Followers: {user.followers.length}</p>

                        <ol className="list-decimal ml-5">
                            {/* Map through the followers array for each "following" user */}
                            {user.followers.map((follower, idx) => (
                                <li key={idx} className="mt-2 flex items-center">
                                    <img
                                        src={follower.followerPhoto}
                                        alt={follower.followerName}
                                        className="w-10 h-10 rounded-full mr-4"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">
                                            {follower.followerName} ({follower.followerEmail})
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Followed on: {follower.followTime}
                                        </p>
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
