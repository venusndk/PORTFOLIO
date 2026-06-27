import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MessageCircle, Github, Send, Heart, Sparkles } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

return (
    <footer className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-14 lg:mb-16">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl font-black text-white">V</span>
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-black">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">Ven</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">NDIK</span>
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Full Stack Developer & University of Rwanda student. Passionate about
              creating efficient, modern, and accessible web experiences that make a difference.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={14} className="text-red-500 fill-red-500" />
              </motion.div>
              <span> and sleepless nights</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
                { label: "Resume", href: "/assets/resume.pdf", external: true },
              ].map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <motion.span
                      className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Connect
            </h4>
            <ul className="space-y-3">
              {[
                { 
                  label: "LinkedIn", 
                  href: "https://www.linkedin.com/in/ndikumana-venuste-985b4928a/",
                  icon: Linkedin,
                  color: "text-blue-500"
                },
                { 
                  label: "GitHub", 
                  href: "https://github.com/venusndk",
                  icon: Github,
                  color: "text-gray-400"
                },
                { 
                  label: "Email", 
                  href: "mailto:venustendikumana2003@gmail.com",
                  icon: Mail,
                  color: "text-red-500"
                },
                { 
                  label: "WhatsApp", 
                  href: "https://wa.me/250799375874",
                  icon: MessageCircle,
                  color: "text-green-500"
                },
              ].map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center transition-colors duration-300 ${link.color}`}>
                      <link.icon size={16} />
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></span>
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe for updates on new projects, and tech insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  required
                />
                <motion.div
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </motion.div>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm flex items-center gap-2"
                >
                  <Sparkles size={14} />
                  Thanks for subscribing!
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="px-4 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950"
            >
              <Sparkles size={20} className="text-blue-500" />
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm text-center"
          >
            &copy; {currentYear}{" "}
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Venuste NDIKUMANA
            </span>
            . All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;