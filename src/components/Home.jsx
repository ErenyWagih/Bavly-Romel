import { motion } from "framer-motion";
import { useState, useRef } from "react";
import bgVideo from "../assets/images/background.mp4";
import LiquidButton from "./LiquidButton";

export default function Home() {
  const [move, setMove] = useState(false);
  const buttonRef = useRef(null); // ✅ ref للزرار لحساب عرضه ديناميكياً

  return (
    <section
  id="home"
  className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 text-center overflow-hidden"
>
  {/* Background Video */}
  <div className="absolute inset-0 -z-10">
    <video
      src={bgVideo}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/65"></div>
  </div>

  {/* Content */}
  <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-xl">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-artWhite leading-tight sm:leading-snug">
      Bavly Romel
    </h1>

    <p className="text-sm sm:text-base md:text-lg text-artWhite opacity-80 px-2 sm:px-0 leading-tight sm:leading-snug">
      Video Editor | 5+ Years Experience in Social Media, YouTube & Ads Editing |
      Premiere Pro, After Effects & Motion Graphics.
    </p>

    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.05 }}
      onClick={() => {
        setMove(true);

        const section = document.getElementById("projects");

        setTimeout(() => {
          section?.scrollIntoView({ behavior: "smooth" });
        }, 500);

        setTimeout(() => {
          setMove(false);
        }, 900);
      }}
      className="relative glass-pill px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg text-white mt-4 sm:mt-6 flex items-center justify-center overflow-hidden"
    >
      {/* highlight */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-40" />

      {/* Arrow */}
      <motion.div
        animate={{
          x: move
            ? buttonRef.current
              ? buttonRef.current.offsetWidth - 64
              : 140
            : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute left-2 sm:left-3 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/40 flex items-center justify-center z-10
                   bg-white/20 backdrop-blur-md"
      >
        →
      </motion.div>

      <span className="relative z-0 ml-4">View My Work</span>
    </motion.button>
  </div>
</section>
  );
}