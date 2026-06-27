import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const links = ["Home", "About", "Skills", "Projects", "Contact"];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const linkRefs = useRef<(HTMLLIElement | null)[]>([]);

  // ---------------------------
  // Handle scroll background
  // ---------------------------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------------------------
  // Observe active section
  // ---------------------------
  useEffect(() => {
    const sections = links.map((link) =>
      document.getElementById(link.toLowerCase())
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((s) => s && observer.observe(s));
    return () => sections.forEach((s) => s && observer.unobserve(s));
  }, [links]);

  // ---------------------------
  // Smooth scroll to section
  // ---------------------------
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const navbarHeight = scrolled ? 64 : 72;
    const offset = section.offsetTop - navbarHeight - 8;

    window.scrollTo({ top: offset, behavior: "smooth" });

    setOpen(false);
  };

  // Animation Variants
  const menuVariants = {
    open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    closed: {},
  };

  const linkVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    closed: { opacity: 0, x: -20 },
  };

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
      ${
        scrolled
          ? "h-16 bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl shadow-xl border-b border-gray-200/40 dark:border-purple-500/20"
          : "h-18 bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg shadow-lg border-b border-gray-200/30 dark:border-gray-800/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full w-full">
        
        {/* Logo + Icons */}
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group select-none flex-shrink-0"
        >
          <div className="relative flex items-center">
            {/* Glow on hover */}
            <motion.div
              className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo Text */}
            <span className="relative text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-green-600">
                Ven
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                NDIK
              </span>
            </span>
          </div>
        </motion.a>

        {/* ---------------------- DESKTOP MENU ---------------------- */}
        <div className="hidden md:flex relative items-center text-gray-700 dark:text-gray-300">
          <ul className="flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
            {links.map((link, index) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;

              return (
                <motion.li
                  key={link}
                  ref={(el) => (linkRefs.current[index] = el)}
                  className="relative cursor-pointer px-3 py-2 lg:px-4"
                  onClick={() => scrollToSection(id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span
                    className={`relative z-10 transition-all duration-300 text-sm lg:text-base font-bold uppercase ${
                      isActive
                        ? "text-blue-600 dark:text-green-400"
                        : "hover:text-blue-500 dark:hover:text-green-400"
                    }`}
                  >
                    {link}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* ---------------------- MOBILE TOGGLE ---------------------- */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 shadow-md"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ---------------------- MOBILE DROPDOWN ---------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-purple-500/20 shadow-2xl w-full"
          >
            <motion.ul
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col py-4 px-4 space-y-2"
            >
              {links.map((link) => {
                const id = link.toLowerCase();
                const isActive = activeSection === id;

                return (
                  <motion.li key={link} variants={linkVariants}>
                    <motion.a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative block w-full px-4 py-3 rounded-xl transition-all duration-300 group font-bold uppercase ${
                        isActive
                          ? "text-blue-600 dark:text-green-400"
                          : "hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-900"
                      }`}
                    >
                      <span className="relative flex items-center justify-between">
                        {link}
                      </span>
                    </motion.a>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-green-400 dark:via-blue-400 dark:to-purple-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
