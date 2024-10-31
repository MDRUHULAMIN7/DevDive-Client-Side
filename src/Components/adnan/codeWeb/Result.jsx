import React, { useEffect, useState } from "react";

const Result = ({ srcCode }) => {
  const [theme, setTheme] = useState("dark");

  // Detect theme from the HTML class
  useEffect(() => {
    const checkTheme = () => {
      // Check if the 'dark' class is present on the html or body tag
      if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    // Initial check
    checkTheme();

    // Optional: Observe changes to the HTML class (if toggling between dark/light mode in the app)
    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div className="">
      <div
        className={`${
          theme === "dark" ? "bg-[#282c34]" : "bg-white"
        } p-4 rounded-lg shadow`}
      >
        <h2
          className={`text-lg font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Result
        </h2>
        <iframe
          className="w-full h-60 border border-gray-700 rounded-md"
          srcDoc={srcCode}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
};
// bg-[#282c34]
export default Result;
