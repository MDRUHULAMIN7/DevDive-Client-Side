import { useState } from 'react';
import { format } from 'date-fns';
import { MdFormatListBulleted, MdFormatListNumbered } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
import useAxiosPublic from '../../../../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';

const PostBlog = () => {
  const [loading,setLoading]=useState(false)
  const [bannerImage, setBannerImage] = useState(null);

  const [image,setImage] =useState(null)
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const axiosPublic=useAxiosPublic()
  const now = new Date();
  const formattedDateTime = format(now, 'EEEE, MMMM dd, yyyy, hh:mm a'); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
      setImage(e.target.files[0])
    }
  };


  const handleList = (type) => {
    const listText = type === 'ordered'
      ? '1. Item 1\n'
      : '• Item 1\n'; 

    setDescription(prev => `${prev}${prev.endsWith('\n') ? '' : '\n'}${listText}`);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true)
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "bycj1ok9");
    data.append("cloud_name", "dpomtzref");
  
    try {
      const res = await axiosPublic.post(`${import.meta.env.VITE_Cloudinary_API_KEY}`, data);
  

      const imageUrl = res.data.secure_url;
      console.log("Image URL:", imageUrl);
      
  

      const BlogInfo = {
        image: imageUrl, 
        headline,
        description,
        dateTime: formattedDateTime,
      };
  
  
      const response = await axiosPublic.post('/post-blog', BlogInfo);
         console.log(response);
      if (response.data.insertedId) {
        setLoading(false)
        toast.success("Blog Posted Successfully");
      }
    } catch (error) {
      setLoading(false)
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  
  

    // Reset form after submission
    // setBannerImage(null);
    // setHeadline('');
    // setDescription('');
  

  return (
    <div className="flex flex-col md:flex-row justify-center mx-auto mt-20  bg-transparent space-y-4 md:space-y-0 lg:space-x-4">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Post a Blog</h2>

        {/* Banner Image Input */}
        <div className="mb-6 relative">
  <input
    type="file"
    accept="image/*"
    id="bannerImageInput"
    onChange={handleImageChange}
    className="hidden"
  />
  
  <label
    htmlFor="bannerImageInput"
    className="flex items-center justify-center gap-x-2 w-full px-4  py-3 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer"
  >
    <span className="material-icons text-blue-500 mr-2 text-2xl"><RiImageAddLine /></span>
  
  </label>


  <label
    className={`absolute left-4 top-0 transform transition-all duration-300
      ${bannerImage ? 'translate-y-[-3px] text-blue-500 text-xs' : 'top-1/2 -translate-y-1/2 text-gray-500 text-sm'}`}
  >
    Banner Image
  </label>
</div>



        <div className="mb-6 relative">
          <input
            type="text"
            id="headlineInput"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent"
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

        {/* Description Input (same style as Headline) */}
        <div className="mb-6 relative">
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="block w-full px-4 py-3 text-sm text-gray-900 dark:text-white bg-transparent border-b-2 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 peer placeholder-transparent"
            placeholder=" "
            required
          />
          <label
            htmlFor="descriptionInput"
            className={`absolute left-4 top-0 transform transition-all duration-300 
              ${description ? 'translate-y-[-3px] text-blue-500 text-xs' : 'top-1/2 -translate-y-1/2 text-gray-500 text-sm'}`}
          >
            Description
          </label>
        </div>

        {/* List Buttons */}
        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => handleList('unordered')}
            className="bg-blue-500  text-black text-2xl  rounded-lg py-2 px-4 flex items-center justify-center"
          >
            <span className="material-icons"><MdFormatListBulleted/></span>
          </button>

          <button
            type="button"
            onClick={() => handleList('ordered')}
            className="bg-blue-500  text-black text-2xl  rounded-lg py-2 px-4 flex items-center justify-center"
          >
            <span className="material-icons font-bold"><MdFormatListNumbered /></span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-center hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? <AiOutlineLoading className='mx-auto animate-spin '></AiOutlineLoading> : "post Blog"}
        </button>
      </form>

      {/* Preview Section */}
      <div className="w-full lg:w-1/2 md:pl-4 mt-4 md:mt-0">
       
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Preview</h3>
          {  bannerImage && (
          <div className="w-full h-64 overflow-hidden rounded-lg shadow border-2 border-gray-300 dark:border-gray-700">
          <img
            src={bannerImage}
            alt="Banner Preview"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        
          )}
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{headline || 'Headline Preview'}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-300">{formattedDateTime}</p>
          <p className="mt-2 text-gray-900 dark:text-gray-200 whitespace-pre-wrap">{description || 'Description Preview'}</p>
        </div>
      </div>
    </div>
  );
};

export default PostBlog;
