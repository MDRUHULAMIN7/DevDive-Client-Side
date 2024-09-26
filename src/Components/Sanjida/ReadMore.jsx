import { useParams } from "react-router-dom";
import UseBlogs from "../../Hooks/UseBlogs";
import { useEffect, useState } from "react";

const ReadMore = () => {
    const [blogs] = UseBlogs();
    const [blogData, setBlogData] = useState(null);

    const { id } = useParams();
useEffect(()=>{
    
    if (id) {
        const newData =blogs && blogs?.filter((data) => data._id === id)
        setBlogData(newData[0])
    }
},[blogs,id]

)
    console.log(id, blogData)
    return (
        <>
        {
            blogData?.image && <div>
                <div>
                  <img className="w-full lg:h-96 h-64" src={blogData?.image} alt="" />
                </div>
                <div className="p-4 lg:mt-16 mt-12">
                  <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                    {blogData?.headline}
                  </h1>
                  <div className="lg:flex gap-4 items-center mt-16">
                    <span className="font-bold text-2xl text-red-600 hover:text-gray-500">ANNOUNCEMENTS</span>
                    <h1 className="font-medium text-lg lg:text-xl mb-4 text-gray-800 dark:text-white hover:text-gray-500">
                      {blogData?.dateTime}
                    </h1>
                  </div>
          
                
          
                  <p className="text-base lg:text-xl mt-3" dangerouslySetInnerHTML={{ __html: blogData?.description?.replace(/\n/g, "<br />") }}></p>
          
                  
                </div>
              </div>
            
            
          }
          </>
          

    );
};

export default ReadMore;