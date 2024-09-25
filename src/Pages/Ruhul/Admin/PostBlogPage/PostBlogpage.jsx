import { useState } from 'react';
import { FaPenNib, FaEye, FaPaperPlane } from 'react-icons/fa';
import PostBlog from '../Component/PostBlog/PostBlog';
import PreviewBlog from '../Component/PreviewBlog/PreviewBlog';

const PostBlogPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  // Handle tab switch
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="p-1  ">
      {/* Tabs */}
      <div className="flex justify-center flex-wrap space-y-2 lg:space-y-0 space-x-4 mb-6">
        {/* Tab 1: Write Blog */}
        <button
          onClick={() => handleTabClick(1)}
          className={`px-3 py-3 flex  items-center gap-2 text-base font-semibold rounded-xl transition-all duration-300 
            ${activeTab === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}
            hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white`}
        >
          <FaPenNib className="text-lg" />
          Write Blogs
        </button>

        {/* Tab 2: Preview Blog */}
        <button
          onClick={() => handleTabClick(2)}
          className={`px-3 py-3 flex items-center gap-2 text-base font-semibold rounded-xl transition-all duration-300
            ${activeTab === 2 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}
            hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white`}
        >
          <FaEye className="text-lg" />
          Preview Blogs
        </button>

        {/* Tab 3: Publish Blog */}
        <button
          onClick={() => handleTabClick(3)}
          className={`px-3  py-3 flex items-center gap-2 text-base font-semibold rounded-xl transition-all duration-300
            ${activeTab === 3 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}
            hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white`}
        >
          <FaPaperPlane className="text-lg" />
          Publish Blog
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-2  transition duration-300 ease-in-out transform ">
        {activeTab === 1 && (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Write Your Blog</h3>
            <PostBlog />
          </div>
        )}

        {activeTab === 2 && (
          <div className="animate-fadeIn">
           <PreviewBlog></PreviewBlog>
          </div>
        )}

        {activeTab === 3 && (
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Publish Your Blog</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Ready to go live? This section will guide you through publishing your blog for everyone to read!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostBlogPage;
