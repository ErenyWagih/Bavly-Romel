import { motion } from "framer-motion";
import { useState } from "react";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(null);

  const logos = Object.entries(
    import.meta.glob("../assets/Logos/*.png", { eager: true })
  )
    .map(([path, module]) => {
      const match = path.match(/(\d+)\.png$/);
      return { src: module.default, order: match ? parseInt(match[1]) : 9999 };
    })
    .sort((a, b) => a.order - b.order)
    .map((item) => item.src);

  return (
    <section
      id="experience"
      className="min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-28 md:py-32"
    >
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-artYellow mb-10 md:mb-14 leading-tight sm:leading-snug">
        Work Experience
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-10">
        {logos.map((logo, i) => (
          <motion.div
            key={i}
            className={`group relative rounded-2xl p-4 sm:p-6 flex items-center justify-center
              bg-white/5 backdrop-blur-md border border-white/10
              transition-all`}
            initial="rest"
            whileHover="hover"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onTouchStart={() => setActiveIndex(i)}
            onTouchEnd={() => setActiveIndex(null)}
            style={{ zIndex: activeIndex === i ? 50 : 0 }} // ✅ z-index ديناميكي
          >
            {/* Glow */}
<motion.div
  variants={{
    rest: { opacity: 0, scale: 1 },
    hover: { opacity: 1, scale: 1.2 },
  }}
  animate={activeIndex === i ? "hover" : "rest"}
  transition={{ duration: 0.3 }}
  className="absolute inset-0 rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.3)]"
/>

            {/* Logo */}
            <motion.img
              src={logo}
              alt={`logo-${i}`}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain relative"
              style={{ zIndex: activeIndex === i ? 60 : 10 }} // ✅ logo فوق كل حاجة
              variants={{
                rest: { scale: 1.5, rotate: 0 },
                hover: { scale: 3.5, rotate: 2 },
              }}
              animate={activeIndex === i ? "hover" : "rest"}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}