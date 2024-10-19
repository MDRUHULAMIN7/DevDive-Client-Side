import { useEffect, useRef, useState } from "react";
import UseMessages from "../../../Hooks/UseMessages";
import ChatModal from "./ChatModal";
import MessageDisplay from "./MessageDisplay";
import { FaArrowDown } from "react-icons/fa";

const Chats = ({ reciver, sender, response }) => {
  const [messages, setMessages] = useState([]);
  const [messagesData, isLoading, chatRef] = UseMessages({ reciver, sender });
  const [openModalId, setOpenModalId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null); // Reference for the chat container
  const [showScrollButton, setShowScrollButton] = useState(false); // State to show scroll button

  useEffect(() => {
    if (messagesData?.length || response || isLoading) {
      setMessages(messagesData);
    }
  }, [messagesData, response, isLoading]);
   // Handle scroll event
   const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      // Show button if scrolled up
      setShowScrollButton(scrollTop + clientHeight < scrollHeight);
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false); // Hide the button after scrolling
  };

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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
   
      <div
        ref={chatContainerRef}
        className="flex flex-col space-y-20"
        style={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
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
           <div ref={messagesEndRef} />
      </div>

      {showScrollButton && (
       <button
       onClick={scrollToBottom}
       className="fixed bottom-20 left-1/2 lg:left-2/3 transform -translate-x-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg"
       style={{ zIndex: 1000 }} // Ensure button is on top
     >
       <FaArrowDown />

     </button>
      )}
    </section>
  );
};

export default Chats;