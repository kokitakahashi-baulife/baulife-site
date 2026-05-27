"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

const images = [
  {
    src: "https://cdn.shopify.com/s/files/1/0635/1296/9290/files/IMG_3016.jpg?v=1763627987",
    alt: "シーリングスタンプ定期便",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0635/1296/9290/files/40.png?v=1768463369",
    alt: "HOMU × mog it. コンプリートセット",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0635/1296/9290/files/38_1.png?v=1768034622",
    alt: "HOMU × mog it. 電球 × 夜空",
  },
];

export default function Homu() {
  return (
    <section
      id="homu"
      className="py-16 sm:py-28 px-5 sm:px-6 bg-white border-t border-b border-[#eee] overflow-hidden"
    >
      <div className="max-w-[960px] mx-auto">
        <ScrollReveal>
          <p
            className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
            style={{ fontFamily: "var(--font-en)" }}
          >
            Our Brand
          </p>
          <h2 className="text-2xl font-bold text-center mb-14">HOMU</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text */}
          <ScrollReveal>
            <p className="text-sm text-[#e85d75] font-medium mb-5">
              シーリングスタンプ専門店
            </p>
            <p className="text-sm text-[#666] leading-relaxed mb-4">
              BAULIFEが運営するD2Cブランド。オリジナルデザインのスタンプヘッドやワックスを企画・製造し、毎月届く「スタンプ定期便」を中心に、シーリングスタンプの楽しさを届けています。
            </p>
            <p className="text-sm text-[#666] leading-relaxed mb-5">
              人気クリエイター・小麦いとさん（mog it.）とのコラボレーション商品も展開中。
            </p>

            {/* Judge.me Reviews */}
            <div className="inline-flex items-center gap-3 bg-[#fffbe6] rounded-xl px-4 py-3 mb-6">
              <span className="text-[13px] text-[#666] font-medium">
                judge.me
              </span>
              <span className="text-[#f5a623] text-lg tracking-wider">
                ★★★★★
              </span>
              <span className="text-[13px] text-[#666] font-medium">
                5.0（22件）
              </span>
            </div>

            <br />
            <motion.a
              href="https://homu.baulife.world"
              target="_blank"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#e85d75] px-6 py-3 rounded-full hover:bg-[#d44d65] transition-colors"
            >
              HOMUを見る →
            </motion.a>
          </ScrollReveal>

          {/* Gallery */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <motion.div
                  key={img.alt}
                  whileHover={{ scale: 1.03 }}
                  className={`relative rounded-2xl overflow-hidden ${
                    i === 0 ? "col-span-2 h-[180px] sm:h-[220px]" : "h-[140px] sm:h-[180px]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 460px"
                  />
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
