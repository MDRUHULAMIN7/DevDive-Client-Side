import { axiosPublic } from "../../../Hooks/useAxiosPublic";

const DeleteButton=({refetch,message})=>{
    const deleteButton = (id) =>{
        if(id){
    
          axiosPublic.delete(`/delete-message/${id}`)
          .then((res) => { 
            if(res){
    
              refetch()
            }
            console.log(res)})
          .catch((err) => { if(err){
    
            refetch()
          }});
        }
      }
    return(
        
 <button onClick={()=>deleteButton(message._id)} className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">Delete</button>
        
    )
}

export default DeleteButton;