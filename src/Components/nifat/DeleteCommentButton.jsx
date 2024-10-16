
import { axiosPublic } from '../../Hooks/useAxiosPublic';

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
    return(
        
 <button onClick={()=>deleteButton(comment._id)} className="border-2  hover:bg-red-400 dark:hover:bg-gray-800 rounded-md border-slate-200">Delete</button>
        
    )
}

export default DeleteCommentButton;