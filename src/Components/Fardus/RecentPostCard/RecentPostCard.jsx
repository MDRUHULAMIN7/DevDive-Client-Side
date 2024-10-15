import React from 'react';
import { BsCloudFog } from 'react-icons/bs';
import PostComponent from '../../Ruhul/Card-Ruhul/PostComponent';
import { Link } from 'react-router-dom';

const RecentPostCard = ({ post }) => {

    return (
        <Link to={`/post-details/${post._id}`}>
            <div className='shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300'>
                {post.images.length > 0 && <img className="w-full h-32 object-cover rounded-t-lg" src={post?.images[0]} alt="Post 1" />}
                <div className="bg-white dark:bg-gray-900 p-5 rounded-b-lg">
                    <div className='mb-4'>
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 object-cover rounded-full'>
                                <img src={post?.profilePicture} alt="" className='w-10 h-10 object-cover rounded-full' />
                            </div>
                            <div>
                                <h3 className='text-xs mb-1 font-semibold'>{post?.username}</h3>
                                <span className="block text-gray-500 dark:text-gray-400 text-xs"><PostComponent data={post}></PostComponent></span>
                            </div>
                        </div>

                    </div>

                    <h3 className=" font-bold text-gray-800 dark:text-white mb-2">{post.title}</h3>

                </div>
            </div>
        </Link>
    );
};

export default RecentPostCard;