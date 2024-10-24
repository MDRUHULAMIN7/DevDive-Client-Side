import { FaUsers, FaGlobe, FaCode, FaRegClipboard, FaRegStar, FaTools, FaHandsHelping } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MdStorage } from 'react-icons/md';
import OurTeam from '../../../../Components/Fardus/OurTeam/OurTeam';
import { Helmet } from 'react-helmet';

const AboutSection = () => {
  return (
    <section className="relative text-gray-800 dark:text-gray-200 py-20 px-6 bg-gray-100 dark:bg-gray-900">
      {/* Background Shapes */}

      <Helmet> <title>DevDive | About</title> </Helmet>
      <div className="absolute top-5 left-0 w-full h-full overflow-hidden">
        <div className="absolute bg-blue-700 opacity-30 rounded-full h-72 w-72 top-1/4 left-1/3 transform -translate-x-1/2" />
        <div className="absolute bg-blue-600 opacity-30 rounded-full h-36 w-36 top-3/4 right-1/4 transform -translate-x-1/2" />
      </div>

      {/* Container */}
      <div className="relative container mx-auto max-w-7xl ">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 mb-10"
        >
          About DevDive
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12"
        >
          At DevDive, we are committed to fostering a collaborative environment where developers of all levels can grow, share knowledge, and build projects together. Our platform serves as a central hub for problem-solving, professional growth, and community-building for developers across the globe.
        </motion.p>

        {/* Vision & Mission Section */}
        <motion.div className="mb-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-center mb-12">Vision & Mission</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: FaHandsHelping, title: "Our Vision", desc: "To create a vibrant, supportive community where developers collaborate, learn, and thrive." },
              { icon: FaRegClipboard, title: "Our Mission", desc: "Provide a space where people from different backgrounds can connect and create innovative solutions." },
              { icon: MdStorage, title: "Our Target", desc: "Provide a space where people from different backgrounds can connect and create innovative solutions." }
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-300 dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center relative z-10"
              >
                <Icon className="text-5xl text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="dark:text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div className="mb-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: FaRegClipboard, title: "Create Posts", desc: "Start new projects and invite collaborators." },
              { icon: FaCode, title: "Collaborate", desc: "Work together on code in real-time." },
              { icon: FaRegStar, title: "Achieve Solutions", desc: "Celebrate milestones with the community." },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-gray-300 dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center relative z-10">
                <Icon className="text-5xl text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="dark:text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Success Section */}
        <motion.div className="relative py-20 mb-20  rounded-xl shadow-2xl">
        <div 
  className="absolute -top-14 left-0 w-full h-20 
             bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 
             dark:bg-gradient-to-r dark:from-indigo-300 dark:via-purple-400 dark:to-blue-400"
/>

          <motion.h2 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-center text-gray-700 dark:text-white mb-10">
            Our Success
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 px-6">
            {[
              { icon: FaUsers, title: "5000+ Users", desc: "Our growing community of developers." },
              { icon: FaRegStar, title: "100+ Posts", desc: "Collaborations across the globe." },
              { icon: FaGlobe, title: "50+ Countries", desc: "Impacting developers worldwide." },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div key={idx} initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.2 }} className="p-8 bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg text-center">
                <Icon className="text-5xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold  mb-2">{title}</h3>
                <p className="dark:text-gray-400 ">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why DevDive Section */}
        <motion.div className="mb-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-center mb-12">Why DevDive?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: FaCode, title: "Real-Time Collaboration", desc: "Work on projects with developers in real-time, share code, and provide instant feedback." },
              { icon: FaTools, title: "Developer-Centric Design", desc: "Our platform is built with developers in mind, providing intuitive tools like integrated code editors, forums, and collaborative features." },
              { icon: FaRegStar, title: "Community Support", desc: "Get help from the community on any coding challenges, share your knowledge, and help others succeed." },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-300 dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center relative z-10"
              >
                <Icon className="text-5xl text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="dark:text-gray-400 ">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>


<div>
<h2 className="text-4xl font-bold text-blue-500 text-center mb-12">
      DevDive Developer Team
      </h2>
    {/* Our Teams Section */}
    <motion.div
      className="relative mb-24 rounded-lg overflow-hidden bg-transparent p-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-10 relative">
        {[
          {
            image:
              "https://res.cloudinary.com/dpomtzref/image/upload/v1729242097/dm2bbwotaoqc8ab6q9sz.jpg",
            title: "Md Ruhul Amin",
            role: "MERN Stack Developer",
            facebook: "https://www.facebook.com/profile.php?id=100075508398981",
            linkedin: "https://www.linkedin.com/in/ruhul7/",
            github: "https://github.com/MDRUHULAMIN7",
          },
          {
            image: "https://i.ibb.co/vwzwdGq/In-Shot-20240703-024633597.jpg",
            title: "Fardus Hassan",
            role: "MERN Stack Developer",
            facebook: "https://www.facebook.com/profile.php?id=100034957954013",
            linkedin: "https://www.linkedin.com/in/fardus-hassan",
            github: "https://github.com/Fardus-Hassan",
          },
          {
            image:
              "https://sanjidaema.netlify.app/assets/mypic-BdSK1L4O.jfif",
            title: "Mst Sanjida Akter",
            role: "MERN Stack Developer",
            facebook:
              "https://www.facebook.com/profile.php?id=100054261816897&_rdc=1&_rdr",
            linkedin: "https://www.linkedin.com/in/sanjidaema/",
            github: "https://github.com/SanjidaOSD",
          },
          {
            image: "https://i.ibb.co/4mhX1pJ/min2.webp",
            title: "Md. Nifat Hossain",
            role: "MERN Stack Developer",
            facebook: "https://www.facebook.com/mdnifat.hossain.9",
            linkedin: "www.linkedin.com/in/nifat-hossain",
            github: "https://github.com/NifatHossain",
          },
          {
            image: "https://i.ibb.co/cy0X7FM/1720414006721.jpg",
            title: "Md. Firoz Mahmud Nur",
            role: "MERN Stack Developer",
            facebook: "https://www.facebook.com/firoz.nur",
            linkedin: "linkedin.com/in/md-firoz-mahmud-nur",
            github: "https://github.com/Md-Firoz-Mahmud-Nur",
          },
          {
            image: "https://i.ibb.co/r4V1gPZ/86263892.jpg",
            title: "Md Adnan Shiragee",
            role: "MERN Stack Developer",
            facebook:
              "https://www.facebook.com/profile.php?id=61561913450158",
            linkedin: "https://www.linkedin.com/in/mdadnan-shiragee",
            github: "https://github.com/adnan2508",
          },
        ].map((member, idx) => (
          <OurTeam key={idx} member={member} />
        ))}
      </div>

     
    </motion.div>

</div>
    
        {/* Join Us Section */}
        <motion.div className="mb-24" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl font-bold text-center mb-12">Join Us</h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12">
            Ready to take your development skills to the next level? Join our community and start collaborating with developers around the world.
          </p>
         
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
