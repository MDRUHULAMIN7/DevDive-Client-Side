import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import SkeletonLoader from '../../../../../Components/Ruhul/Card-Ruhul/SkeletonLoader';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const Followers = () => {
    const [followersData, setFollowersData] = useState([]);
    const [expandedUsers, setExpandedUsers] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState(''); 
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axiosPublic.get('/followers/all');
                const followers = Array.isArray(response.data) ? response.data : [];
                
       
                const sortedFollowers = followers.sort((a, b) => b.followers.length - a.followers.length);
                
                setFollowersData(sortedFollowers);
            } catch (error) {
                console.error('Error fetching followers data:', error);
            }
        };

        fetchFollowers();
    }, [axiosPublic]);

    const handleDelete = async (follower, user) => {
        Swal.fire({
            title: `<h2 class="text-red-500 font-semibold">Confirm Deletion</h2>`,
            html: `<p class="text-gray-700 dark:text-gray-300 text-lg">
                     Are you sure you want to remove <strong>${follower.name}</strong> as a follower?
                   </p>`,
            icon: 'warning',
            iconColor: '#e53e3e',
            showCancelButton: true,
            confirmButtonText: '<span class="px-4">Yes, Remove</span>',
            cancelButtonText: '<span class="px-4">Cancel</span>',
            customClass: {
                popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
                confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-4 py-2 mr-2 shadow-sm transition-all',
                cancelButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-4 py-2 shadow-sm transition-all'
            },
            buttonsStyling: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosPublic.delete(`/followers/${user.email}/${follower.email}`);
                    
                    if (response.status === 200) {
                        setFollowersData(prevData => 
                            prevData.map(u => 
                                u.email === user.email
                                    ? { ...u, followers: u.followers.filter(f => f.email !== follower.email) }
                                    : u
                            )
                        );
                        Swal.fire({
                            title: '<span class="text-green-500 font-semibold">Removed!</span>',
                            html: `<p class="text-gray-700 dark:text-gray-300">${follower.name} has been removed from followers.</p>`,
                            icon: 'success',
                            background: '#fff',
                            showConfirmButton: false,
                            timer: 1500,
                            buttonsStyling: false,
                        });
                    } else {
                        console.error("Failed to delete follower:", response.data.error);
                    }
                } catch (error) {
                    Swal.fire({
                        title: '<span class="text-red-500 font-semibold">Error!</span>',
                        html: `<p class="text-gray-700 dark:text-gray-300">Something went wrong. Please try again later.</p>`,
                        icon: 'error',
                        background: '#fff',
                        confirmButtonColor: '#ff6347',
                    });
                }
            }
        });
    };

    const toggleExpand = (userEmail) => {
        setExpandedUsers((prevExpanded) => {
            const newExpanded = new Set(prevExpanded);
            if (newExpanded.has(userEmail)) {
                newExpanded.delete(userEmail);
            } else {
                newExpanded.add(userEmail);
            }
            return newExpanded;
        });
    };

    if (!followersData.length > 0) {
        return (
            <div className="text-center">
                <p><SkeletonLoader /></p>
            </div>
        );
    }

    return (
        <section className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 dark:text-gray-100 font-serif font-semibold text-left">
                    Followers
                </h1>
               
                <input 
                    type="text" 
                    placeholder="Search followers..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:gap-6 gap-y-4">
                {followersData.map((user, index) => {
                    const isExpanded = expandedUsers.has(user.email);

                    
                    const filteredFollowers = user.followers.filter((follower) =>
                        follower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        follower.email.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                  
                    const followersToShow = isExpanded ? filteredFollowers : filteredFollowers.slice(0, 5);

                    return (
                        <div 
                            key={index} 
                            className="bg-white w-full dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md md:p-6 p-2 transition hover:shadow-lg"
                        >
                          
                            <div className="flex items-center mb-4">
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h2 className="text-lg font-bold dark:text-white">{user.name}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            
                            <p className="text-sm font-medium mb-4 dark:text-gray-300">
                                Followers: {user.followers.length}
                            </p>

                     
                            <ol className="list-decimal md:ml-5 space-y-3">
                                {followersToShow.map((follower, idx) => (
                                    <li key={idx} className="flex items-center md:space-x-4 space-x-1 relative group">
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
                                        <button className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={() => handleDelete(follower, user)}>
                                            <MdDelete className='text-lg dark:text-gray-100' />
                                        </button>
                                    </li>
                                ))}
                            </ol>

                           
                            {filteredFollowers.length > 5 && (
                                <button 
                                    onClick={() => toggleExpand(user.email)} 
                                    className="text-blue-500 hover:underline mt-4 block text-center"
                                >
                                    {isExpanded ? "Show Less" : "Show More"}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Followers;
