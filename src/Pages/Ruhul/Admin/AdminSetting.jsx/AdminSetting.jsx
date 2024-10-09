
import  { useState } from 'react';
import ManagUsers from '../Component/ManageUsers/ManagUsers';
import PostBlogPage from '../PostBlogPage/PostBlogpage';
import Followers from '../Component/Followers/Followers';

const AdminSetting = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = ['General', 'User Management', 'Post Blog', 'System Settings','Follwers'];

  return (
    <div className="md:p-4 p-1 w-full mx-auto">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center space-y-2 space-x-0 sm:space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg
              ${
                activeTab === tab
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-transparent p-6 rounded-lg shadow-md">
        {activeTab === 'General' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">General Settings</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Here you can update general settings for the admin panel.
            </p>
          </div>
        )}
        {activeTab === 'User Management' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">User Management</h2>
            <section className="text-gray-700 dark:text-gray-300">
              Manage users, assign roles, and view user activity.

              <ManagUsers></ManagUsers>
            </section>
          </div>
        )}
        {activeTab === 'Post Blog' && (
          <div>
           <PostBlogPage></PostBlogPage>
          </div>
        )}
        {activeTab === 'System Settings' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">System Settings</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Configure system-wide settings, including performance and security.
            </p>
          </div>
        )}
        {activeTab === 'Follwers' && (
          <div>
            <Followers></Followers>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSetting;
