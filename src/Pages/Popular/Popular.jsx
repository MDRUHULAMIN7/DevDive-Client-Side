import React from 'react';
import { Helmet } from 'react-helmet';

const Popular = () => {
    return (
        <div>
            <Helmet>
                <title>DevDive | Popular</title>
            </Helmet>
            <div className="h-[500px] bg-red-200"></div>
            <div className="h-[500px] bg-green-200"></div>
            <div className="h-[500px] bg-blue-200"></div>
            <div className="h-[500px] bg-gray-200"></div>
        </div>
    );
};

export default Popular;