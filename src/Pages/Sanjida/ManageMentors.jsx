import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ManageMentors = () => {
    const [mentor, setMentor] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [fetchNewData, setFetchNewData] = useState(false);

    useEffect(() => {
        const fetchMentor = async () => {
            try {
                const { data } = await axiosPublic.get('/get-apply-mentor');
                setMentor(data);
            } catch (error) {
                Swal.fire('Error', 'Failed to fetch mentor data', 'error');
            }
        };
        fetchMentor();
    }, [fetchNewData]);

    const handleMakeMentor = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to make this user a mentor?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, make mentor!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.put(`/make-mentor/${userId}`)
                    .then(response => {
                        if (response.data.message) {
                            setFetchNewData(!fetchNewData);
                            Swal.fire('Success!', 'The user has been made a mentor.', 'success');
                        } else {
                            Swal.fire('Error', 'There was a problem making the user a mentor.', 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error', 'There was a problem making the user a mentor.', 'error');
                    });
            }
        });
    };

    return (
        <section className="p-4">
            <h1 className="text-2xl text-gray-900 dark:text-gray-100 my-4">Manage Mentors</h1>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                            <th className="p-4">Photo</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Address</th>
                            <th className="p-4">LinkedIn</th>
                            <th className="p-4">GitHub</th>
                            <th className="p-4">See details</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {mentor.map((user, index) => (
                            <tr key={index} className="border-b dark:border-gray-600">
                                <td className="p-4">
                                    <img
                                        src={user?.photoUrl}
                                        alt={user?.name}
                                        className="w-12 h-12 rounded-full border dark:border-gray-500"
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">{user?.name}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">{user?.status}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">{user?.phone}</div>
                                </td>
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">{user?.address}</div>
                                </td>
                                <td className="p-4">
                                    <a href={user?.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500">LinkedIn</a>
                                </td>
                                <td className="p-4">
                                    <a href={user?.github} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-500">GitHub</a>
                                </td>
                                <td className="p-4">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">See Details</button>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleMakeMentor(user.userId)} 
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                                    >
                                        Make Mentor
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageMentors;
