import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MyLogo from "../assets/images/my-logo.png";

export default function Navbar() {
  const navItems = ["Home", "About", "Projects", "Experience", "Contact"];
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/1 backdrop-blur-x3 border-b border-transparent shadow-lg backdrop-blur-md rounded-b-2xl sm:rounded-b-3xl">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 sm:py-4">
        
        {/* Logo + Name clickable */}
        <a
          href="#home"
          className="flex items-center gap-2 sm:gap-3 transform transition duration-300 cursor-pointer"
        >
          <img src={MyLogo} alt="Logo" className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          <h1 className="text-sm sm:text-lg md:text-xl font-semibold text-artWhite">
            Bavly Romel
          </h1>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-8">
          {navItems.map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              className="relative cursor-pointer text-artWhite text-sm md:text-base font-medium group"
            >
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-artYellow transition-all group-hover:w-full"></span>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden flex flex-col items-center gap-6 py-6 bg-black/80 backdrop-blur-xl"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-white text-lg"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}