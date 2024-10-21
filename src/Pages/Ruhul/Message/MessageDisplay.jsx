import DOMPurify from "dompurify";

const formatMessage = (message) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return (
    message &&
    message.replace(urlPattern, (url) => {
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
  const safeMessage = DOMPurify.sanitize(formatMessage(message.message));
  const formattedTimestamp = message.timestamp
    ? formatTimestamp(message.timestamp)
    : "Unknown time";

  return (
    <div className={`group relative whitespace-pre-wrap break-words h-full pb-0 group-hover:pb-6 transition-all duration-200 ease-in-out `}>
      <div dangerouslySetInnerHTML={{ __html: safeMessage }} />

     
      <p
        className="text-xs text-gray-400 h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
      >
        {formattedTimestamp}
      </p>
    </div>
  );
};

export default MessageDisplay;
