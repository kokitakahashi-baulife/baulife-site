import Link from "next/link";

export const metadata = {
  title: "社内ポータル — BAULIFE",
  robots: { index: false, follow: false },
};

type Tool = {
  name: string;
  description: string;
  href: string;
  tag?: string;
};

const tools: Tool[] = [
  {
    name: "コラボ企画書エディター",
    description:
      "HOMUのクリエイターコラボ用「オファー資料」「企画書」を、入力＋画像アップで作成。PDF出力・.json保存に対応。",
    href: "/tools/kikaku.html",
    tag: "HOMU",
  },
];

export default function ToolsPortal() {
  return (
    <>
      <header className="px-6 py-4 border-b border-[#eee] bg-white/90 backdrop-blur-xl">
        <Link
          href="/"
          className="text-lg font-bold tracking-[3px] text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-en)" }}
        >
          BAULIFE
        </Link>
      </header>

      <div className="max-w-[820px] mx-auto px-6 py-12 pb-20">
        <p
          className="text-xs tracking-[2px] text-[#e85d75] mb-1"
          style={{ fontFamily: "var(--font-en)" }}
        >
          INTERNAL PORTAL
        </p>
        <h1 className="text-[28px] font-bold mb-2">社内ポータル</h1>
        <p className="text-sm text-[#999] mb-10">
          社内限定のツールをまとめています。各ツールへのリンク集です。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="group block rounded-2xl border border-[#eee] bg-white p-5 transition-colors hover:border-[#e85d75]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[15px] font-bold text-[#1a1a1a]">
                  {t.name}
                </span>
                {t.tag && (
                  <span className="text-[10px] tracking-wide text-[#e85d75] border border-[#f3c5cf] rounded-full px-2 py-[1px]">
                    {t.tag}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-[#666] leading-relaxed mb-3">
                {t.description}
              </p>
              <span className="text-[13px] text-[#999] group-hover:text-[#e85d75] transition-colors">
                開く →
              </span>
            </a>
          ))}
        </div>

        <p className="text-xs text-[#bbb] mt-10">
          ※ このページは社内限定です。ツールは順次追加します。
        </p>
      </div>

      <footer className="py-8 px-6 text-center border-t border-[#eee] text-[13px] text-[#aaa]">
        &copy; 2026 BAULIFE Inc. All rights reserved.
      </footer>
    </>
  );
}
