import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";

import Chats from "./Chats";
import VideoButton from "./VideoButton";


const ChatArea=({selectedUser})=>{
  const [meetingLink,setMeetingLink] = useState(""); // Store the meeting link

  console.log(meetingLink)
  const {user}=UseAuth();

  // Send a message automatically when the meeting link changes
  useEffect(() => {
    if (meetingLink && selectedUser && user) {
      const message = meetingLink;
      const messageInfo = {
        senderName: user.displayName,
        senderEmail: user.email,
        senderPhoto: user.photoURL,
        message,
        timestamp: new Date(),
        receiverName: selectedUser.name,
        receiverEmail: selectedUser.email,
        receiverPhoto: selectedUser.photoUrl,
      };

      axiosPublic.post("/messages", messageInfo)
        .then((res) => {
          console.log("Meeting link message sent:", res.data);
          setResponse('r'); // Update response state
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
  }, [meetingLink, selectedUser, user]);

//   useEffect(()=>{
//   const message = meetingLink;
//   const messageInfo={
//     senderName : user.displayName,
//     senderEmail : user.email,
//     senderPhoto : user.photoURL,
//     message,
//     timestamp : new Date(),
//     receiverName : selectedUser.name,
//     receiverEmail : selectedUser.email,
//     receiverPhoto : selectedUser.photoUrl,
// }

// if (meetingLink && messageInfo){
//   axiosPublic.post('/messages',messageInfo)
//         .then(res=>{
//              console.log(res.data)
            
//          setResponse('r')
 
//         }).catch(err=>{
//              console.log(err)
//          })
// }

//   },[meetingLink,setMeetingLink])

const [response,setResponse]=useState([])
const handleMessage=(e)=>{
    e.preventDefault()
    const form = e.target;
  setResponse([])
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
             form.reset();
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
        <section className= "w-full p-4 h-screen flex flex-col justify-between">

          
     
        <div className="h-fit flex justify-between">

            <div className="flex items-center gap-x-2 text-lg m-2"><img className="h-12 w-12 rounded-full" src={selectedUser?.photoUrl} alt="" />   <p >{selectedUser?.name}</p>
            
            </div>

            <div> 
              <VideoButton meetingLink={meetingLink} setMeetingLink={setMeetingLink} user={user} selectedUser={selectedUser}></VideoButton>
             
            </div>


           
        </div>
         
        
      

      <div className="overflow-y-auto">
    <Chats response={response}  sender={user} reciver={selectedUser}></Chats>
      </div>

      <div className="text-end flex flex-col h-fit justify-end">
      <form className="flex justify-center items-center m-2 gap-x-2" onSubmit={handleMessage}>
        <input name="message" className="w-full  px-3 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-500" type="text" placeholder="type your message" />
        <button className="w-fit px-3 py-2 bg-blue-500 rounded-xl" type="submit">Send</button>
      </form>
      </div>
        </section>
    )
}

export default ChatArea;