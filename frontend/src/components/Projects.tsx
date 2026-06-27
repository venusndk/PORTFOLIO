import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";

const projects = [
  {
    title: "PC Maintenance System",
    desc: "JSP/Servlet inventory & assignment system with real-time tracking",
    img: "/assets/pc.jpg",

    tags: ["JSP", "Servlet", "MySQL"],
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "Event Management",
    desc: "Event booking & updates platform with live notifications",
    img: "/assets/event.jpg",

    tags: ["React", "Node.js", "PostgreSQL"],
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Weather Dashboard",
    desc: "Location-based weather forecasting with interactive charts",
    img: "/assets/weather.jpg",

    tags: ["TypeScript", "API", "Charts.js"],
    gradient: "from-green-600 to-teal-600",
  },
  {
    title: "CampChat",
    desc: "Chatting platform like WhatsApp with direct message translation based on user preference",
    img: "/assets/campchat.svg",

    tags: ["Messaging", "Translation", "Real-Time"],
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    title: "DGL",
    desc: "Driver Garage Linker mobile application to connect stranded drivers with nearby garages",
    img: "/assets/dgl.svg",

    tags: ["Mobile App", "GPS", "Garage Network"],
    gradient: "from-orange-600 to-rose-600",
  },
  {
    title: "SORP",
    desc: "Staff Operation and Reporting Platform for streamlined operations and reporting workflows",
    img: "/assets/sorp.svg",

    tags: ["Operations", "Reporting", "Workflow"],
    gradient: "from-violet-600 to-fuchsia-600",
  },
];

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      className="py-16 sm:py-20 md:py-22 lg:py-24 relative overflow-hidden bg-gradient-to-b from-purple-50/30 via-white to-pink-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -right-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-[500px] lg:h-[500px] bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 dark:text-white mb-4 sm:mb-5">
            Featured{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400">
                Projects
              </span>
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            A curated selection showcasing my technical skills and creative problem-solving
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                
                {/* Gradient Glow on Hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500`}></div>

                {/* Image Container */}
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden">
                  {/* Image */}
                  <motion.img
                    src={project.img}
                    alt={project.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading="lazy"
                  />

                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-3 right-3 px-2 py-1 sm:top-4 sm:right-4 sm:px-3 sm:py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Featured</span>
                  </motion.div>

                  {/* Live indicator (appears on hover) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                    />
                    <span className="text-xs font-bold text-white">Live</span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative p-4 sm:p-6 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-blue-600 dark:group-hover:from-purple-400 dark:group-hover:via-pink-400 dark:group-hover:to-blue-400 transition-all duration-300 leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-1">
                    {project.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg border border-gray-300 dark:border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r ${project.gradient} text-white rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group/btn text-xs sm:text-sm`}
                    >
                      <span>View Live</span>
                      <ExternalLink size={14} className="sm:w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>

                {/* Sparkle Effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  whileHover={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 1 }}
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none"
                >
                  <Sparkles size={16} className="sm:w-6 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;