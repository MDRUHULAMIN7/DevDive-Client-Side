import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../constants.js";
import Output from "./Output.jsx";
import { ToastContainer } from "react-toastify";

const CodeEditor = () => {
  const editorRef = useRef();
  const [theme, setTheme] = useState("vs-dark");
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

   // Detect theme from the HTML class
   useEffect(() => {
    const checkTheme = () => {
      // Check if the 'dark' class is present on the html or body tag
      if (document.documentElement.classList.contains("dark")) {
        setTheme("vs-dark");
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

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    console.log("Selected Language:", language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="min-h-full flex flex-col lg:flex-row gap-2">
      <div className="w-full lg:w-11/12">
      <LanguageSelector language={language} onSelect={onSelect} className="mb-10"/>
      <Editor
        height="75vh"
        theme={theme} // Dynamically set the theme based on dark or light mode
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
      </div>
      <div className="w-full lg:w-11/12">
      <Output editorRef={editorRef} language={language}/>
      </div>
    </div>
  );
};

export default CodeEditor;
