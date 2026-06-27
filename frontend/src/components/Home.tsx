import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

const Home: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center justify-center text-white py-20 lg:py-0"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        {/* Gradient Orbs - Responsive sizing */}
        <motion.div
          className="absolute top-10 left-5 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px] bg-pink-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10 w-full">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 lg:space-y-8 text-center md:text-left order-2 md:order-1"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
          >
            <span className="block text-gray-300 text-xs sm:text-sm lg:text-base font-medium mb-2 italic leading-snug">
              "Programming isn't about what you know, it's about what you code."
            </span>
            <motion.span
              className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Venuste NDIKUMANA
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Passionate about building <span className="text-blue-400 font-semibold">scalable</span> and{" "}
            <span className="text-purple-400 font-semibold">secure</span> applications. Always eager to implement{" "}
            <span className="text-pink-400 font-semibold">innovative solutions</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
            <motion.a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={18} className="sm:w-5" />
                Download Resume
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full font-bold hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            >
              Get In Touch
              <ArrowRight size={18} className="sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex justify-center md:justify-end order-1 md:order-2 mb-6 md:mb-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative">
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-50"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-1 sm:-inset-2 md:-inset-4 rounded-full border-2 border-blue-400/30"
              animate={{ scale: [1, 1.05, 1], rotate: [0, -180, -360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Main image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-950 p-2">
                  <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-white/10 shadow-2xl">
                    <img
                      src="/assets/ven.jpg"
                      alt="Venuste NDIKUMANA"
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;