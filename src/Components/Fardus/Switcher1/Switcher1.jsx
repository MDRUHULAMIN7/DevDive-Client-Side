import React, { useState, useEffect } from 'react';

const Switcher1 = () => {
  const [isDark, setIsDark] = useState(() => {
    // Retrieve theme preference from local storage or default to false (light theme)
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Save theme preference to local storage whenever it changes
    localStorage.setItem('theme', JSON.stringify(isDark));

    // Update HTML and body class based on the theme
    const html = document.documentElement;
    const body = document.body;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
      body.style.backgroundColor = '#0E1113'; // Set dark background color
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
      body.style.backgroundColor = '#ffffff'; // Set light background color
    }
  }, [isDark]);

  const handleCheckboxChange = () => {
    setIsDark(!isDark); // Toggle dark mode
  };

  return (
    <>
      <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isDark} // Reflect theme state in checkbox
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div className={`block h-8 w-14 rounded-full ${isDark ? 'bg-sec-color' : 'bg-[#E5E7EB]'}`}></div>
          <div
            className={`dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              isDark ? 'transform translate-x-full bg-black' : ''
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher1;
