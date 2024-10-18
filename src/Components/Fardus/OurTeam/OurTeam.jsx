
import { FiGithub } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const OurTeam = ({member}) => {
    return (
            <div className="shadow-xl rounded-xl pb-5 bg-transparent">
                <div className="overflow-hidden rounded-t-xl">
                    <img className="w-full mx-auto object-top object-cover h-[300px] transform transition-transform duration-500 hover:scale-110" src={member.image} alt="" />
                </div>
                <div className="sm:px-0 px-3">
                    <h1 className="text-center text-opacity-90 text-xl my-3 font-semibold text-black dark:text-white">{member.title}</h1>
                    <p className="mb-3 text-center font-semibold text-black sm:text-base text-sm text-opacity-50 dark:text-white">{member.role}</p>
                </div>
                <div className="space-x-3 flex justify-center items-center mt-3 text-white ">
                    <a href={member.linkedin} target="_blank" className="p-2 rounded-full hover:scale-110 duration-200 border border-solid border-pm-color inline-block text-pmColor">
                        <FaLinkedinIn className="text-lg" />
                    </a>
                    <a href={member.facebook} target="_blank" className="p-2 rounded-full hover:scale-110 duration-200 border border-solid border-pm-color inline-block text-pmColor">
                        <FaFacebookF className="text-lg" />
                    </a>
                    <a href={member.github} target="_blank" className="p-2 rounded-full hover:scale-110 duration-200 border border-solid border-pm-color inline-block text-pmColor">
                        <FiGithub className="text-lg" />
                    </a>
                </div>
            </div>
    );
};

export default OurTeam;