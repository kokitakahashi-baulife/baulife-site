"use client";

import ScrollReveal from "./ScrollReveal";

const items: { date: string; title: string; body: string; href?: string }[] = [
  {
    date: "2026.01",
    title: "HOMU × mog it. コラボレーション商品を発売",
    body: "人気イラストレーター・小麦いとさんのブランド「mog it.」とのコラボレーションによるシーリングスタンプセットの販売を開始しました。",
    href: "https://homu.baulife.world/blogs/homu-blog/collaboration-mogit",
  },
  {
    date: "2025.12",
    title: "文具女子博@横浜パシフィコに出店",
    body: "横浜パシフィコで開催された文具女子博にHOMUとして出店。新作スタンプヘッドやイベント限定のシーリングスタンプおみくじを展開しました。",
    href: "https://homu.baulife.world/blogs/homu-blog/yokohama-pacifico",
  },
  {
    date: "2025.01",
    title: "シーリングスタンプ専門店「HOMU」始動",
    body: "BAULIFEの自社D2Cブランドとして、シーリングスタンプ専門店「HOMU」を立ち上げました。",
  },
];

export default function News() {
  return (
    <section id="news" className="py-16 sm:py-28 px-5 sm:px-6 max-w-[960px] mx-auto">
      <ScrollReveal>
        <p
          className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
          style={{ fontFamily: "var(--font-en)" }}
        >
          News
        </p>
        <h2 className="text-2xl font-bold text-center mb-14">ニュース</h2>
      </ScrollReveal>

      <ul>
        {items.map((item, i) => (
          <ScrollReveal key={item.date + item.title} delay={0.1 * i}>
            <li className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-6 border-b border-[#eee] last:border-b-0 items-baseline">
              <span
                className="text-[13px] text-[#e85d75] font-medium shrink-0 min-w-[80px]"
                style={{ fontFamily: "var(--font-en)" }}
              >
                {item.date}
              </span>
              <div>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="group">
                    <h4 className="text-[15px] font-semibold mb-1 group-hover:text-[#e85d75] transition-colors">
                      {item.title} <span className="text-[11px] text-[#e85d75]">→</span>
                    </h4>
                    <p className="text-[13px] text-[#666] leading-relaxed">
                      {item.body}
                    </p>
                  </a>
                ) : (
                  <>
                    <h4 className="text-[15px] font-semibold mb-1">{item.title}</h4>
                    <p className="text-[13px] text-[#666] leading-relaxed">
                      {item.body}
                    </p>
                  </>
                )}
              </div>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
