"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGradientPos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const fullText = "心を通わせる、そのあいだに。";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden"
    >
      <style>{`
        @keyframes charReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .hero-char {
          display: inline-block;
          opacity: 0;
          animation: charReveal 0.5s ease-out forwards;
        }
        .hero-line-scroll {
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes aurora1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(120px, -80px) scale(1.15) rotate(5deg); }
          50% { transform: translate(-60px, -160px) scale(0.9) rotate(-3deg); }
          75% { transform: translate(90px, -40px) scale(1.1) rotate(2deg); }
        }
        @keyframes aurora2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-150px, 70px) scale(1.2) rotate(-4deg); }
          66% { transform: translate(80px, -120px) scale(0.85) rotate(6deg); }
        }
        @keyframes aurora3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          20% { transform: translate(100px, 60px) scale(1.12) rotate(3deg); }
          40% { transform: translate(-120px, -60px) scale(0.88) rotate(-5deg); }
          60% { transform: translate(50px, -130px) scale(1.15) rotate(4deg); }
          80% { transform: translate(-80px, 30px) scale(0.95) rotate(-2deg); }
        }
        @keyframes aurora4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-100px, -90px) scale(1.25); }
        }
        @keyframes aurora5 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          30% { transform: translate(130px, -60px) scale(1.15) rotate(-3deg); }
          70% { transform: translate(-90px, 80px) scale(0.9) rotate(5deg); }
        }
      `}</style>

      {/* Base gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(160deg, #fdfbfb 0%, #f5e6ea 40%, #f0e4d8 100%)",
        }}
      />

      {/* Aurora blobs */}
      <div
        className="absolute -z-[5] rounded-full blur-[80px] sm:blur-[100px]"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: 900,
          maxHeight: 900,
          top: "-30%",
          left: "-15%",
          background: "rgba(232,93,117,0.3)",
          animation: "aurora1 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -z-[5] rounded-full blur-[80px] sm:blur-[100px]"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 800,
          maxHeight: 800,
          top: "5%",
          right: "-20%",
          background: "rgba(245,160,176,0.35)",
          animation: "aurora2 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -z-[5] rounded-full blur-[80px] sm:blur-[100px]"
        style={{
          width: "75vw",
          height: "75vw",
          maxWidth: 850,
          maxHeight: 850,
          bottom: "-15%",
          left: "5%",
          background: "rgba(190,160,220,0.28)",
          animation: "aurora3 7s ease-in-out 1s infinite",
        }}
      />
      <div
        className="absolute -z-[5] rounded-full blur-[70px] sm:blur-[90px]"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: 650,
          maxHeight: 650,
          top: "25%",
          left: "20%",
          background: "rgba(250,190,140,0.25)",
          animation: "aurora4 5s ease-in-out 2s infinite",
        }}
      />
      <div
        className="absolute -z-[5] rounded-full blur-[70px] sm:blur-[90px]"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 600,
          maxHeight: 600,
          top: "0%",
          left: "40%",
          background: "rgba(232,93,117,0.22)",
          animation: "aurora5 9s ease-in-out infinite",
        }}
      />

      {/* Mouse-following gradient */}
      <div
        className="absolute inset-0 -z-[3] opacity-40 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(232, 93, 117, 0.08), transparent 60%)`,
        }}
      />

      {/* Content */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xs tracking-[6px] uppercase text-[#e85d75] mb-8"
        style={{ fontFamily: "var(--font-en)" }}
      >
        BAULIFE
      </motion.p>

      <h1 className="text-2xl sm:text-3xl md:text-[40px] font-bold leading-[1.6] tracking-wide mb-6 max-w-[720px] text-balance">
        {fullText.split("").map((char, i) => (
          <span
            key={i}
            className="hero-char"
            style={{ animationDelay: `${0.4 + i * 0.03}s` }}
          >
            {char}
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-sm sm:text-base text-[#666] max-w-[560px] leading-relaxed px-2"
      >
        人と人を繋ぐ媒介物を、クリエイターと共に生み出し、世界に届けます。
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[3px] uppercase text-[#666]"
          style={{ fontFamily: "var(--font-en)" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-[#ccc] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#e85d75] hero-line-scroll" />
        </div>
      </motion.div>
    </section>
  );
}
