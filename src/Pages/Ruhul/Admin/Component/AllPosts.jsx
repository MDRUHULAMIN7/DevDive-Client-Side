import { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa6";
import AllPostModal from './AllPostModal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import { axiosPublic } from '../../../../Hooks/useAxiosPublic';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../Features/Users/UsersSlices';
import UseAuth from '../../../../Hooks/UseAuth';
import UseAllPosts from '../../../../Hooks/UseAllPosts';

function AllPosts() {
    const [posts, isLoading, refetch] = UseAllPosts(); // Fetch posts
    const [selectedPost, setSelectedPost] = useState(null); // State for selected post
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const { user } = UseAuth();
    const users = useSelector((state) => state.users);

    const dispatch = useDispatch();
    useEffect(() => {
        if (user.email) {
            dispatch(fetchUsers(user.email));
        }
    }, [dispatch, user.email]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    // Filter posts based on the search query
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate the current posts to display based on pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "<span class='text-blue-400 text-xl md:text-2xl'>Are you sure to delete this post?</span>",
            html: "<span class='text-gray-600 dark:text-white text-base'>You won't be able to revert this!</span>",
            icon: "warning",
            background: "bg-white dark:bg-gray-800",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it!",
            buttonsStyling: false,  
            customClass: {
                confirmButton: "inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out",
                cancelButton: "inline-block bg-red-500 text-white font-bold py-2 px-4 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 ease-in-out",
                popup: "rounded-lg p-6 dark:bg-gray-800 bg-white"
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (id) {
                    await axiosPublic.delete(`/user-delete-post/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "<span class='text-blue-400 text-2xl'>Deleted!</span>",
                                html: "<span class='text-gray-600 dark:white text-base'>Your Post has been deleted.</span>",
                                icon: "success",
                                background: "bg-white dark:bg-gray-800", 
                                confirmButtonText: "OK",
                                buttonsStyling: false,
                                customClass: {
                                    confirmButton: "inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
                                }
                            });
                        }
                    })
                    .catch(err => {
                        refetch();
                        toast.error(err);
                    });
                }
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className='text-gray-800 dark:text-gray-100'>
            <div className="container mx-auto md:p-4 p-1">
                <h2 className="text-2xl font-bold mb-4">Post List</h2>

                {/* Search input */}
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Search posts by title..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="w-full md:w-1/3 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                    />
                </div>

                <div className="rounded-lg">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-pm-color  text-gray-800 dark:text-gray-200">
                                <th className="py-3 px-4 text-left">No.</th>
                                <th className="py-3 px-4 text-left">Title</th>
                                <th className="py-3 px-4 text-left">Details</th>
                                <th className="py-3 px-4 text-left">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((post, index) => (
                                <tr
                                    key={post.id} 
                                    className="border-b py-5 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <td className="py-3 px-4">{indexOfFirstPost + index + 1}</td>
                                    <td className="py-3 px-4">{post.title}</td>
                                    <td className="py-3 px-4">
                                        <button 
                                            onClick={() => openModal(post)} 
                                            className="bg-pm-color  text-white px-2 py-1 rounded">
                                            See..
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button 
                                            onClick={() => handleDelete(post._id)} 
                                            className="dark:text-red-500 text-lg text-center px-2 py-1 rounded-full">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center space-x-2 mt-4">
                    <button 
                        onClick={previousPage} 
                        disabled={currentPage === 1} 
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}`}>
                        Previous
                    </button>
                    <button 
                        onClick={nextPage} 
                        disabled={currentPage >= Math.ceil(filteredPosts.length / postsPerPage)} 
                        className={`px-4 py-2 rounded ${currentPage >= Math.ceil(filteredPosts.length / postsPerPage) ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}`}>
                        Next
                    </button>
                </div>

                {isModalOpen && <AllPostModal user={users.users.mainuser} data={selectedPost} onClose={closeModal}></AllPostModal>} 
            </div>
        </section>
    );
}

export default AllPosts;
