import { IoIosArrowForward } from "react-icons/io";
import { PiFacebookLogoBold } from "react-icons/pi";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { TiSocialTumblerCircular } from "react-icons/ti";
import { AiOutlinePinterest } from "react-icons/ai";
import { Link } from "react-router-dom";
import UseBlogs from "../../Hooks/UseBlogs";
import { Helmet } from "react-helmet";


const BlogCard = () => {
    const [blogs] = UseBlogs();

    console.log(blogs && blogs)
    return (

        <section className="">
             <Helmet> <title>DevDive | Blogs</title> </Helmet>
            <div className="space-y-4 flex flex-col justify-center mx-auto my-14">
                {
                    blogs && blogs?.map((data, index) => <div key={index} className=" w-full lg:w-8/12 mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl transition-all duration-300 ease-in-out transform">
                            <div className="flex flex-col lg:flex-row gap-4 items-center p-2 lg:p-4 lg:mb-8 lg:mt-8 mb-4 mt-4 justify-start w-full">
                                <span className="font-bold lg:text-2xl text-xl text-red-600">ANNOUNCEMENTS</span>
                                <h1 className="lg:font-medium text-lg lg:text-xl text-gray-800 dark:text-white">{data.dateTime}</h1>
                            </div>

                            <img
                                className="object-cover w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 mt-2"
                                src={data.image}
                                alt="NIKE AIR"
                            />
                            <p className="p-3 lg:font-semibold mt-4 mb-4 text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-white justify-start">{data.headline}</p>

                            <div className="flex flex-col lg:flex-row justify-between p-4 items-start lg:items-center">

                                <Link to={`/readMore/${data._id}`}> <button className="font-semibold flex gap-2 items-center text-blue-500 hover:text-blue-600 transition-colors duration-200">
                                    READ MORE <IoIosArrowForward className="h-5 w-5"></IoIosArrowForward>
                                </button>
                                </Link>

                                <div className="flex gap-4 items-center mt-4 lg:mt-0">
                                   
                                    <a href="https://www.facebook.com/"><PiFacebookLogoBold className="h-8 w-8 text-blue-500 hover:text-blue-600"></PiFacebookLogoBold></a>
                                    <a href="https://twitter.com/i/flow/single_sign_on"><TiSocialTwitterCircular className="h-10 w-10 text-blue-500 hover:text-blue-600"></TiSocialTwitterCircular></a>
                                    <a href="https://www.pinterest.com/"><AiOutlinePinterest className="h-8 w-8 font-bold text-blue-500 hover:text-blue-600"></AiOutlinePinterest></a>
                                    <a href="https://www.tumblr.com/"><TiSocialTumblerCircular className="h-10 w-10 text-blue-500 hover:text-blue-600"></TiSocialTumblerCircular></a>
                                    <a href="https://www.redditinc.com/"><img className="w-8 h-8" src="https://static-00.iconduck.com/assets.00/reddit-icon-icon-256x256-3itsn4fq.png" alt="Reddit" /></a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>


    );
};

export default BlogCard;




