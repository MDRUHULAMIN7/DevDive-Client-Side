import { useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";

import Chats from "./Chats";

const ChatArea=({selectedUser})=>{

const {user}=UseAuth();
const [response,setResponse]=useState('')
const handleMessage=(e)=>{
    e.preventDefault()
  setResponse("")
    const message= e.target.message.value;

    const messageInfo={
        senderName : user.displayName,
        senderEmail : user.email,
        senderPhoto : user.photoURL,
        message,
        timestamp : new Date(),
        receiverName : selectedUser.name,
        receiverEmail : selectedUser.email,
        receiverPhoto : selectedUser.photoUrl,
    }

    if(messageInfo.senderPhoto && message){
        console.log(messageInfo)

        axiosPublic.post('/messages',messageInfo)
        .then(res=>{
             console.log(res.data)
         setResponse('r')
 
        }).catch(err=>{
             console.log(err)
         })
        }
    

}



    if(!selectedUser && user || selectedUser.email === user.email){
        return(
            <section className="mx-auto mt-10">
<div className="flex flex-col text-center justify-center items-center mx-auto  ">
<img className="my-4 rounded-full border-2 border-blue-500 h-24 md:h-36 " src={user?.photoURL} alt="" />

<h1 className="text-lg  ">{user?.displayName}</h1>
<p>{user?.email}</p>
</div>

            </section>)
    }

    return(
        <section className= "w-full md:w-3/4 p-4 flex flex-col ">

          
     
        <div className="h-[10%]">
            <div className="flex items-center gap-x-2 text-lg m-2"><img className="h-12 w-12 rounded-full" src={selectedUser?.photoUrl} alt="" />   <p >{selectedUser?.name}</p></div>
           
        </div>
         
        
      

      <div className="h-[80%]">
    <Chats response={response}  sender={user} reciver={selectedUser}></Chats>
      </div>

      <div className="h-[10%]">
      <form className="flex justify-center items-center m-2 gap-x-2" onSubmit={handleMessage}>
        <input name="message" className="w-full  px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-500" type="text" placeholder="type your message" />
        <button className="w-fit px-3 py-2 bg-blue-500 rounded-xl" type="submit">Send</button>
      </form>
      </div>
        </section>
    )
}

export default ChatArea;