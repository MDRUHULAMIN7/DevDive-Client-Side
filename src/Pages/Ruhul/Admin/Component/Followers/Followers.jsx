import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import SkeletonLoader from '../../../../../Components/Ruhul/Card-Ruhul/SkeletonLoader';

const Followers = () => {
    const [followersData, setFollowersData] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axiosPublic.get('/followers/all');
         
                const followers = Array.isArray(response.data) ? response.data : [];
                setFollowersData(followers);
            } catch (error) {
                console.error('Error fetching followers data:', error);
            }
        };

        fetchFollowers();
    }, [axiosPublic]);

    if(!followersData.length > 0){
        return (
            <div className="text-center">
                <p><SkeletonLoader></SkeletonLoader></p>
            </div>
        );
    }

    return (
        <section className="p-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-100 font-serif font-semibold text-left mb-8">
                Followers
            </h1>

            {followersData && followersData.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-6 gap-y-4">
                    {followersData && followersData.map((user, index) => (
                        <div 
                            key={index} 
                            className="bg-white w-full dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md md:p-6 p-2 transition hover:shadow-lg"
                        >
                            {/* Following User Info */}
                            <div className="flex items-center mb-4">
                                <img
                                    src={user.photo}
                                    alt={user.following}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h2 className="text-lg font-bold dark:text-white">{user.name}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            {/* Followers Count */}
                            <p className="text-sm font-medium mb-4 dark:text-gray-300">
                                Followers: {user.followers.length}
                            </p>

                            {/* Followers List */}
                            <ol className="list-decimal md:ml-5 space-y-3">
                                {user.followers && user.followers.map((follower, idx) => (
                                    <li key={idx} className="flex items-center space-x-4">
                                        <img
                                            src={follower.photo}
                                            alt={follower.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="flex flex-col w-full">
                                            <p className="font-semibold dark:text-white">
                                                {follower.name} ({follower.email})
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Followed on: {new Date(follower.time).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                    No followers found
                </p>
            )}
        </section>
    );
};

export default Followers;
