import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, PenLine, Baby, Trophy, Briefcase, Users, Sparkles } from "lucide-react";

const About: React.FC = () => {
  const education = [
    {
      icon: GraduationCap,
      period: "2023–2027",
      institution: "UNIVERSITY OF RWANDA",
      detail: "College of Science and Technology",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
    },
    {
      icon: BookOpen,
      period: "2019–2022",
      institution: "ADVANCED LEVEL",
      detail: "Groupe Scolaire Sainte Bernadette de Save . Option: PCM",
      gradient: "from-green-500 via-emerald-600 to-teal-600",
    },
    {
      icon: Award,
      period: "2016–2018",
      institution: "ORDINARY LEVEL",
      detail: "Groupe Scolaire Saint Dominico Savio Kibangu",
      gradient: "from-purple-500 via-fuchsia-600 to-pink-600",
    },
    {
      icon: PenLine,
      period: "2010–2015",
      institution: "PRIMARY LEVEL",
      detail: "Ecole Primaire Rubona II",
      gradient: "from-orange-500 via-amber-600 to-yellow-600",
    },
    {
      icon: Baby,
      period: "2009",
      institution: "NURSERY",
      detail: "",
      gradient: "from-pink-500 via-rose-500 to-red-500",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 dark:text-white mb-4 sm:mb-5">
            About{" "}
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                Me
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
            Passionate developer building modern web experiences with cutting-edge technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left: Introduction & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Introduction Card */}
            <div className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 hover:border-blue-200/50 dark:hover:border-blue-600/50 transition-all duration-500">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
              
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-xl flex-shrink-0 mx-auto sm:mx-0 overflow-hidden"
                  >
                    <img
                      src="/assets/ven.jpg"
                      alt="Venuste NDIKUMANA"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-2">
                      Venuste NDIKUMANA
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 text-center sm:text-left">
                  I build full-stack web applications using modern technologies:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-400">React</span>,{" "}
                  <span className="font-bold text-blue-700 dark:text-blue-300">TypeScript</span>,{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">Node.js</span>,{" "}
                  <span className="font-bold text-gray-700 dark:text-gray-300">Express</span>, and{" "}
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">PostgreSQL</span>.
                  <br />
                  I also build cross-platform mobile applications using{" "}
                  <span className="font-bold text-cyan-500 dark:text-cyan-400">Flutter</span> with{" "}
                  <span className="font-bold text-blue-500 dark:text-blue-300">Dart</span>.
                </p>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {["Clean Code", "Accessibility", "Performance", "Security"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/50 dark:via-purple-950/50 dark:to-pink-950/50 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold rounded-xl border border-blue-200/50 dark:border-blue-700/50 shadow-sm hover:shadow-md transition-all cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {[
                { icon: Briefcase, value: "10+", label: "Projects", color: "from-blue-500 to-cyan-500" },
                { icon: Trophy, value: "2+", label: "Years Exp.", color: "from-green-500 to-emerald-500" },
                { icon: Users, value: "5+", label: "Clients", color: "from-purple-500 to-pink-500" },
                { icon: Sparkles, value: "100%", label: "Satisfaction", color: "from-yellow-500 to-orange-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="relative group bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 cursor-default"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500`}></div>
                  
                  <div className="relative">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="text-white sm:w-6 lg:w-7" size={18} />
                    </div>
                    <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-1`}>
                      {stat.value}
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-all duration-500"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                  Education
                </h3>
              </div>

              <div className="relative">
                <div className="space-y-3 sm:space-y-4">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.period}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, x: 6 }}
                      className="group/item flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50/80 dark:hover:bg-gray-700/30 cursor-default"
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${edu.gradient} flex items-center justify-center shadow-lg group-hover/item:shadow-2xl group-hover/item:scale-110 transition-all duration-300 flex-shrink-0`}>
                        <edu.icon className="text-white" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs font-black bg-clip-text text-transparent bg-gradient-to-r ${edu.gradient}`}>
                          {edu.period}
                        </span>
                        <h4 className="font-black text-sm sm:text-base text-gray-900 dark:text-white leading-tight group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                          {edu.institution}
                        </h4>
                        {edu.detail && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-0.5">
                            {edu.detail}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="h-0.5 sm:h-1 flex-1 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"></div>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
                  />
                  <div className="h-0.5 sm:h-1 flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;