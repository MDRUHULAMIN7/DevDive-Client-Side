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
  const timeDiff = Math.floor((now - date) / 60000); // Difference in minutes

  if (timeDiff < 2) return "Now"; // If the message was sent within the last 2 minutes

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    // If the message is from today, show only the time
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    // If the message is from a previous day, show the date in readable format
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

const MessageDisplay = ({ message }) => {
  console.log(message);

  const safeMessage = DOMPurify.sanitize(formatMessage(message.message));
  const formattedTimestamp = message.timestamp
    ? formatTimestamp(message.timestamp)
    : "Unknown time"; // Fallback if timestamp is missing

  return (
    <div className="whitespace-pre-wrap break-words h-full">
      <div dangerouslySetInnerHTML={{ __html: safeMessage }} />
      <p className="text-xs text-gray-400 mt-1">{formattedTimestamp}</p>
    </div>
  );
};

export default MessageDisplay;

