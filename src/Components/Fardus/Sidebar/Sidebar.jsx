import { FaArrowTrendUp } from 'react-icons/fa6';
import { IoMdHome } from 'react-icons/io';
import { MdBarChart } from 'react-icons/md';
import { RiUserFollowFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ setOpenMenu, openMenu }) => {
    return (
        <aside className={`fixed flex-col w-64 lg:translate-x-0 ${openMenu ? "translate-x-0 duration-200 ease-in-out" : "translate-x-[-256px] duration-200 ease-in-out"} h-[calc(100vh-68px)] px-4 py-8 overflow-y-auto bg-white dark:bg-themeColor border-r dark:border-gray-700 rtl:border-r-0 rtl:border-l mt-[1px]`}>
            <div className="flex flex-col justify-between w-[calc(220px-5px)]">
                <nav>
                    <NavLink to='/' className="flex items-center px-4 py-2 rounded-md duration-200 hover:bg-pm-color hover:text-white" href="#">
                        <IoMdHome className='text-lg' />
                        <span className="mx-3 font-medium text-sm">Home</span>
                    </NavLink>

                    <NavLink to='/popular' className="flex items-center px-4 py-2 mt-5 rounded-md duration-200 hover:bg-pm-color hover:text-white" href="#">
                        <FaArrowTrendUp className='text-lg' />
                        <span className="mx-4 font-medium text-sm">Popular</span>
                    </NavLink>

                    <NavLink to='/following' className="flex items-center px-4 py-2 mt-5 duration-200 hover:bg-pm-color hover:text-white rounded-md" href="#">
                        <RiUserFollowFill className='text-lg' />
                        <span className="mx-4 font-medium text-sm">Following</span>
                    </NavLink>

                    <NavLink to='/all' className="flex items-center px-4 py-2 mt-5 duration-200 hover:bg-pm-color hover:text-white rounded-md" href="#">
                        <MdBarChart className='text-lg' />
                        <span className="mx-4 font-medium text-sm">All</span>
                    </NavLink>

                    <hr className="my-6 border-gray-200 dark:border-gray-700" />
                    <div className='h-[1000px]'></div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
