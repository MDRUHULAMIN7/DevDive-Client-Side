import { FiGithub } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const OurTeam = ({ member }) => {
  return (
    <div className="relative group p-[2px] rounded-xl bg-gradient-to-r from-[#6a11cb] to-[#2575fc] transition-all duration-300 hover:shadow-[0_0_15px_#6a11cb]">
      {/* Inner White Card */}
      <div className="bg-white dark:bg-black rounded-xl overflow-hidden">
        <div className="overflow-hidden rounded-t-xl">
          <img
            className="w-full mx-auto object-top object-cover h-[300px] transform transition-transform duration-500 hover:scale-110"
            src={member.image}
            alt=""
          />
        </div>
        <div className="sm:px-0 px-3">
          <h1 className="text-center text-opacity-90 text-xl my-3 font-semibold text-black dark:text-white">
            {member.title}
          </h1>
          <p className="mb-3 text-center font-semibold text-black sm:text-base text-sm text-opacity-50 dark:text-white">
            {member.role}
          </p>
        </div>
        <div className="space-x-3 flex justify-center items-center my-3">
          <SocialIcon href={member.linkedin}>
            <FaLinkedinIn className="text-lg" />
          </SocialIcon>
          <SocialIcon href={member.facebook}>
            <FaFacebookF className="text-lg" />
          </SocialIcon>
          <SocialIcon href={member.github}>
            <FiGithub className="text-lg" />
          </SocialIcon>
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full border-2 border-transparent inline-block text-white 
                 transition-all duration-300 hover:scale-110 
                 bg-gradient-to-r from-[#6a11cb] to-[#2575fc]
                 hover:shadow-[0_0_15px_#6a11cb]"
      style={{
        backgroundClip: "border-box",
      }}
    >
      {children}
    </a>
  );
};

export default OurTeam;
