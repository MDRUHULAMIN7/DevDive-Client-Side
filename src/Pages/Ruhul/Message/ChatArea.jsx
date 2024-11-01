import { useEffect, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { axiosPublic } from "../../../Hooks/useAxiosPublic";
import Chats from "./Chats";
import VideoButton from "./VideoButton";
import UseMessages from "../../../Hooks/UseMessages";

const ChatArea = ({ selectedUser}) => {
  const [meetingLink, setMeetingLink] = useState("");
  const { user } = UseAuth();
  const [response, setResponse] = useState([]);
  const [, , chatRef] = UseMessages({ sender: user, reciver: selectedUser });

  
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

      axiosPublic
        .post("/messages", messageInfo)
        .then((res) => {
          console.log("Meeting link message sent:", res.data);
          setResponse("r"); // Trigger message refetch
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
  }, [meetingLink, selectedUser, user]);

  const handleMessage = async (e) => {
    e.preventDefault();
    const form = e.target;
    setResponse([]);
    const message = e.target.message.value;

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

    if (messageInfo.senderPhoto && message) {
      console.log(messageInfo);
      await axiosPublic
        .post("/messages", messageInfo)
        .then((res) => {
          chatRef(); 
          if (res.data) {
            form.reset();
            setResponse("r"); 
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };



  return (
    <section className="w-full  p-4 flex flex-col h-[calc(100vh-56px)]">
 
      <div className="flex justify-between items-center px-10 lg:px-0 pb-2 border-b-2 ">
        <div className="flex items-center gap-x-2">
          <img
            className="h-12 w-12 rounded-full"
            src={selectedUser?.photoUrl || 'https://res.cloudinary.com/dpomtzref/image/upload/v1729587017/User_icon_2.svg_jjnimz.png'}
            alt="photo"
          />
          <p>{selectedUser?.name}</p>
        </div>
        <VideoButton
          meetingLink={meetingLink}
          setMeetingLink={setMeetingLink}
          user={user}
          selectedUser={selectedUser}
        />
      </div>

      {/* Chats Section */}
      <div className="flex-grow overflow-y-auto mt-4 mb-2">
        <Chats response={response} sender={user} reciver={selectedUser} />
      </div>

      {/* Input Section */}
      <form
  className="flex items-center gap-x-2 ml-8 lg:ml-0"
  onSubmit={handleMessage}
>
  <input
    name="message"
    className="flex-grow px-3 py-2 rounded-xl placeholder:text-gray-800 dark:placeholder:text-gray-300 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-600  dark:focus:outline-none focus:outline-none dark:focus:ring-1 focus:ring-1 dark:focus:ring-blue-500 focus:ring-blue-900 transition-all"
    type="text"
    placeholder="Type your message"
  />
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
    type="submit"
  >
    Send
  </button>
</form>

    </section>
  );
};

export default ChatArea;