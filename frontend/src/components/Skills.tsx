import React from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";
import { Sparkles } from "lucide-react";

const skills = [
  { 
    name: "HTML5", 
    icon: <SiHtml5 className="text-orange-500" />, 
    gradient: "from-orange-500 to-red-500",
    glow: "rgba(249, 115, 22, 0.4)"
  },
  { 
    name: "CSS3", 
    icon: <SiCss3 className="text-blue-500" />, 
    gradient: "from-blue-500 to-blue-700",
    glow: "rgba(59, 130, 246, 0.4)"
  },
  { 
    name: "JavaScript", 
    icon: <SiJavascript className="text-yellow-400" />, 
    gradient: "from-yellow-400 to-yellow-600",
    glow: "rgba(250, 204, 21, 0.4)"
  },
  { 
    name: "TypeScript", 
    icon: <SiTypescript className="text-blue-600" />, 
    gradient: "from-blue-600 to-blue-800",
    glow: "rgba(37, 99, 235, 0.4)"
  },
  { 
    name: "React", 
    icon: <SiReact className="text-cyan-400" />, 
    gradient: "from-cyan-400 to-blue-500",
    glow: "rgba(6, 182, 212, 0.4)"
  },
  { 
    name: "Node.js", 
    icon: <SiNodedotjs className="text-green-500" />, 
    gradient: "from-green-500 to-green-700",
    glow: "rgba(16, 185, 129, 0.4)"
  },
  { 
    name: "Express", 
    icon: <SiExpress className="text-gray-600 dark:text-gray-300" />, 
    gradient: "from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600",
    glow: "rgba(75, 85, 99, 0.4)"
  },
  { 
    name: "PostgreSQL", 
    icon: <SiPostgresql className="text-blue-700" />, 
    gradient: "from-blue-700 to-indigo-800",
    glow: "rgba(29, 78, 216, 0.4)"
  },
  { 
    name: "Tailwind", 
    icon: <SiTailwindcss className="text-teal-400" />, 
    gradient: "from-teal-400 to-cyan-600",
    glow: "rgba(20, 184, 166, 0.4)"
  },
  { 
    name: "Framer Motion", 
    icon: <SiFramer className="text-purple-500" />, 
    gradient: "from-purple-500 to-pink-600",
    glow: "rgba(168, 85, 247, 0.4)"
  },
];

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
            My{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                Skills
              </span>
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Technologies and tools I use to craft exceptional web experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                y: -4,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg sm:shadow-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 overflow-hidden h-full flex flex-col items-center justify-center">
                
                {/* Animated Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.glow}, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Gradient Border on Hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.gradient} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500`}></div>

                {/* Floating Animation */}
                <motion.div
                  animate={{
                    y: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 3 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 flex flex-col items-center w-full"
                >
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-lg sm:rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center shadow-lg sm:shadow-xl group-hover:shadow-2xl transition-all duration-300 relative mb-2 sm:mb-3 lg:mb-4`}
                  >
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl group-hover:bg-white/30 transition-colors duration-300"></div>
                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300 text-lg sm:text-xl lg:text-2xl xl:text-3xl">
                      {skill.icon}
                    </div>
                  </motion.div>

                  {/* Skill Name */}
                  <h3 className="font-bold text-xs sm:text-sm lg:text-base text-gray-900 dark:text-white text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400 transition-all duration-300 leading-tight px-1">
                    {skill.name}
                  </h3>

                  {/* Proficiency Bar */}
                  <motion.div
                    className="w-full h-0.5 sm:h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 sm:mt-3 overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                </motion.div>

                {/* Sparkle Effect on Hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-1 right-1 sm:top-2 sm:right-2"
                >
                  <Sparkles size={12} className="sm:w-4 text-yellow-400" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;