import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa"; // Close icon
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ManageMentors = () => {
    const [mentor, setMentor] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [fetchNewData, setFetchNewData] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // For modal data
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal control

    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const { data } = await axiosPublic.get("/get-apply-mentor");
                setMentor(data);
            } catch (error) {
                Swal.fire("Error", "Failed to fetch mentor data", "error");
            }
        };
        fetchMentor();
    }, [fetchNewData]);

    const handleMakeMentor = (useremail) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic
                    .put(`/make-mentor/${useremail}`)
                    .then((response) => {
                        if (response.data.message) {
                            setFetchNewData(!fetchNewData);
                            Swal.fire("Success!", "The user has been approved.", "success");
                        } else {
                            Swal.fire("Error", "There was a problem approving the user.", "error");
                        }
                    })
                    .catch(() => {
                        Swal.fire("Error", "There was a problem approving the user.", "error");
                    });
            }
        });
    };

    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <section className="p-4 mt-10 lg:mt-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 my-4">
                Manage Mentors
            </h1>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                            <th className="p-4 text-sm sm:text-base">Name</th>
                            <th className="p-4 text-sm sm:text-base">Status</th>
                            <th className="p-4 text-sm sm:text-base hidden lg:flex">Phone</th>
                            <th className="p-4 text-sm sm:text-base">See Details</th>
                            <th className="p-4 text-sm sm:text-base">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentor.map((user, index) => (
                            <tr key={index} className="border-b dark:border-gray-600">
                                <td className="p-4">
                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                        {user?.name}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-gray-700 dark:text-gray-300">
                                        {user?.status}
                                    </div>
                                </td>
                                <td className="p-4 hidden lg:flex">
                                    <div className="text-gray-700 dark:text-gray-300">
                                        {user?.phone}
                                    </div>
                                </td>
                              
                                <td className="p-4">
                                    <button
                                        onClick={() => openModal(user)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition transform hover:scale-105 sm:px-4"
                                    >
                                        See Details
                                    </button>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleMakeMentor(user.useremail)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition transform hover:scale-105 sm:px-4"
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                        >
                            <FaTimes size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                            Mentor Details
                        </h2>
                        <p className="text-gray-900 dark:text-gray-100">
                            <strong>Name:</strong> {selectedUser.name}
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">
                            <strong>Status:</strong> {selectedUser.status}
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">
                            <strong>Phone:</strong> {selectedUser.phone}
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">
                            <strong>Address:</strong> {selectedUser.address}
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">
                            <strong>LinkedIn:</strong>{" "}
                            <a
                                href={selectedUser.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                {selectedUser.linkedin}
                            </a>
                        </p>
                        <p className="text-gray-900 dark:text-gray-100">
                            <strong>GitHub:</strong>{" "}
                            <a
                                href={selectedUser.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                {selectedUser.github}
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ManageMentors;
