import { useState, useEffect } from "react";
import UseUser from "../../../../../Hooks/UseUser";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [, setShowModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, , refetch] = UseUser();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const filtered =
      users &&
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredUsers(filtered || []);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchTerm, users]);

  const handleMouseEnter = (index) => setShowModal(index);
  const handleMouseLeave = () => setShowModal(null);

  const handleUserAction = (user, actionType) => {
    const isRoleChange = actionType === "roleChange";
    const actionMessage = isRoleChange
      ? `Change role for <strong>${user.name}</strong>?`
      : `Do you really want to ${
          user.role === "blocked" ? "unblock" : "block"
        } <strong>${user.name}</strong>?`;

    Swal.fire({
      title: `<h2 class="text-2xl text-[#2c3e57] dark:text-white font-serif font-semibold">Are you sure?</h2>`,
      html: `<p class="text-sm text-gray-500">${actionMessage}</p>`,
      imageUrl: `${user.photoUrl}`,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: `${user.name}`,
      showCancelButton: true,
      confirmButtonText: isRoleChange
        ? "Yes, change role!"
        : `${user.role === "blocked" ? "Unblock" : "Block"} User`,
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "swal2-show bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200 transform hover:scale-105 mr-2",
        cancelButton:
          "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200 transform hover:scale-105",
      },
    }).then((result) => {
      if (!result.isConfirmed) {
        refetch();
        return;
      }

      const newRole = isRoleChange
        ? user.role === "admin"
          ? "member"
          : "admin"
        : user.role === "blocked"
        ? "member"
        : "blocked";
      const newRoleData = { data: newRole };

      axiosPublic
        .put(`/update-user-role/${user.email}`, newRoleData)
        .then((res) => {
          refetch()
          if (res.status === 200) {
            refetch();
            Swal.fire({
              title: `<h2 class="text-xl font-semibold text-[#2c3e57] dark:text-white">${
                isRoleChange
                  ? "Role Changed!"
                  : user.role === "blocked"
                  ? "Unblocked!"
                  : "Blocked!"
              }</h2>`,
              html: `<p class="text-gray-600 dark:text-gray-300">${
                isRoleChange
                  ? `The role for <strong>${user.name}</strong> has been successfully changed to <strong>${newRole}</strong>.`
                  : `User <strong>${user.name}</strong> has been successfully ${
                      user.role === "blocked" ? "unblocked" : "blocked"
                    }.`
              }</p>`,
              icon: "success",
              customClass: {
                popup: "swal2-show bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2",
                confirmButton:
                  "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200 transform hover:scale-105",
              },
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: `<h2 class="text-xl font-semibold text-[#2c3e57] dark:text-white">Something went wrong!</h2>`,
            html: `<p class="text-gray-600 dark:text-gray-300">${err}</p>`,
            icon: "error",
            customClass: {
              popup: "swal2-show bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2",
              confirmButton:
                "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transform hover:scale-105",
            },
          });
        });
    });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers =
    filteredUsers && filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));

  return (
    <section className="p-2 sm:p-2 mt-12 md:mt-4 bg-transparent text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-[#2c3e57] dark:text-gray-100 my-4 ">Manage Users ({users?.length})</h1>

      <div className="mb-6 flex ">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full md:w-1/2 lg:w-1/3 p-2 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800  dark:text-white text-gray-900 placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-pm-color text-gray-900 dark:text-white">
              <th className="p-2">Photo</th>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers &&
              currentUsers.map((user, index) => (
                <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to={`/users/${user?.email}/profile`}>
                  <td className="p-2">
                    <img
                      src={user?.photoUrl}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full border dark:border-gray-500 cursor-pointer"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </td>
                  </Link>
                  
                  <td className="p-2">{user.name}</td>
                
                  <td className="p-2">
                    <p className={`px-3 py-1 w-fit rounded-lg font-semibold ${
                      user.role === 'admin' ? "bg-blue-500 text-white" : "bg-green-500 text-white"
                    }`}>
                      {user.role}
                    </p>
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition transform hover:scale-105 shadow"
                      onClick={() => handleUserAction(user, "roleChange")}
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-2 mx-1 ${
              index + 1 === currentPage
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-300 text-gray-700"
            } rounded-lg shadow hover:bg-blue-500 hover:text-white transition`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ManageUsers;
