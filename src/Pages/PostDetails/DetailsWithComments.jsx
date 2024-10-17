import { useLocation, useParams } from "react-router-dom";
import UsePosts from "../../Hooks/UsePosts";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

import { SwiperSlide, Swiper } from "swiper/react";
import UseAuth from "../../Hooks/UseAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaShare } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import UseComments from "../../Hooks/UseComments";
import Comment from "../../Components/nifat/Comment";
import PostComponent from "../../Components/Ruhul/Card-Ruhul/PostComponent";
import { Helmet } from "react-helmet";
import PollData from "../../Components/Ruhul/Card-Ruhul/PollData";
import usePost from "../../Hooks/usePost";
import PostActions from "../../Components/Ruhul/Card-Ruhul/PostActions";

const DetailsWithComments = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const [readyToScroll, setReadyToScroll] = useState(false);
  // Trigger this effect once when data is rendered
  useEffect(() => {
    // When the component mounts, set readyToScroll to true (indicating content is rendered)
    setReadyToScroll(true);
  }, [data]); // Depends on content rendering

  useLayoutEffect(() => {
    if (location.hash && readyToScroll) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);

      console.log("Hash detected:", location.hash);
      console.log("Scrolling to element with ID:", elementId);

      if (element) {
        console.log("Element found. Scrolling now...");
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200); // Slight delay to allow for full rendering
      } else {
        console.log("Element not found");
      }
    }
  }, [location, readyToScroll]);
  const { user } = UseAuth();
  const { id } = useParams();
  const [posts, , refetch] = UsePosts();
  const axiosPublic = useAxiosPublic();
  let [comments,,commentRefetch] = UseComments(id);
  const [post, postRefetch] = usePost(id);
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [newComment, setNewComment] = useState('');
  const postCommentButton = useRef(null);

  const handleComment = () => {
    setShowCommentBox(!showCommentBox)
    // console.log(comments[0].userName)
    setTimeout(()=>{
      postCommentButton.current?.scrollIntoView({ behavior: 'smooth' });
    },100)
    
  }

  const submitComment = (e) => {
    e.preventDefault();
    const contentId = id;
    const comment = newComment;
    const userName = user.displayName;
    const userEmail = user.email;
    const userImage = user.photoURL;
    const likeCount = 0;
    const disLikeCount = 0;
    const replyCount = 0;
    const parentId = null;
    const data = { contentId, comment, userName,userEmail, userImage, likeCount, disLikeCount, replyCount, parentId }
    console.log(data)
    axiosPublic.post('/postComment', data)
      .then((result) => {
        if (result.data.insertedId) {
          console.log("checking for comment refetch", result)
          refetch()
          postRefetch()
          commentRefetch()
          toast.success('successfully commented')
        }
      })
      .catch((error) => {
        toast.error(error)
      })
    setNewComment('')
    setShowCommentBox(false)
  };

  useEffect(() => {
    if (id) {
      const newData = posts && posts?.filter((d) => d._id === id);
      setData(newData[0]);
    }
  }, [id, posts, comments]);
  console.log(data);

  

  return (
    <section className="my-4 pb-4">
      <Helmet>
          <title>DevDive | Post Details</title>
      </Helmet>
      {data && (
        <div className="mx-auto px-2 md:px-20 lg:px-32">
          <p className="text-lg my-4"><PostComponent data={data}></PostComponent></p>
          {data.images.length > 0 &&
            <div className="my-4">
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper h-[300px] md:h-[400px]  rounded-lg"
              >

                {data?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-[300px] md:h-[400px]  w-full flex justify-center items-center overflow-hidden rounded-lg">
                      <img
                        src={image} // Ensure this is a valid URL
                        alt="Post"
                        className="w-full h-full object-cover" // Use object-cover to maintain aspect ratio
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          }
          <h1 className="text-2xl font-semibold my-4">{data?.title}</h1>

          <div className="flex my-2 flex-wrap gap-2">
            {" "}
            {data?.tags?.map((tag, index) => (
              <p
                className="text-md bg-gray-100 dark:bg-gray-700 text-blue-500 dark:text-blue-300 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
                key={index}
              >
                #{tag}
              </p>
            ))}
          </div>
        {  data?.body &&
          <p
            className="text-gray-700 dark:text-gray-300 mt-5"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        }
          {/* new */}
          {
              data.poll &&  <div className="text-gray-700 dark:text-gray-300 ">

              <PollData data={data}></PollData>
              </div>
            }
          

          <div className="flex my-5 flex-wrap gap-5 items-center text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center space-x-4">
              {/* Like */}
              <PostActions data={data} user={user}></PostActions>

              {/* Dislike */}
              
            </div>

            <div className="flex items-center space-x-4">
              <button to={`/post-details/${data._id}`} className="flex items-center space-x-1 hover:text-blue-500">
                <FaCommentAlt className="h-5 w-5" />
                {/* <span className="text-sm">{comments.length}</span> */}
                <span className="text-sm">{post?.comments}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-gray-800">
                <FaShare className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
          <div id="commentSection">
            <button onClick={handleComment} className="flex items-center gap-2 rounded-full p-2 border-2 bg-slate-100 dark:bg-gray-700 dark:border-gray-700 font-medium"><IoMdAdd /> Add a Comment</button>
          </div>
          <div >
            {
              showCommentBox && <form onSubmit={submitComment} className="mt-6">
                <textarea
                  className="w-full p-3 border rounded-lg mb-2 dark:bg-gray-600 dark:text-gray-200"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  ref={postCommentButton}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Post Comment
                </button>
              </form>
            }
            {
              comments.map((comment) => <Comment key={comment._id} comment={comment} refetch= {refetch} postRefetch={postRefetch} commentRefetch={commentRefetch}></Comment>)
              // comments.length>0 && <Comment comments={comments}></Comment>
            }
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailsWithComments;
