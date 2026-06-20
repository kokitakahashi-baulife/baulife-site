"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#business", label: "事業内容" },
  { href: "#homu", label: "HOMU" },
  { href: "#news", label: "ニュース" },
  { href: "#company", label: "会社概要" },
  { href: "/recruit", label: "採用" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-sm backdrop-blur-xl"
            : "bg-[#faf9f7]/85 backdrop-blur-md"
        }`}
      >
        <div className="max-w-[960px] mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="font-[var(--font-en)] text-lg font-bold tracking-[3px] text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-en)" }}
          >
            BAULIFE
          </a>
          <div className="hidden md:flex gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#666] hover:text-[#1a1a1a] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#e85d75] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          <button
            className="md:hidden flex flex-col gap-[5px] w-6"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span className={`block h-[2px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[2px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[60px] z-40 bg-white/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8 pt-12">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-[#1a1a1a] font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
