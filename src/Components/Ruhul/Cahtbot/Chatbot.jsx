import { useState } from 'react';

// Suggested questions for initial guidance
const suggestedQuestions = [
    "What is the purpose of this chatbot?",
    "How can I contact support?",
    "What services do you offer?",
    "How do I reset my password?"
];

// Simulated bot responses for demo purposes
const mockBotResponses = {
    "What is the purpose of this chatbot?": "The purpose of this chatbot is to assist users with common questions and tasks.",
    "How can I contact support?": "You can contact support by emailing support@example.com.",
    "What services do you offer?": "We offer a range of services including product support, troubleshooting, and more.",
    "How do I reset my password?": "To reset your password, go to the login page and click on 'Forgot Password'."
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (!userInput.trim()) return;

        // Add user message to chat
        setMessages([...messages, { sender: 'user', text: userInput }]);

        // Set loading state
        setLoading(true);

        setTimeout(() => {
            // Mocking a bot response
            const botReply = mockBotResponses[userInput] || "Sorry, I didn’t understand that. Please try rephrasing.";
            // Add bot response to chat
            setMessages(prev => [...prev, { sender: 'user', text: userInput }, { sender: 'bot', text: botReply }]);
            // Clear the input field and stop loading
            setUserInput('');
            setLoading(false);
        }, 1000); // Simulating a delay to mock API response time
    };

    const handleSuggestionClick = (suggestion) => {
        setUserInput(suggestion);
        handleSendMessage();
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Floating button to open chatbot */}
            <button
                onClick={toggleChatbot}
                className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
            >
                💬
            </button>

            {/* Chatbot Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Chat with us</h2>
                            <button onClick={toggleChatbot} className="text-red-500 font-bold">✖</button>
                        </div>

                        {/* Suggested Questions Section */}
                        <div className="bg-blue-50 p-4 rounded-lg shadow-lg mb-4">
                            <h2 className="text-lg font-bold">Suggested Questions</h2>
                            <div className="mt-2">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(question)}
                                        className="block text-blue-600 hover:underline mt-1"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="chatbot-messages h-64 overflow-y-scroll bg-gray-100 p-4 border rounded-lg">
                            {messages.map((message, index) => (
                                <div key={index} className={`message-${message.sender} p-2`}>
                                    <strong>{message.sender === 'user' ? 'You' : 'Bot'}:</strong> {message.text}
                                </div>
                            ))}
                            {loading && <div className="text-center mt-2">Loading...</div>}
                        </div>

                        {/* Input for Chat */}
                        <div className="chatbot-input mt-4 flex">
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleUserInput}
                                placeholder="Ask me something..."
                                className="flex-grow p-2 border rounded-lg"
                            />
                            <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
