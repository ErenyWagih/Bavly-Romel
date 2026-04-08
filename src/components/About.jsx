import { motion } from "framer-motion";
import Myimage from "../assets/images/bavly-image.jpeg";
import GlassCard from "./GlassCard";
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function About() {

  const socials = [
    { icon: <FaInstagram />, link: "https://www.instagram.com/bavly.romel/" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/bavly-romel-9a3005164/" },
    { icon: <FaFacebook />, link: "https://www.facebook.com/bavly.romel.662607" },
    { icon: <FaWhatsapp />, link: "https://wa.me/201211550860" }, 
    { icon: <FaEnvelope />, link: "mailto:Bavlyromel3@gmail.com" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-28"
    >

      {/* ✨ Background Highlight */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <div className="w-[400px] h-[400px] bg-artYellow opacity-20 blur-[120px] rounded-full absolute"></div>
        <div className="w-[300px] h-[300px] bg-blue-500 opacity-20 blur-[120px] rounded-full absolute"></div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-artWhite">

        {/* Image */}
        <motion.img
          src={Myimage}
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl w-[70%] sm:w-[60%] md:w-[80%] mx-auto object-contain hover:scale-[1.02] transition duration-500"
        />

        {/* Text */}
        <div className="flex flex-col justify-center gap-4 sm:gap-6">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-artYellow leading-tight sm:leading-snug">
            About Me
          </h2>

          <p className="text-sm sm:text-base md:text-lg opacity-90 leading-tight sm:leading-snug">
            I’m a passionate Video Editor who turns ideas into engaging visual stories.
            Since 2020, I’ve worked on social media, YouTube, and ads using
            Adobe Premiere Pro and After Effects with strong motion graphics skills.
          </p>

          <p className="text-sm sm:text-base opacity-80 leading-tight sm:leading-snug">
            I’ve handled diverse projects, helped boost engagement,
            and always deliver high-quality work on time.
          </p>

          {/* Highlights */}
          <div className="flex flex-col gap-2 text-sm sm:text-base opacity-80">
            <span>• Worked with brands & content creators</span>
            <span>• Increased engagement on social media videos</span>
            <span>• Deliver high-quality work on time</span>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
            {socials.map((s, i) => (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="glass-pill w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl"
                >
                  {s.icon}
                </motion.div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
