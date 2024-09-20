

const ManagUsers = () => {
  const user = {
    userImage: 'https://i.pravatar.cc/50',
    userName: 'John Doe',
    roll: '101',
    role: 'User',
  };

  return (
    <section className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <th className="p-4">User Image</th>
              <th className="p-4">User Name</th>
              <th className="p-4">Roll</th>
              <th className="p-4">Role</th>
              <th className="p-4">Make Admin</th>
              <th className="p-4">Block User</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-gray-600">
              <td className="p-4">
                <img
                  src={user.userImage}
                  alt={user.userName}
                  className="w-10 h-10 rounded-full border dark:border-gray-500"
                />
              </td>
              <td className="p-4">
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {user.userName}
                </div>
              </td>
              <td className="p-4 text-gray-700 dark:text-gray-300">
                {user.roll}
              </td>
              <td className="p-4">
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full ${
                    user.role === 'Admin'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-500 dark:text-white'
                      : 'bg-green-100 text-green-700 dark:bg-green-500 dark:text-white'
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-4">
                <button className="px-4 py-1 text-white bg-blue-500 dark:bg-blue-600 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                  Make Admin
                </button>
              </td>
              <td className="p-4">
                <button className="px-4 py-1 text-white bg-red-500 dark:bg-red-600 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition-colors">
                  Block User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManagUsers;
