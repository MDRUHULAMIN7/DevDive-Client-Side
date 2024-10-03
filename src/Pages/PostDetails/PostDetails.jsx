import { useParams } from "react-router-dom";
import UsePosts from "../../Hooks/UsePosts";
import { useEffect, useState } from "react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// import required modules
import {Pagination} from 'swiper/modules';

import { SwiperSlide,Swiper } from "swiper/react";


const PostDetails = () => {
    const {id}= useParams()
    const [data,setData]=useState(null)
    const [posts]=UsePosts()

    useEffect(()=>{
         if(id){
            const newData = posts && posts?.filter((d)=> d._id === id)
            setData(newData[0]);
         }
    },[id,posts])
    console.log(data);
    return (
        <section className="my-4 pb-4">

            {
                data && (<div className="mx-auto px-2 md:px-20 lg:px-32">
                       <p className="text-lg my-4">Posted : {data.createdAt}</p>
                  
                        <div className="my-4">
       {
        data.images[0] &&  <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-[300px] md:h-[400px]  rounded-lg"
      >

        {
          data && data?.images?.map((image,index)=><SwiperSlide key={index}>
<div className="h-[300px] md:h-[400px]  w-full flex justify-center items-center overflow-hidden rounded-lg">
<img
  src={image} // Ensure this is a valid URL
  alt="Post"
  className="w-full h-full object-cover" // Use object-cover to maintain aspect ratio
/>
</div>





          </SwiperSlide>)
        }
   
      
     
      </Swiper>
       }
        </div>
        <h1 className="text-2xl font-semibold my-4">{data?.title}</h1>

      <div className="flex my-2 flex-wrap gap-2">  {
            data?.tags?.map((tag,index)=> <p 
            className="text-md bg-gray-100 dark:bg-gray-700 text-blue-500 dark:text-blue-300 px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 shadow hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out" 
            key={index}
          >
            #{tag}
          </p>
            )
        }</div>
        <p  className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: data.body }} />
                    </div>
                )
            }
            
        </section>
    );
};

export default PostDetails;