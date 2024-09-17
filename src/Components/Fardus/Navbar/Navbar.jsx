import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdLogin } from "react-icons/md";



const Navbar = () => {

    const [openSmallMenu, setOpenSmallMenu] = useState(false)

    return (
        <div>
            <nav className="relative bg-white border-b border-black border-opacity-15 hidden sm:hidden lg:block">
                <div className="px-6 py-3 mx-auto flex justify-between items-center gap-10">
                    <div className="flex items-center justify-between">
                        <a href="#">
                            <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="Logo" />
                        </a>
                    </div>

                    <div className="relative w-[50%]">
                        <span className="absolute inset-y-0 left-0 flex justify-between items-center pl-3">
                            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>

                        <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-200 border-black border border-transparent rounded-2xl outline-none hover:border hover:border-pm-color focus:border-pm-color" placeholder="Search" />
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <button className="text-nowrap bg-pm-color rounded-2xl text-white px-4 py-2">Sign In</button>
                        <div className="relative">
                            <button onClick={()=>setOpenSmallMenu(!openSmallMenu)} title="Open Menu" className="text-xl rounded-full p-3 hover:bg-gray-200 duration-200"><CiMenuKebab /></button>
                            <div className={`${openSmallMenu ? "" : "hidden"} w-[300px] py-8 shadow-2xl absolute top-14 right-0 rounded-lg`}>
                                <span className="flex justify-start px-6 items-center gap-3"><MdLogin className="text-2xl"/> Sign In / Sign Up</span>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;