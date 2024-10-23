import DOMPurify from "dompurify";
import { useEffect, useRef } from "react";

const formatMessage = (message) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  return (
    message &&
    message.replace(urlPattern, (url) => {
      const isRoomLink = url.includes("/room/");
      if (isRoomLink) {
        return `<button 
                  class="join-button px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
                  font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-indigo-500 
                  hover:to-blue-600 transition-all duration-300 ease-in-out"
                  data-url="${url}">
                  Join Now
                </button>`;
      }
      // Default case: render as a hyperlink
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline">${url}</a>`;
    })
  );
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const timeDiff = Math.floor((now - date) / 60000);

  if (timeDiff < 2) return "Now";

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const isCurrentYear = date.getFullYear() === now.getFullYear();
  const options = isCurrentYear
    ? { month: "long", day: "numeric" }
    : { year: "numeric", month: "long", day: "numeric" };

  return date.toLocaleDateString([], options);
};

const MessageDisplay = ({ message }) => {
  const messageRef = useRef(null);

  useEffect(() => {
    const buttons = messageRef.current?.querySelectorAll(".join-button");
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        const url = button.getAttribute("data-url");
        window.open(url, "_blank");
      })
    );

    return () => {
      buttons.forEach((button) =>
        button.removeEventListener("click", () => {})
      );
    };
  }, [message]);

  const safeMessage = DOMPurify.sanitize(formatMessage(message.message));
  const formattedTimestamp = message.timestamp
    ? formatTimestamp(message.timestamp)
    : "Unknown time";

  return (
    <div
    title={formattedTimestamp}
      ref={messageRef}
      className="group relative whitespace-pre-wrap break-words h-full pb-0  transition-all duration-200 ease-in-out"
    >
     
      <div dangerouslySetInnerHTML={{ __html: safeMessage }} /> 

      
    </div>
  );
};

export default MessageDisplay;
