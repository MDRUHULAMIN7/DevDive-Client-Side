import React from 'react';

const RecentPostCard = () => {
    return (
        <div>
            <div className='shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300'>
                <img className="w-full h-32 object-cover rounded-t-lg" src="https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg=" alt="Post 1" />
                <div className="bg-white dark:bg-gray-900 p-5 rounded-b-lg">

                    <h3 className=" font-bold text-gray-800 dark:text-white mb-2"> Why You Should Learn JavaScript in 2024</h3>
                    <span className="block text-gray-500 dark:text-gray-400 text-xs">September 20, 2024</span>
                </div>
            </div>
        </div>
    );
};

export default RecentPostCard;