"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const images = [
  {
    src: "https://cdn.shopify.com/s/files/1/0635/1296/9290/files/40.png?v=1768463369",
    alt: "HOMU × mog it. コンプリートセット",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0635/1296/9290/files/IMG_3016.jpg?v=1763627987",
    alt: "シーリングスタンプ定期便",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0635/1296/9290/files/38_1.png?v=1768034622",
    alt: "HOMU × mog it. 電球 × 夜空",
  },
];

const highlights = [
  {
    title: "クリエイターとのコラボ実績",
    body: "人気クリエイター・小麦いと（mog it.）とコラボ。「流れ星にのるこぐま」「電球 × 夜空」など、キャラの世界観をシーリングスタンプに落とし込んでいます。",
  },
  {
    title: "“ずっと遊べる”文具",
    body: "ヘッド × ワックスの組み合わせは無限。集めて、つくって、手紙やギフトに封をする。毎月届く「スタンプ定期便」も人気です。",
  },
  {
    title: "お客さんに愛されている",
    body: "★5.0の高評価レビュー。ハッシュタグ「#HOMUのお便り」には、お客さんがつくった作品がSNSに続々と投稿されています。",
  },
];

const snsLinks = [
  { label: "X", href: "https://x.com/homu_baulife" },
  { label: "Instagram", href: "https://www.instagram.com/homu.baulife" },
  { label: "YouTube", href: "https://www.youtube.com/@homu-baulife" },
];

export default function AboutHomu() {
  return (
    <section className="py-14 sm:py-20 px-5 sm:px-6 bg-white border-t border-b border-[#eee] overflow-hidden">
      <div className="max-w-[760px] mx-auto">
        <ScrollReveal>
          <p
            className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
            style={{ fontFamily: "var(--font-en)" }}
          >
            About HOMU
          </p>
          <h2 className="text-2xl font-bold text-center mb-3">
            HOMUってどんなブランド？
          </h2>
          <p className="text-[15px] text-[#555] leading-[1.9] text-center max-w-[600px] mx-auto mb-10">
            HOMUは、BAULIFEが運営する<strong className="font-bold text-[#1a1a1a]">シーリングスタンプ専門の文具ブランド</strong>です。ヘッドとワックスを組み合わせて、手紙やギフトに“封”をする——自分だけの一通をつくれる文具を届けています。
          </p>
        </ScrollReveal>

        {/* 画像ギャラリー */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {images.map((img, i) => (
              <motion.div
                key={img.alt}
                whileHover={{ scale: 1.03 }}
                className={`relative rounded-2xl overflow-hidden ${
                  i === 0
                    ? "col-span-2 sm:col-span-1 h-[180px] sm:h-[200px]"
                    : "h-[140px] sm:h-[200px]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 250px"
                />
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* ハイライト */}
        <div className="space-y-3 mb-10">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.title} delay={0.1 + i * 0.06}>
              <div className="bg-[#faf9f7] border border-[#eee] rounded-2xl px-5 py-4">
                <h3 className="text-[15px] font-bold mb-1.5 text-[#1a1a1a]">
                  {h.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">{h.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA / SNS */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col items-center gap-4">
            <motion.a
              href="https://homu.baulife.world"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#e85d75] px-6 py-3 rounded-full hover:bg-[#d44d65] transition-colors"
            >
              HOMUのサイトを見る →
            </motion.a>
            <div className="flex items-center gap-4 text-[13px]">
              {snsLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#888] hover:text-[#e85d75] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
