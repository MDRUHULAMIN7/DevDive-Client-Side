
import DOMPurify from "dompurify";

const formatMessage = (message) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const formattedMessage = message && message?.replace(urlPattern, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="underline">${url}</a>`;
  });
  return formattedMessage;
};

const MessageDisplay = ({ message }) => {

  console.log(message)
  const safeMessage = DOMPurify.sanitize(formatMessage(message.message));

  return (
    <div
      dangerouslySetInnerHTML={{ __html: safeMessage }}
      className="whitespace-pre-wrap break-words h-full"
    />
  );
};

export default MessageDisplay;
