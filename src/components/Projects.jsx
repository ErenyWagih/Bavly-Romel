import { useState, useRef } from "react";
import { motion } from "framer-motion";

/* 🔥 CLOUDINARY SETUP */
const CLOUD_NAME = "dsokrght2";
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/`;

/* 🎥 GENERATOR FUNCTION */
const generateVideos = (path, count) => {
  return Array.from({ length: count }, (_, i) => ({
    src: `${BASE}${path}/${i + 1}.mp4`,
    order: i + 1,
  }));
};

/* 🎥 VIDEOS */
const landscapeVideos = generateVideos("Landscape", 15); // عدلي الرقم
const motionVideos = generateVideos("MotionGraphics", 10);

const reelsVideos = [
  ...generateVideos("Reels/BeautyandSalon", 12),
  ...generateVideos("Reels/Cinematic", 9),
  ...generateVideos("Reels/FashionandSports", 10),
  ...generateVideos("Reels/FoodandAdds", 17),
  ...generateVideos("Reels/MedicalandRealEstate", 24),
  ...generateVideos("Reels/Trendy", 3),
].sort((a, b) => a.order - b.order);

export default function Projects() {
  const tabs = [
    { label: "Landscape", key: "landscape" },
    { label: "Reels", key: "reels" },
    { label: "Motion Graphics", key: "motion" },
  ];

  const videos = {
    landscape: landscapeVideos,
    reels: reelsVideos,
    motion: motionVideos,
  };

  const [tab, setTab] = useState("landscape");
  const [activeVideo, setActiveVideo] = useState(null);
  const [touchedIndex, setTouchedIndex] = useState(null);
  const tabRefs = useRef([]);

  return (
    <motion.section
      id="projects"
      className="min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-28 md:py-40"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* 🔹 Tabs */}
      <div className="flex justify-center mb-12 md:mb-16">
        <div className="relative glass-pill flex flex-wrap p-2 gap-2">
          {tabRefs.current[tabs.findIndex((t) => t.key === tab)] && (
            <motion.div
              layout
              className="absolute top-2 bottom-2 rounded-full bg-white/10 backdrop-blur-md transition-all"
              style={{
                left:
                  tabRefs.current[tabs.findIndex((t) => t.key === tab)]
                    .offsetLeft - 4,
                width:
                  tabRefs.current[tabs.findIndex((t) => t.key === tab)]
                    .offsetWidth + 8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}

          {tabs.map((t, i) => (
            <button
              key={t.key}
              ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => setTab(t.key)}
              className={`relative z-10 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-base transition
                ${tab === t.key ? "text-white" : "text-white/60"}`}
            >
              {t.label}
            </button>
          ))}

          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-30 pointer-events-none" />
        </div>
      </div>

      {/* 🎬 GRID */}
      <div
        className={`grid gap-6 md:gap-10 ${
          tab === "landscape"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {videos[tab]?.map((video, i) => (
          <motion.div
            key={i}
            className={`group cursor-pointer ${
              tab !== "landscape" ? "scale-95 md:scale-90" : ""
            }`}
            onClick={() => setActiveVideo(video.src)}
            onTouchStart={() => setTouchedIndex(i)}
            onTouchEnd={() => setTouchedIndex(null)}
            whileHover={{ scale: 1.03 }}
          >
            <div
              className={`relative rounded-2xl overflow-hidden bg-black ${
                tab === "landscape" ? "aspect-video" : "aspect-[9/16]"
              }`}
            >
              <video
  src={video.src}
  poster={video.src.replace("/video/upload/", "/video/upload/so_0.9/").replace(".mp4", ".jpg")}
                muted
                loop
                playsInline
                preload="none"
                onLoadedData={(e) => {
                  e.target.currentTime = 1.9;
                }}
                onMouseEnter={(e) => e.target.play().catch(() => {})}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 1;
                }}
                onTouchStart={(e) => e.target.play().catch(() => {})}
                className={`w-full h-full object-cover transition duration-500 
                ${touchedIndex === i ? "scale-110" : "group-hover:scale-110"}`}
              />

              <div className={`absolute inset-0 bg-black/30 transition 
              ${touchedIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />

              <div className={`absolute inset-0 flex items-center justify-center transition 
              ${touchedIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <div className="relative px-6 py-3 rounded-full glass-pill">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-40" />
                  <span className="relative z-10 text-white">Play</span>
                </div>
              </div>

              <div className={`absolute inset-0 rounded-2xl ring-1 ring-white/20 transition 
              ${touchedIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎥 FULLSCREEN */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.tagName !== "VIDEO") {
              setActiveVideo(null);
            }
          }}
        >
          <video
            src={activeVideo}
            controls
            autoPlay
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
        </div>
      )}
    </motion.section>
  );
}