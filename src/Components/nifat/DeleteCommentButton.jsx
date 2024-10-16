
import Swal from 'sweetalert2';
import { axiosPublic } from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const DeleteCommentButton = ({comment,refetch,replyRefetch,postRefetch}) => {
    const deleteButton = (id) =>{
        if(id){
    
          axiosPublic.delete(`/deleteComment/${id}`)
          .then((res) => { 
            if(res){
    
              refetch()
              replyRefetch()
              postRefetch()
              
            }
            console.log(res)})
          .catch((err) => { if(err){
    
            refetch()
            replyRefetch()
            postRefetch()
          }});
        }
      }
      const handleDelete=()=>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            deleteButton(comment._id)
            toast.success('Your comment has been deleted')
          }
        });
      }
    return(
      <button onClick={handleDelete} className="border-2  hover:bg-red-400 dark:hover:bg-gray-800 rounded-md border-slate-200">Delete</button>
    )
}

export default DeleteCommentButton;