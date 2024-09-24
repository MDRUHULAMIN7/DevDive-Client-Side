import  { useState } from 'react';
import { format } from 'date-fns';

const PostBlog = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const now = new Date();
  const formattedDateTime = format(now, 'EEEE, MMMM dd, yyyy, hh:mm a'); // Date + Time

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
    }
  };
 
  // Handle adding lists (unordered or ordered)
  const handleList = (type) => {
    const listText = type === 'ordered'
      ? '1. Item 1\n'
      : '. Item 1\n'; // Ordered or unordered list format

    setDescription(prev => `${prev}${prev.endsWith('\n') ? '' : '\n'}${listText}`);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      bannerImage,
      headline,
      description,
      dateTime: formattedDateTime,
    });

    // Reset form after submission
    setBannerImage(null);
    setHeadline('');
    setDescription('');
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Post a Blog</h2>
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border-0
              file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>





        <div className="mb-6 relative">
  <input
    type="text"
    id="headlineInput"
    value={headline}  
    onChange={(e) => setHeadline(e.target.value)} 
    className="block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent"
    placeholder=" "
    required
  />
  <label
    htmlFor="headlineInput"
    className={`absolute left-4 top-0 transform transition-all duration-300 
      ${headline ? 'translate-y-[-3px] text-blue-500 text-xs' : 'top-1/2 -translate-y-1/2 text-gray-500 text-sm'}`}
  >
    Headline
  </label>
</div>






<div className="mb-6 relative">
  <textarea
    id="descriptionInput"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows="6"
    className="block w-full p-3 text-sm text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent resize-none"
    placeholder=" "
    required
  />
  <label
    htmlFor="descriptionInput"
    className={`absolute left-3 top-3 transform transition-all duration-300 
      ${description ? '-translate-y-4 scale-75 text-blue-500' : 'top-4 text-gray-500'} bg-white px-1`}
  >
    Description
  </label>
</div>

        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => handleList('unordered')}
            className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg py-2 px-4"
          >
            {/* Icon for unordered list */}
            <span className="material-icons">format_list_bulleted</span>
          </button>

          <button
            type="button"
            onClick={() => handleList('ordered')}
            className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg py-2 px-4"
          >
            {/* Icon for ordered list */}
            <span className="material-icons">format_list_numbered</span>
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          Post Blog
        </button>
      </form>

      <div className="w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Preview</h3>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
          {bannerImage && (
            <img
              src={bannerImage}
              alt="Banner Preview"
              className="w-full h-40 object-cover rounded-lg mb-2 shadow"
            />
          )}
          <h4 className="text-lg font-bold">{headline || 'Headline Preview'}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-300">{formattedDateTime}</p>
          <p className="mt-2 whitespace-pre-wrap">{description || 'Description Preview'}</p>
        </div>
      </div>
    </div>
  );
};

export default PostBlog;
