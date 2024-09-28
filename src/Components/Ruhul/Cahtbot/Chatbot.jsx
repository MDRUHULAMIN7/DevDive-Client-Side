import { useState } from 'react';

// Suggested questions and their static answers
const qaMap = {
    "What is JavaScript?": "JavaScript is a versatile programming language primarily used for web development.",
    "What is React?": "React is a JavaScript library for building user interfaces, developed by Facebook.",
    "What is HTML?": "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
    "What is CSS?": "CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a document written in HTML.",
    "What is a variable in JavaScript?": "A variable is a named storage location that holds a value in JavaScript.",
    "What is an API?": "An API (Application Programming Interface) is a set of rules and protocols for building and interacting with software applications.",
    "What is a function in programming?": "A function is a block of code designed to perform a specific task, executed when called.",
    "What is Node.js?": "Node.js is a JavaScript runtime built on Chrome's V8 engine, allowing JavaScript to be run on the server side.",
    "What is the DOM?": "The DOM (Document Object Model) is a programming interface that represents the structure of a document as a tree of objects.",
    "What is JSON?": "JSON (JavaScript Object Notation) is a lightweight data interchange format that's easy for humans to read and write.",
    "What is the purpose of the 'this' keyword in JavaScript?": "The 'this' keyword refers to the object it belongs to, and its value depends on the context in which it is used.",
    "What is the difference between 'let' and 'var'?": "'let' has block scope, while 'var' has function scope.",
    "What are JavaScript closures?": "Closures are functions that have access to their outer function scope even when the function is executed outside that scope.",
    "What is the event loop in JavaScript?": "The event loop is a mechanism that allows JavaScript to perform non-blocking operations by managing asynchronous code.",
    "What are promises in JavaScript?": "Promises are objects that represent the eventual completion or failure of an asynchronous operation.",
    "What is the 'fetch' API?": "The 'fetch' API is a modern interface for making network requests in JavaScript.",
    "What is the difference between synchronous and asynchronous code?": "Synchronous code executes sequentially, while asynchronous code allows other operations to continue while waiting for a task to complete.",
    "What is a React component?": "A React component is a reusable piece of UI that can manage its own state and render itself based on that state.",
    "What is JSX?": "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in React.",
    "What are props in React?": "Props (properties) are inputs to React components that allow data to be passed from parent to child components.",
    "What is state in React?": "State is a built-in object that allows components to manage their own data and respond to user interactions.",
    "What is the purpose of React Router?": "React Router is a library for routing in React applications, enabling navigation between different components based on URL paths.",
    "What are hooks in React?": "Hooks are special functions in React that allow you to use state and other React features without writing a class.",
    "What is the use of 'useEffect' hook?": "'useEffect' is a hook that allows you to perform side effects in functional components, like data fetching.",
    "What is Redux?": "Redux is a state management library for JavaScript applications, often used with React to manage application state.",
    "What is middleware in Redux?": "Middleware in Redux is a way to extend Redux's abilities, allowing for custom logic during the dispatch process.",
    "What is a controlled component in React?": "A controlled component is an input element whose value is controlled by React state.",
    "What is the purpose of 'key' prop in React?": "The 'key' prop helps React identify which items have changed, are added, or are removed in a list.",
    "What is a higher-order component (HOC)?": "A higher-order component is a function that takes a component and returns a new component, enabling code reuse.",
    "What is the use of 'React.memo'?": "'React.memo' is a higher-order component that prevents unnecessary re-renders of a component when its props do not change.",
    "What is the difference between stateful and stateless components?": "Stateful components manage their own state, while stateless components do not and are primarily used for rendering UI.",
    "What is the purpose of 'useContext' hook?": "'useContext' allows you to access the context API and share data between components without passing props explicitly.",
    "What are controlled and uncontrolled components?": "Controlled components have their value controlled by state, while uncontrolled components manage their own state via the DOM.",
    "What is the virtual DOM?": "The virtual DOM is a lightweight representation of the actual DOM that React uses to optimize rendering performance.",
    "What is component lifecycle in React?": "Component lifecycle refers to the sequence of events in a component's existence, including mounting, updating, and unmounting.",
    "What is the purpose of 'useRef' hook?": "'useRef' is a hook that allows you to create mutable object references that persist for the full lifetime of a component.",
    "What are React fragments?": "Fragments allow you to group multiple elements without adding an extra node to the DOM.",
    "What is the difference between 'map' and 'forEach'?": "'map' returns a new array with transformed elements, while 'forEach' executes a function on each element without returning anything.",
    "What is a responsive web design?": "Responsive web design is an approach to web design that makes web pages render well on various devices and window sizes.",
    "What is CSS Flexbox?": "CSS Flexbox is a layout module that allows for the design of complex layouts with ease using flexible container properties.",
    "What is CSS Grid?": "CSS Grid is a layout system that provides a two-dimensional grid-based layout approach to arrange elements on a webpage.",
    "What are media queries in CSS?": "Media queries are a CSS feature that allows you to apply styles based on the device's characteristics, such as screen width.",
    "What is the box model in CSS?": "The box model describes how elements on a webpage are structured, consisting of margins, borders, padding, and the content area.",
    "What are CSS transitions?": "CSS transitions allow you to change property values smoothly (over a given duration) from one state to another.",
    "What is a CSS preprocessor?": "A CSS preprocessor extends CSS with variables, nesting, and mixins, making CSS easier to write and maintain.",
    "What is Bootstrap?": "Bootstrap is a popular CSS framework for developing responsive and mobile-first websites.",
    "What is Tailwind CSS?": "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs quickly.",
    "What is a web framework?": "A web framework is a software framework that is designed to aid the development of web applications including web services.",
    "What is the purpose of SEO?": "SEO (Search Engine Optimization) is the practice of improving the quality and quantity of website traffic from search engines.",
    "What is HTTPS?": "HTTPS (HyperText Transfer Protocol Secure) is an extension of HTTP that provides secure communication over a computer network.",
    "What are web cookies?": "Cookies are small pieces of data stored on the client side to track user sessions and preferences.",
    "What is local storage?": "Local storage is a web storage mechanism that allows websites to store data persistently in the user's browser.",
    "What is session storage?": "Session storage is similar to local storage but is cleared when the page session ends.",
    "What are web APIs?": "Web APIs are interfaces that allow interaction between web applications and various services over the internet.",
    "What is CORS?": "CORS (Cross-Origin Resource Sharing) is a security feature that allows or restricts resources requested from a different origin.",
    "What is a REST API?": "A REST API (Representational State Transfer API) is an architectural style for designing networked applications.",
    "What is GraphQL?": "GraphQL is a query language for APIs that allows clients to request only the data they need.",
    "What is a single-page application (SPA)?": "A single-page application is a web application that loads a single HTML page and dynamically updates as the user interacts with the app.",
    "What is server-side rendering (SSR)?": "Server-side rendering is the process of rendering web pages on the server instead of the client, improving performance and SEO.",
    "What is client-side rendering (CSR)?": "Client-side rendering is the process where the browser renders web pages dynamically using JavaScript.",
    "What is a web server?": "A web server is a system that stores and serves web content to users over the internet.",
    "What is a database?": "A database is an organized collection of structured information or data, typically stored electronically in a computer system.",
    "What is SQL?": "SQL (Structured Query Language) is a standardized programming language used to manage and manipulate relational databases.",
    "What is NoSQL?": "NoSQL is a class of database management systems that do not use SQL as their primary interface, allowing for flexible data models.",
    "What is a domain name?": "A domain name is a human-readable address used to identify a location on the internet.",
    "What is web hosting?": "Web hosting is a service that allows individuals and organizations to post a website or web page on the internet.",
    "What is the purpose of web analytics?": "Web analytics is the measurement, collection, analysis, and reporting of web data to understand and optimize web usage.",
    "What is an SSL certificate?": "An SSL certificate is a digital certificate that provides authentication for a website and enables an encrypted connection.",
    "What is a content management system (CMS)?": "A CMS is software that allows users to create, manage, and modify content on a website without specialized technical knowledge."
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Toggle the chatbot visibility
    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    // Handle user input changes
    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    // Handle sending user messages
    const handleSendMessage = () => {
        if (!userInput) return;

        const userMessage = { text: userInput, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);
        
        // Simulate bot response after 1 second
        setTimeout(() => {
            const botResponse = { text: "I don't understand. Try asking something else.", sender: 'bot' };
            setMessages((prev) => [...prev, botMessage]);
            setLoading(false);
        }, 1000);

        setUserInput('');
    };

    // Handle clicking a suggested question
    const handleSuggestionClick = (question) => {
        setUserInput(question);
        handleSendMessage();
    };

    return (
        <div>
            {/* Button to toggle chatbot */}
            <button onClick={toggleChatbot} className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition">
                Chatbot
            </button>
            
            {/* Chatbot UI */}
            {isOpen && (
                <div className="fixed bottom-20 right-5 bg-white border rounded-lg shadow-lg p-4 w-80">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold mb-2">Chatbot</h2>
                        <div className="mb-4">
                            {/* Suggested Questions */}
                            <div className="mb-2">
                                <h3 className="font-semibold">Suggested Questions:</h3>
                                {Object.keys(qaMap).map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(question)}
                                        className="mr-2 mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Messages Display Section */}
                        <div className="h-64 overflow-y-auto mb-4 border p-2 rounded-lg">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                        {msg.text}
                                    </span>
                                </div>
                            ))}
                            {loading && (
                                <div className="text-left mb-2">
                                    <span className="inline-block p-2 bg-gray-300 text-black rounded-lg">Loading...</span>
                                </div>
                            )}
                        </div>

                        {/* Input Section */}
                        <div className="flex">
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleUserInput}
                                className="border border-gray-300 rounded-lg p-2 flex-grow mr-2"
                                placeholder="Type your question..."
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
