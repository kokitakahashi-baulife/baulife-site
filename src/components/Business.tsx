"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const touchpoints = [
  "ライセンス管理",
  "グッズ企画・製造",
  "ブランド設計",
  "イベント企画",
  "コラボレーション",
  "公式ストア構築",
  "卸売・流通",
  "IP戦略立案",
];

export default function Business() {
  return (
    <section id="business" className="py-16 sm:py-28 px-5 sm:px-6 max-w-[960px] mx-auto">
      <ScrollReveal>
        <p
          className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
          style={{ fontFamily: "var(--font-en)" }}
        >
          What We Do
        </p>
        <h2 className="text-2xl font-bold text-center mb-14">事業内容</h2>
      </ScrollReveal>

      {/* Card 1: キャラクタープロデュース + Orbital */}
      <ScrollReveal delay={0.1}>
        <div className="bg-white border border-[#eee] rounded-2xl p-8 sm:p-12 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-13 h-13 rounded-[14px] flex items-center justify-center text-[26px] mb-5 bg-[#fff0f3]">
                🎨
              </div>
              <h3 className="text-lg font-bold mb-3">IPライセンス事業</h3>
              <p className="text-sm text-[#666] leading-relaxed">
                人と人を繋ぐ「媒介物」としてのIPを、クリエイターと共に生み出し、その価値を最大化します。キャラクター、ブランド、空間など様々なカタチのIPについて、ブランド設計からライセンス管理、グッズ展開、イベント企画まで一貫してプロデュースします。
              </p>
            </div>

            {/* Desktop: Orbital */}
            <div className="relative w-full max-w-[340px] mx-auto hidden sm:block" style={{ height: 300 }}>
              <div className="absolute rounded-full border border-dashed border-[#e0d8d4]" style={{ inset: 20 }} />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#e85d75] to-[#f5a0b0] flex flex-col items-center justify-center text-white shadow-lg shadow-[#e85d75]/20 z-10">
                <span className="text-[11px] font-bold tracking-wider">IP</span>
              </div>

              {touchpoints.map((label, i, arr) => {
                const rad = ((-90 + (360 / arr.length) * i) * Math.PI) / 180;
                return (
                  <div
                    key={label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${50 + 42 * Math.cos(rad)}%`, top: `${50 + 42 * Math.sin(rad)}%` }}
                  >
                    <div className="bg-white border border-[#eee] rounded-full px-2.5 py-1 shadow-sm whitespace-nowrap">
                      <span className="text-[10px] font-bold text-[#444]">{label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile: Tag cloud */}
            <div className="sm:hidden flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#e85d75] to-[#f5a0b0] flex flex-col items-center justify-center text-white shadow-lg shadow-[#e85d75]/20">
                <span className="text-[8px] font-bold tracking-wider">キャラクター</span>
                <span className="text-[8px] font-bold tracking-wider">IP</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {touchpoints.map((label) => (
                  <span key={label} className="bg-white border border-[#eee] rounded-full px-3 py-1.5 text-[10px] font-bold text-[#444]">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Card 2: 自社ブランドの運営 */}
      <ScrollReveal delay={0.2}>
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
          transition={{ duration: 0.3 }}
          className="bg-white border border-[#eee] rounded-2xl p-6 sm:p-9"
        >
          <div className="w-13 h-13 rounded-[14px] flex items-center justify-center text-[26px] mb-5 bg-[#fef9e7]">
            🏠
          </div>
          <h3 className="text-lg font-bold mb-3">自社ブランドの運営</h3>
          <p className="text-sm text-[#666] leading-relaxed">
            シーリングスタンプ専門店「HOMU」を企画・運営しています。オリジナルデザインのスタンプヘッドやワックスの製造から販売まで、一気通貫で手がけています。
          </p>
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
