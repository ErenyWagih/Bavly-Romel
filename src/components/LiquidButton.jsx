import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import LiquidGlass from "./LiquidGlass";

export default function LiquidButton({ children, className = "", onClick }) {
  const [touched, setTouched] = useState(false);
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start({
      scale: 1.06,
      boxShadow: "0 8px 24px rgba(255,255,255,0.25)",
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    });
  };

  const handleTouchStart = () => {
    setTouched(true);
    controls.start({
      scale: 1.06,
      boxShadow: "0 8px 24px rgba(255,255,255,0.25)",
    });
  };

  const handleTouchEnd = () => {
    setTouched(false);
    controls.start({
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
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
      {/* 🔹 Blur base */}
      <div className="absolute inset-0 backdrop-blur-[18px] bg-white/[0.06]" />

      {/* 🔹 Gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-40" />

      {/* 🔹 Liquid effect */}
      <LiquidGlass />

      {/* 🔹 Top highlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent opacity-20" />
      </div>

      {/* 🔹 Shine animation */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 pointer-events-none">
        <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-white/20 blur-xl rotate-12 translate-x-0 hover:translate-x-[300%] transition duration-700" />
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