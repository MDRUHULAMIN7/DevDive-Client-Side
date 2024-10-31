import React, { useEffect, useState } from 'react'
import { useCallback } from "react";
import Result from './Result';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

const CodeWeb = () => {
  //* create three usestate 
  const [html_edit, setHtml_Edit] = useState('');
  const [css_edit, setCss_Edit] = useState('');
  const [js_edit, setJs_Edit] = useState('');
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

  console.log(theme);

  //* Html onchange handler 
  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  //* Css onchange handler 
  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  //* JavaScript onchange handler 
  const onChangeJavaScript = useCallback((value) => {
    setJs_Edit(value);
  }, []);

   //* Create Html Document
   const srcCode = `
   <html>
   <body>${html_edit}</body>
   <style>${css_edit}</style>
   <script>${js_edit}</script>
   </html>
   `

  return (
    <div>
      {/* main content  */}
      <div className=" p-2">
        {/* Editor  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
         {/* Html Editor */}
          {/* <div className="bg-[#282c34] p-4 rounded-lg shadow"> */}
          <div className={`${theme === "dark" ? "bg-[#282c34]" : "bg-white"} p-4 rounded-lg shadow`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>HTML</h2>
          {/* <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2> */}
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={html_edit}
              height="342px"
              theme={theme}
              extensions={[html(true)]}
              onChange={onChangeHtml}
            />
          </div>
          {/* Css Editor  */}
          <div className={`${theme === "dark" ? "bg-[#282c34]" : "bg-white"} p-4 rounded-lg shadow`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>CSS</h2>
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={css_edit}
              height="342px"
              theme={theme}
              extensions={[css(true)]}
              onChange={onChangeCss}
            />
          </div>
          {/* JavaScript Editor  */}
          <div className={`${theme === "dark" ? "bg-[#282c34]" : "bg-white"} p-4 rounded-lg shadow`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>JavaScript</h2>
            <CodeMirror
              className="text-xl border-gray-700 border"
              value={js_edit}
              height="342px"
              theme={theme}
              extensions={[javascript(true)]}
              onChange={onChangeJavaScript}
            />
          </div>
        </div>
      </div>

      {/* Result  */}
      <Result
          srcCode={srcCode}
        />
    </div>
  );
};

export default CodeWeb;