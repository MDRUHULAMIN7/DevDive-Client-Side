import { useState } from 'react';
import axios from 'axios';

const Bot2 = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskZini = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/zini/api/gemini', { prompt });
      setResponse(formatResponse(data.response));
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setResponse("Sorry, I couldn't generate a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text) => {
    return text
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>') // H2 headings
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>') // H3 headings
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/_(.*?)_/g, '<em>$1</em>') // Italic text
      .replace(/^\* (.*?)$/gm, '<ul><li>$1</li></ul>') // Unordered lists
      .replace(/^- (.*?)$/gm, '<ul><li>$1</li></ul>') // Alt unordered lists
      .replace(/^\d+\.\s(.*?)$/gm, '<ol><li>$1</li></ol>') // Ordered lists
      .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>') // Blockquotes
      .replace(/(?:\r\n|\r|\n)/g, '<br />'); // Line breaks
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-4">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold mb-2">Welcome to Zini AI</h1>
        <p className="mt-2 text-lg max-w-lg mx-auto">
          Your intelligent assistant for all queries!
        </p>
      </header>

      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Get Started</h2>
        <p className="mb-6">
          Ask Zini anything! Whether it's generating stories, answering questions, or just having a chat, Zini is here to help.
        </p>

        <input
          type="text"
          placeholder="Type your prompt here..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-700"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className={`w-full mt-4 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 rounded-lg transition duration-300`}
          onClick={handleAskZini}
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Ask Zini'}
        </button>

        {response && (
          <div className="mt-6 p-6 bg-gray-100 text-gray-800 rounded-lg shadow-md transition duration-300">
            <h3 className="font-semibold text-lg">Zini's Response:</h3>
            <div className="mt-4 prose prose-indigo max-w-none" dangerouslySetInnerHTML={{ __html: response }} />
          </div>
        )}
      </div>

      <footer className="mt-8 text-center">
        <p className="text-sm">Powered by DevQuery</p>
        <p className="text-xs">© {new Date().getFullYear()} DevQuery Inc.</p>
      </footer>
    </div>
  );
};

export default Bot2;
