import toast from "react-hot-toast";

import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import { BsThreeDots } from "react-icons/bs";

const UserModal=({refetch,data,toggleDropdown,isOpen})=>{

    const handleDelete=async(id)=>{
        Swal.fire({
          title: "<span class='text-blue-400 text-xl md:text-2xl'>Are you sure to delete this post?</span>",
          html: "<span class='text-gray-600 dark:text-white text-base'>You won't be able to revert this!</span>",
          icon: "warning",
          background: "bg-white dark:bg-gray-800",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it!",
          buttonsStyling: false,
          customClass: {
            confirmButton: "inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out",
            cancelButton: "inline-block bg-red-500 text-white font-bold py-2 px-4 rounded-lg ml-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300 ease-in-out",
            popup: "rounded-lg p-6 dark:bg-gray-800 bg-white"
          }
        }).then( async(result)=> {



          if (result.isConfirmed) {

            if(id){
              await axiosPublic.delete(`/user-delete-post/${id}`)
              .then((res)=>{
                if(res.data.deletedCount > 0){
                  refetch();
                  Swal.fire({
                    title: "<span class='text-blue-400 text-2xl'>Deleted!</span>",
                    html: "<span class='text-gray-600 dark:white text-base'>Your Post  has been deleted.</span>",
                    icon: "success",
                    background: "bg-white dark:bg-gray-800",
                    confirmButtonText: "OK",
                    buttonsStyling: false,
                    customClass: {
                      confirmButton: "inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
                    }
                  });
                }


              })
              .catch(err=>{
                refetch();
                toast.error(err);
              })
            }

          }
        });




      }
    return (
        <div className="relative">
         <div className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BsThreeDots
              onClick={()=>toggleDropdown(data._id) }
              className="cursor-pointer"
            />
            
          </div>
      {    
isOpen &&
        <div className="absolute right-0 mt-4 w-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg z-10">
        <ul className="flex-col py-2 justify-center">

          {/* <button to={''}  className="px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900   cursor-pointer flex justify-start items-center gap-1">
            <BiEdit /> Edit
          </button> */}
          <button onClick={()=>handleDelete(data._id)} className="px-4 rounded-xl py-2 justify-center text-gray-900 dark:text-gray-100  hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer flex items-center gap-1">
            <MdDelete   /> Delete
          </button>

        </ul>
      </div>}
      
      </div>
    )
}

export default UserModal;