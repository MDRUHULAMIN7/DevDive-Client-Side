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
  const chatContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null); // Track hovered message

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

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      scrollToBottom();
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [messages]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      setShowScrollButton(!atBottom);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <p className="flex justify-center items-center my-10 text-xl font-medium">
        Loading messages...
      </p>
    );
  }

  return (
    <section className="flex flex-col h-full p-2 md:p-4 overflow-y-auto hide-scrollbar">
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
        className="flex flex-col space-y-10"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.senderEmail === sender.email ? "justify-end" : "justify-start"
              }`}
              onMouseEnter={() => setHoveredMessageId(index)} // Track hover
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              <div
                className={`relative flex items-start ${
                  message.senderEmail === sender.email
                    ? "flex-row-reverse md:gap-3 gap-x-1"
                    : "md:gap-3 gap-x-1"
                }`}
              >
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
                    } max-w-xs md:max-w-md`}
                    style={{ position: "relative" }}
                  >
                    <p className="whitespace-pre-wrap break-words h-full">
                      <MessageDisplay message={message} />
                    </p>

                    {sender?.email === message?.senderEmail &&
                      hoveredMessageId === index && ( // Show on hover only
                        <div
                          style={{
                            zIndex:1000,
                            position: "absolute",
                            top: "50%",
                            right: message.senderEmail === sender.email ? "100%" : "auto",
                            left: message.senderEmail !== sender.email ? "100%" : "auto",
                            transform: "translateY(-50%)",
                          }}
                        >
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
          className="fixed bottom-20 left-1/2 lg:left-2/3 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          style={{
            boxShadow: "0 0 15px 5px rgba(59, 130, 246, 0.6)",
            animation: "pulse-glow 2s infinite",
          }}
        >
          <FaArrowDown size={12} />
        </button>
      )}

      <style>
        {`
          @keyframes pulse-glow {
            0% {
              box-shadow: 0 0 10px 2px rgba(59, 130, 246, 0.5);
            }
            50% {
              box-shadow: 0 0 20px 8px rgba(59, 130, 246, 0.7);
            }
            100% {
              box-shadow: 0 0 10px 2px rgba(59, 130, 246, 0.5);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Chats;
