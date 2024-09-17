import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdLogin } from "react-icons/md";
import Logo from "../Logo/Logo";
import logo from '../../../assets/logo.png';
import { IoArrowBackOutline } from "react-icons/io5";



const Navbar = () => {

    const [openSmallMenu, setOpenSmallMenu] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [clickSearch, setClickSearch] = useState(false)









    return (
        <>
            <nav className="relative bg-white border-b border-black border-opacity-15 hidden sm:hidden lg:block">
                <div className="px-6 py-3 mx-auto flex justify-between items-center gap-10">
                    <div className="flex items-center justify-between">
                        <Logo></Logo>
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
                        <button className="text-nowrap bg-pm-color hover:bg-sec-color duration-200 rounded-2xl text-white px-4 py-2">Sign In</button>
                        <div className="relative">
                            <button onClick={() => setOpenSmallMenu(!openSmallMenu)} title="Open Menu" className="text-xl rounded-full p-3 hover:bg-gray-200 duration-200"><CiMenuKebab /></button>
                            <div className={`${openSmallMenu ? "" : "hidden"} w-[300px] lg:py-8 py-5 shadow-2xl absolute top-14 right-0 rounded-lg`}>
                                <span className="flex justify-start lg:px-6 px-5 items-center gap-4 lg:text-base sm:text-sm text-xs"><MdLogin className="text-2xl" /> Sign In / Sign Up</span>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>

            {/* mobile nav */}
            <nav className="relative bg-white border-b border-black border-opacity-15 lg:hidden">
                <div className="sm:px-6 px-4 sm:py-3 py-2 mx-auto flex justify-between items-center gap-10">
                    <img className="w-10" src={logo} alt="" />

                    <div className="flex justify-between items-center gap-2">
                        <svg onClick={() => setClickSearch(true)} className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <div>
                            <button onClick={() => setOpenSmallMenu(!openSmallMenu)} title="Open Menu" className="text-xl rounded-full hover:bg-gray-200 duration-200 p-3"><CiMenuKebab /></button>


                        </div>
                    </div>

                </div>
            </nav>
            <span onClick={() => setOpenSmallMenu(!openSmallMenu)} className={`${openSmallMenu ? "" : "hidden"} w-full h-screen lg:hidden bg-black bg-opacity-15 lg:py-8 py-5 shadow-2xl absolute top-0 right-0 rounded-lg z-10`}>
            </span>
            <div className={`absolute z-50 bottom-0 left-0 lg:hidden ${openSmallMenu ? "translate-y-0" : "translate-y-[100%] hidden"} py-5 space-y-4 bg-pm-color bg-opacity-20 w-full`}>
                <span className="flex justify-start lg:px-6 px-5 items-center gap-4 lg:text-base sm:text-sm text-xs"><MdLogin className="text-2xl" /> Sign In / Sign Up</span>
            </div>

            <div className={`${clickSearch ? "fixed w-full top-0 sm:px-6 px-4 sm:py-3 py-2" : "hidden"} bg-white`}>
                <div className="flex justify-start items-center gap-3">
                    <IoArrowBackOutline onClick={() => { setClickSearch(false) }} className="text-2xl text-gray-500" />
                    <div className=" relative">
                        <span className="absolute inset-y-0 left-0 flex justify-between items-center pl-3">
                            <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>

                        <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 border-black border border-transparent rounded-2xl outline-none" placeholder="Search" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;