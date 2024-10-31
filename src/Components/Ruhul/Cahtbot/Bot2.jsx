import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";

const Bot2 = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const chatContainerRef = useRef(null);

 
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

    setIsUserScrolling(scrollHeight - scrollTop > clientHeight + 10);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

 
  useEffect(() => {
    if (!isUserScrolling && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer,isUserScrolling]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); 
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_AIAPI}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"];
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
    setIsUserScrolling(false); 
  }

  return (
    <div className="bg-gradient-to-r h-[calc(100vh-56px)] from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div className="h-full max-w-4xl mx-auto flex flex-col p-3">
       <Helmet>
        <title>DevDive | DevAI</title>
       </Helmet>
        <header className="text-center py-4">
          <a
            href="https://github.com/Vishesh-Pandey/chat-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <h1 className="text-4xl font-bold text-blue-500 hover:text-blue-600 dark:text-blue-300 transition-colors">
              Dev AI
            </h1>
          </a>
        </header>

        
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-lg bg-white shadow-lg p-1 md:p-4 dark:bg-gray-800 hide-scrollbar"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-blue-50 rounded-xl p-8 max-w-2xl dark:bg-gray-700">
                <h2 className="text-2xl font-bold text-blue-600 mb-4 dark:text-blue-300">
                  Welcome to Dev AI! 
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Iam here to help you with anything you would like to know. You can ask me about:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-600">
                    <span className="text-blue-500"></span> General knowledge
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-600">
                    <span className="text-blue-500"></span> Technical questions
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-600">
                    <span className="text-blue-500"></span> Writing assistance
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-600">
                    <span className="text-blue-500"></span> Problem solving
                  </div>
                </div>
              </div>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div key={index} className={`mb-4 ${chat.type === "question" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block max-w-[80%] p-3 rounded-lg overflow-auto hide-scrollbar ${
                    chat.type === "question"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <ReactMarkdown className="overflow-auto hide-scrollbar">{chat.content}</ReactMarkdown>
                </div>
              </div>
            ))
          )}
          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-gray-100 dark:bg-gray-700 p-3 rounded-lg animate-pulse">
              DevAI Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={generateAnswer} className="bg-white rounded-lg shadow-lg p-2 md:p-4 dark:bg-gray-800">
          <div className="flex gap-2">
            <textarea
              required
              className="flex-1 border border-gray-300 rounded  p-2  focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask DevAI Anything..."
              rows="1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 ${
                generatingAnswer ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bot2;
