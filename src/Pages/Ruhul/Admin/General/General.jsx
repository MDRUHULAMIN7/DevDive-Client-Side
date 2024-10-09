
import { useState } from "react";
import AllPosts from "../Component/AllPosts";

const General = () => {
  const [activeTab, setActiveTab] = useState('All Posts'); // Initial active tab

  const tabs = ['All Posts', 'Notifications', 'Privacy']; // Define the tab names

  return (
    <section className="md:p-5 p-1">
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
      <div className="bg-transparent md:p-4 p-1">
        {activeTab === 'All Posts' && (
          <div>

           <AllPosts></AllPosts>
          </div>
        )}
        {activeTab === 'Notifications' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Notifications</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Manage your notification settings, including email and push notifications.
            </p>
          </div>
        )}
        {activeTab === 'Privacy' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Adjust your privacy settings, including account visibility and data sharing preferences.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default General;
