import React, { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(language);


  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

   // Handle language selection
   const handleSelect = (lang) => {
    setSelectedLanguage(lang); // Set selected language
    onSelect(lang); // Call onSelect prop to update the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  // const handleChange = (event) => {
  //   setOption(event.target.value); 
  // };

  return (
    <div>
      <h2 className="mx-2 my-4 font-semibold text-lg">Language: </h2>

      <button 
      onClick={toggleDropdown}
      className="mx-2 mb-3 w-40 p-2 border-2 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
      >
      {selectedLanguage ? selectedLanguage : "Select Language"}
      </button>

       {/* Dropdown menu */}
       {isOpen && (
        <div className="absolute z-10 mx-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800">
          <ul className="py-1">
            {languages.map(([lang, version]) => (
              <li key={lang}>
                <button
                  onClick={() => handleSelect(lang)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
                >
                  {lang} &nbsp; {version}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;



{/* <option value="" disabled selected>
          Select
        </option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="c">C</option>
        <option value="cpp">Cpp</option>
        <option value="csharp">C#</option> */}