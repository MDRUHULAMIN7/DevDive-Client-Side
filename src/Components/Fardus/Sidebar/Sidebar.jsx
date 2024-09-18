import React from 'react';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { MdBarChart } from 'react-icons/md';
import { RiUserFollowFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const Sidebar = ({setOpenMenu, openMenu}) => {



    return (


            <aside className={`fixed flex-col w-64 lg:translate-x-0 ${openMenu ? "translate-x-0 duration-200 ease-in-out":"translate-x-[-256px] duration-200 ease-in-out"} h-[calc(100vh-68px)] overflow-y-scroll px-4 py-8 dark:bg-themeColor border-r dark:border-gray-700 rtl:border-r-0 rtl:border-l mt-[1px]`}>

                <div className="flex flex-col justify-between flex-1">
                    <nav>
                        <NavLink className="flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white" href="#">
                        <IoMdHome className='text-lg'/>

                            <span className="mx-3 font-medium text-sm">Home</span>
                        </NavLink>

                        <a className="flex items-center px-4 py-2 mt-5 rounded-md duration-200 hover:bg-pm-color hover:text-white" href="#">
                           
                        <FaArrowTrendUp className='text-lg'/>
                            <span className="mx-4 font-medium text-sm">Popular</span>
                        </a>

                        <a className="flex items-center px-4 py-2 mt-5 duration-200 hover:bg-pm-color hover:text-white rounded-md" href="#">
                        <RiUserFollowFill className='text-lg'/>

                            <span className="mx-4 font-medium text-sm">Following</span>
                        </a>

                        <a className="flex items-center px-4 py-2 mt-5 duration-200 hover:bg-pm-color hover:text-white rounded-md" href="#">
                        <MdBarChart className='text-lg'/>

                            <span className="mx-4 font-medium text-sm">All</span>
                        </a>

                        <hr className="my-6 border-gray-200 dark:border-gray-700" />
                    </nav>
                </div>
            </aside >

    );
};

export default Sidebar;