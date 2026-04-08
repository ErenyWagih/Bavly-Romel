import LiquidButton from "./LiquidButton";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const contacts = [
    { icon: <FaInstagram size={20} />, title: "Instagram", link: "https://www.instagram.com/bavly.romel/" },
    { icon: <FaLinkedin size={20} />, title: "LinkedIn", link: "https://www.linkedin.com/in/bavly-romel-9a3005164/" },
    { icon: <FaFacebook size={20} />, title: "Facebook", link: "https://www.facebook.com/bavly.romel.662607" },
    { icon: <FaWhatsapp size={20} />, title: "WhatsApp", link: "https://wa.me/201211550860" },
    { icon: <FaEnvelope size={20} />, title: "Email", link: "mailto:Bavlyromel3@gmail.com" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New message from ${name}`);
    const body = encodeURIComponent(`${message}`);
    const mailtoLink = `mailto:Bavlyromel3@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <motion.section
      id="contact"
      className="relative min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-28 md:py-32 flex items-center justify-center"
       style={{ backgroundColor: "#1D1D1D" }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >

       {/* ✨ Background Highlight */}
<div className="absolute inset-0 z-0 flex justify-center items-center">
  <div className="w-[350px] h-[200px] bg-blue-500 opacity-20 blur-[100px] rounded-[50%_40%_60%_50%/50%_60%_40%_50%] absolute -rotate-12"></div>
  <div className="w-[250px] h-[150px] bg-blue-500 opacity-15 blur-[120px] rounded-[40%_60%_50%_50%/50%_40%_60%_50%] absolute rotate-6"></div>
  <div className="w-[300px] h-[180px] bg-blue-500 opacity-10 blur-[140px] rounded-[45%_55%_50%_45%/50%_45%_55%_50%] absolute -rotate-6"></div>
</div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">

        {/* FORM */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight sm:leading-snug">
            Contact Me
          </h2>

          <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit}>
            <input
              className="glass p-3 sm:p-4 rounded-xl text-sm sm:text-base"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="glass p-3 sm:p-4 rounded-xl text-sm sm:text-base"
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              className="glass p-3 sm:p-4 rounded-xl h-32 sm:h-40 text-sm sm:text-base"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <LiquidButton type="submit">
              {sent ? "Message Opened ✓" : "Send Message"}
            </LiquidButton>
          </form>
        </div>

        {/* CONTACT LINKS */}
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6">
          {contacts.map((c, i) => (
            <a href={c.link} target="_blank" key={i}>
              <motion.div whileHover={{ scale: 1.08 }}>
                <div className="glass-pill px-6 sm:px-10 py-3 sm:py-4 w-full max-w-xs sm:max-w-sm text-center flex items-center justify-center gap-2 text-sm sm:text-base">
                  {c.icon}
                  {c.title}
                </div>
              </motion.div>
            </a>
          ))}
        </div>

      </div>
    </motion.section>
  );
}
