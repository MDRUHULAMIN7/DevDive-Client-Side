import { useContext, useEffect } from "react";
import { useState } from "react";
import BodyInput from "../Fardus/BodyInput/BodyInput";
import Tags from "../Fardus/Tags/Tags";
import { NavLink, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import ImagePost from "../Fardus/ImagePost/ImagePost";
import LinkPost from "../Fardus/LinkPost/Linkpost";
import { LuLoader } from "react-icons/lu";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const CreatePost = () => {
  const location = useLocation();
  const { user} = useContext(AuthContext);
  const imageHostApi = import.meta.env.VITE_Cloudinary_API_KEY;
  const axiosPublic = useAxiosPublic();
  const [inputValue, setInputValue] = useState('');
  const [linkValue, setLinkValue] = useState('');
  const [value, setValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [files, setFiles] = useState([]);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyTags, setEmptyTags] = useState(false);
  const [imageLoader, setImageLoader] = useState(false)
  const [getImageUrl, setGetImageUrl] = useState([])
  const maxCharacters = 300;

  const handleInputChange = (e) => {
    const title = e.target.value;

    if (title.length <= maxCharacters) {
      setInputValue(title);
    }
  };


  const handleLinkChange = (e) => {
    const link = e.target.value;

    setLinkValue(link);
  };

  const remainingCharacters = maxCharacters - inputValue.length;



  const handleTagsUpdate = (tags) => {
    setSelectedTags(tags);
  };

  useEffect(() => {
  }, [location]);




  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const textToShow = isExpanded ? value : value.slice(0, 250) + (value.length > 250 ? "..." : "");

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };


  useEffect(() => {
    const uploadImages = async () => {
      setImageLoader(true)
      try {
        const uploadedImageUrls = await Promise.all(
          files.map(async (image) => {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "bycj1ok9");
            data.append("cloud_name", "dpomtzref");

            const res = await fetch(`${imageHostApi}`, {
              method: "POST",
              body: data,
            });

            if (!res.ok) {
              throw new Error("Network response was not ok");
            }

            const result = await res.json();
            return result.secure_url; // Return the uploaded image URL
          })
        );

        setGetImageUrl(uploadedImageUrls); // Set the uploaded image URLs in state
        setImageLoader(false)
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      }
    };

    uploadImages(); // Only call uploadImages if there are files to upload
  }, [files]);




  const handlePost = async () => {
    if (inputValue.length < 2) {
      setEmptyTitle(true);
    } else if (inputValue.length > 2) {
      setEmptyTitle(false);
    }

    if (tags.length === 0 && selectedTags.length === 0) {
      setEmptyTags(true);
    } else if (tags.length > 0 && selectedTags.length > 0) {
      setEmptyTags(false);
    }

    if (inputValue.length > 2 && tags.length > 0) {
      try {
        // Send POST request to backend
        const response = await axiosPublic.post("/main-posts", {
          title: inputValue,
          tags: tags,
          body: value,
          link: linkValue,
          images: getImageUrl,
          userEmail: user?.email,
          username: user?.displayName,
          profilePicture: user?.photoURL,
        });

        if (response.status === 200) {
          console.log("Post added successfully:", response.data);
          console.log(value);
          toast.success("Post added successfully");
          // Reset state after successful post
          setEmptyTags(false);
          setEmptyTitle(false);
          setSelectedTags([]);
          setTags([]);
          setInputValue('');
          setValue("");
          setLinkValue("");
          setGetImageUrl([]);
          setFiles([]);
        }
      } catch (error) {
        console.error("Error posting data:", error);
        toast.error("Error posting data:", error);
      }
    }
  };
console.log(user?.email,user?.displayName,user?.photoURL);




  return (
    <div className="w-[95%] mx-auto">
      <Helmet>
        <title>DevDive | Create-Post</title>
      </Helmet>
      <div className="mx-auto flex justify-center gap-12 py-7">
        <div className="w-[690px]">
          <div className="w-full flex justify-end">
            <button className="text-xs font-bold bg-pm-color text-white px-2 rounded-2xl py-1">Draft</button>
          </div>
          <h2 className="text-xl font-bold mb-5">Create Post</h2>

          <div className="flex justify-start items-center gap-14 text-sm font-bold mt-14 mb-7 ml-4">
            <NavLink className={({ isActive }) =>
              ` pb-2 px-2 border-b-2 text-gray-700 dark:text-gray-500 ${isActive ? 'border-sec-color' : 'border-transparent'}`
            } to="/create-post/text-post">Text</NavLink>
            <NavLink className={({ isActive }) =>
              ` pb-2 px-2 border-b-2 text-gray-700 dark:text-gray-500 ${isActive ? 'border-sec-color' : 'border-transparent'}`
            } to="/create-post/image-post">Image</NavLink>
            <NavLink className={({ isActive }) =>
              ` pb-2 px-2 border-b-2 text-gray-700 dark:text-gray-500 ${isActive ? 'border-sec-color' : 'border-transparent'}`
            } to="/create-post/link-post">Link</NavLink>
          </div>

          <div className={`relative w-full border rounded-2xl mb-10 ${emptyTitle ? "border-red-500" : "border-gray-300 dark:border-gray-500"}`}>
            <div className="relative">
              <input
                id="title"
                required
                value={inputValue}
                onChange={handleInputChange}
                className={`w-full text-sm h-[58px] bg-transparent placeholder:text-slate-400 dark:text-gray-100 text-slate-700 rounded-md px-4 transition duration-300 ease outline-none
                        ${inputValue ? 'pt-2' : ''}`}
              />
              <label
                htmlFor="title"
                className={`absolute cursor-text px-1 left-2.5 bg-transparent text-slate-400 transition-all transform origin-left peer-focus:left-2.5
        ${inputValue ? 'top-[5px] left-2.5 scale-90 text-xs' : 'top-[50%] translate-y-[-50%] text-sm'}`}
              >
                Title <span className="text-red-500 text-lg absolute top-[-3px]">*</span>
              </label>
            </div>
            <div className="text-right text-xs text-slate-500 absolute right-1 bottom-[-25px]">
              {remainingCharacters}/300
            </div>
            {emptyTitle && <span className="text-right text-xs text-red-500 absolute left-1 bottom-[-25px]">Title is Required</span>}

          </div>


          <Tags tags={tags} emptyTags={emptyTags} setTags={setTags} onTagsUpdate={handleTagsUpdate}></Tags>

          <div className="mt-10 mb-5">
            {location.pathname == "/create-post/text-post" && <BodyInput setValue={setValue} value={value}></BodyInput>}
            {location.pathname == "/create-post/image-post" && <ImagePost files={files} setFiles={setFiles}></ImagePost>}
            {location.pathname == "/create-post/link-post" && <LinkPost linkValue={linkValue} handleLinkChange={handleLinkChange}></LinkPost>}
          </div>

          <div className="w-full">
            <div className="flex justify-end gap-5">
              <button className="bg-pm-color text-white px-3 py-2 rounded-3xl text-xs font-semibold">Save Draft</button>
              {
                imageLoader ? <button className={`${imageLoader ? "cursor-not-allowed" : ""} bg-pm-color text-white px-3 py-2 rounded-3xl font-semibold`}><LuLoader className="animate-spin" /></button> : <button onClick={handlePost} className={` bg-pm-color text-white px-3 py-2 rounded-3xl text-xs font-semibold`}>Post</button>
              }
            </div>
          </div>
        </div>
        {/* Draft */}
        <div className="w-[320px] border-gray-300 p-3 dark:border-gray-500 rounded-xl md:block hidden">
          <h1 className="font-semibold mb-5">{inputValue}</h1>
          <div className="text-sm mb-5">
            <div dangerouslySetInnerHTML={{ __html: textToShow }} />
            {value.length > 250 && (
              <button
                onClick={toggleText}
                className="text-blue-700 mt-2"
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </div>
          <a href={linkValue} target="_blank" className="text-xs text-blue-400 block mb-5">
            {truncateText(linkValue, 50)}
          </a>
          {
            getImageUrl.map((imageUrl) => {
              return (
                <img
                  key={imageUrl}
                  className="h-[100px] w-[100px] object-cover rounded-lg mr-5"
                  src={imageUrl}
                  alt="Image"
                />
              );
            })
          }
          <div className="flex justify-start flex-wrap items-center">
            {selectedTags.map((tag) => (
              <span key={tag} className="text-xs text-sec-color font-semibold mr-3 mb-1">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreatePost;
