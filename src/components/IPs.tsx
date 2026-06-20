"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ips } from "@/data/ips";

export default function IPs() {
  return (
    <section
      id="ips"
      className="py-16 sm:py-28 px-5 sm:px-6 bg-white border-t border-b border-[#eee]"
    >
      <div className="max-w-[960px] mx-auto">
        <ScrollReveal>
          <p
            className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
            style={{ fontFamily: "var(--font-en)" }}
          >
            Our IPs
          </p>
          <h2 className="text-2xl font-bold text-center mb-3">所属IP</h2>
          <p className="text-sm text-[#666] text-center max-w-[480px] mx-auto mb-12 leading-relaxed">
            BAULIFEと一緒に商品をつくる、クリエイターとそのキャラクターたち。
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {ips.map((ip, i) => {
            const card = (
              <motion.div
                whileHover={{ y: -4 }}
                className="group h-full rounded-2xl overflow-hidden border-2 bg-[#faf9f7] transition-shadow hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                style={{ borderColor: ip.color }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={ip.image}
                    alt={`${ip.name}（${ip.creator}）`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 300px"
                  />
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-[15px] font-bold leading-tight">
                    {ip.name}
                  </p>
                  <p className="text-[12px] text-[#888] mt-1">{ip.creator}</p>
                </div>
              </motion.div>
            );

            return (
              <ScrollReveal key={ip.name} delay={0.06 * i}>
                {ip.href ? (
                  <a
                    href={ip.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </ScrollReveal>
            );
          })}

          {/* クリエイター募集カード */}
          <ScrollReveal delay={0.06 * ips.length}>
            <Link
              href="/recruit"
              className="group flex h-full min-h-[180px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e0d8d4] px-4 py-6 text-center transition-colors hover:border-[#e85d75] hover:bg-[#fff7f8]"
            >
              <span className="text-2xl mb-2">＋</span>
              <p className="text-[14px] font-bold text-[#444] group-hover:text-[#e85d75] transition-colors leading-snug">
                あなたのIPも、ここに。
              </p>
              <p className="text-[12px] text-[#888] mt-1">クリエイター募集 →</p>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
