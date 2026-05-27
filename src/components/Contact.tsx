"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-28 px-5 sm:px-6 text-center"
      style={{
        background:
          "linear-gradient(160deg, #fdfbfb 0%, #f7e8ec 40%, #faf0e6 100%)",
      }}
    >
      <div className="max-w-[480px] mx-auto">
        <ScrollReveal>
          <p
            className="text-xs tracking-[4px] uppercase text-[#e85d75] mb-2"
            style={{ fontFamily: "var(--font-en)" }}
          >
            Contact
          </p>
          <h2 className="text-2xl font-bold mb-5">お問い合わせ</h2>
          <p className="text-sm text-[#666] mb-6">
            お問い合わせはこちらまで。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <motion.a
            href="mailto:koki.takahashi@baulife.world"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center text-sm sm:text-base font-medium text-[#e85d75] border-2 border-[#e85d75] px-5 sm:px-7 py-3 rounded-full hover:bg-[#e85d75] hover:text-white transition-colors break-all"
            style={{ fontFamily: "var(--font-en)" }}
          >
            koki.takahashi@baulife.world
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}
