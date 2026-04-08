import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import LiquidGlass from "./LiquidGlass";

export default function LiquidButton({ children, className = "", onClick }) {
  const [touched, setTouched] = useState(false);
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({
      scale: 1.06,
      boxShadow: "0 8px 24px rgba(50, 99, 190, 0.25)",
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      scale: 1,
      boxShadow: "0 0 0 rgba(29, 54, 163, 0.77)",
    });
  };

  const handleTouchStart = () => {
    setTouched(true);
    controls.start({
      scale: 1.06,
      boxShadow: "0 8px 24px rgba(15, 105, 179, 0.59)",
    });
  };

  const handleTouchEnd = () => {
    setTouched(false);
    controls.start({
      scale: 1,
      boxShadow: "0 0 0 rgba(17, 80, 173, 0.6)",
    });
  };

  return (
    <motion.button
      onClick={onClick}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative overflow-hidden rounded-xl px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-sm sm:text-base md:text-lg ${className}`}
      style={{ zIndex: touched ? 50 : "auto" }}
    >
      
      {/* 🔹 Top highlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-20" />
      </div>


      {/* 🔹 Border */}
      <div className="absolute inset-0 border border-white/25 rounded-xl" />

      {/* 🔹 Content */}
      <span className="relative z-10 text-artYellow font-semibold">
        {children}
      </span>
    </motion.button>
  );
}