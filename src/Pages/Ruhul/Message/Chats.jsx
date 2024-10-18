import { useEffect, useState } from "react";
import UseMessages from "../../../Hooks/UseMessages";
import ChatModal from "./ChatModal";
import MessageDisplay from "./MessageDisplay";

const Chats = ({ reciver, sender, response }) => {
  const [messages, setMessages] = useState([]);
  const [messagesData, isLoading, chatRef] = UseMessages({ reciver, sender });
  const [openModalId, setOpenModalId] = useState(null);

  useEffect(() => {
    if (messagesData?.length || response || isLoading) {
      setMessages(messagesData);
    }
  }, [messagesData, response, isLoading]);

  useEffect(() => {
    if (messagesData?.length || response || isLoading) {
      chatRef();
    }
  }, [messagesData, response, chatRef, isLoading]);

  if (isLoading) {
    return (
      <p className="flex justify-center items-center my-10 text-xl font-medium">
        Loading messages...
      </p>
    );
  }

  return (
    <section className="flex flex-col h-full p-2 md:p-4 overflow-y-auto  hide-scrollbar">
      <style>{`
          .hide-scrollbar {
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      <div className="flex flex-col space-y-20">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.senderEmail === sender.email
                  ? "justify-end"
                  : "justify-start"
              }`}>
              <div
                className={`relative flex items-start ${
                  message.senderEmail === sender.email
                    ? "flex-row-reverse md:gap-3 gap-x-1"
                    : "md:gap-3 gap-x-1"
                }`}>
                <img
                  className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
                  src={message.senderPhoto}
                  alt={message.senderEmail}
                />
                <div className="flex flex-col">
                  <div
                    className={`md:p-3 p-1 rounded-lg shadow-md text-sm ${
                      message.senderEmail === sender.email
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    } max-w-xs md:max-w-md`}>
                    <p className="whitespace-pre-wrap break-words h-full">
                      <MessageDisplay message={message} />
                    </p>
                  </div>
                </div>
                {sender?.email === message?.senderEmail && (
                  <div>
                    <ChatModal
                      message={message}
                      sender={sender}
                      openModalId={openModalId}
                      setOpenModalId={setOpenModalId}
                      refetch={chatRef}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-900">No messages yet</p>
        )}
      </div>
    </section>
  );
};

export default Chats;
