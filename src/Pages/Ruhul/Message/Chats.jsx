import { useEffect, useState } from "react";
import UseMessages from "../../../Hooks/UseMessages";

const Chats = ({ reciver, sender,response }) => {
  const [messages, setMessages] = useState([]);
  const [messagesData, isLoading, refetch] = UseMessages({ reciver, sender });


 
  // Use `useEffect` to update state when new messages are fetched
  useEffect(() => {
    if (messagesData?.length) {
      setMessages(messagesData);
    }
  }, [messagesData]); // Run only when `messagesData` changes

  // Optionally, you can call `refetch` when needed
  useEffect(() => {
    if (reciver && sender || response) {
      refetch();
    }
  }, [reciver, sender, refetch,response]);

  if (isLoading) {
    return (
      <p className="flex justify-center items-center my-10 text-xl font-medium">
        Loading messages...
      </p>
    );
  }

  if (!messages.length) {
    return (
      <p className="flex justify-center items-center my-10 text-xl font-medium">
        No messages yet
      </p>
    );
  }

  return (
    <section className="p-2 md:p-4">
     <div className="flex flex-col space-y-4 ">
     { messages && messages?.map((message) => (
        <div className={`${message.senderEmail === sender.email && 'flex justify-end ' }  `} key={message._id}>

            <div className={`${message.senderEmail === sender.email && 'flex flex-row-reverse gap-2 ' || ' flex-row flex gap-2' }  `}>
            <div className=" "><img className="h-10 rounded-full" src={message.senderPhoto} alt="" /></div> 
            
             <div className={`${message.senderEmail === sender.email && 'bg-blue-500 p-2 rounded-md  ' || ' bg-gray-500 p-2 rounded-md' }  `}  >
                
                <p>{message.message}</p></div>
            </div>
            </div>
        
      ))}
     </div>
    </section>
  );
};

export default Chats;
