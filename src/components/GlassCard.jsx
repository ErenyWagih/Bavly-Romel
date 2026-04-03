import LiquidGlass from "./LiquidGlass";

export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden group hover:scale-[1.02] transition duration-500 ${className}`}
    >
      {/* 🔵 Blur base - أبيض فاتح مع شفافية */}
      <div className="absolute inset-0 backdrop-blur-[4px] bg-white/10" />

      {/* 🌊 Liquid effect */}
      <LiquidGlass />

      {/* ✨ Top light reflection */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-10" />
      </div>

      {/* 🧊 Border subtle */}
      <div className="absolute inset-0 border border-white/20 rounded-2xl" />

      {/* 💎 Depth shadow */}
      <div className="absolute inset-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-4px_10px_rgba(0,0,0,0.15)]" />

      {/* 📦 Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}