import React from 'react';
import loaderimg from '../../../assets/logo.png';

const DevLoader = () => {
    return (
            <div className="loader-container bg-white dark:bg-themeColor max-w-screen max-h-screen">
            <div className="pulse-animation">
                <img src={loaderimg} alt="Loader Image" className='translate-y-[-50%]'/>
            </div>
        </div>
    );
};

export default DevLoader;
