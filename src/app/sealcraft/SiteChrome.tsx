import Link from "next/link";
import { COPY, LANGS, base, type Lang } from "./copy";
import { CONTACT_URL } from "./legal";

/// SealCraft のページの上下(見出しの帯・言語の切り替え・足もとのリンク)。4言語で同じ作り。
/// ⚠️ 配色はアプリ本体に合わせている(Theme.swift: 生成りの紙・封蝋の赤・こげ茶の線)。サイト本体・Artherapy の色を持ち込まない。
/// ⚠️ 問い合わせ先は HOMU のお問い合わせページ(2026-09-28 Koki確定。アプリの Content/legal.json と同じ)。
export default function SiteChrome({ lang, path = "", children }: { lang: Lang; path?: "" | "/privacy" | "/terms"; children: React.ReactNode }) {
  const c = COPY[lang];
  const home = base(lang);
  return (
    <div lang={LANGS.find((l) => l.lang === lang)?.htmlLang}>
      <header className="sticky top-0 z-50 border-b border-[#4A3426]/10 bg-[#F7EFE2]/85 backdrop-blur-xl">
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <Link href={home} className="text-[17px] font-bold tracking-[1px]" style={{ fontFamily: "var(--font-en)" }}>
            SealCraft
          </Link>
          <nav className="flex items-center gap-5 text-[13px] text-[#7A6150]">
            <a href={`${home}#play`} className="hidden sm:inline hover:text-[#B4382F] transition-colors">
              {c.nav.play}
            </a>
            <a href={`${home}#price`} className="hidden sm:inline hover:text-[#B4382F] transition-colors">
              {c.nav.price}
            </a>
            {/* 言語の切り替え: 同じページの別の言語へ */}
            <span className="flex items-center gap-2">
              {LANGS.map((l) => (
                <Link
                  key={l.lang}
                  href={`${base(l.lang)}${path}`}
                  hrefLang={l.htmlLang}
                  className={l.lang === lang ? "font-bold text-[#4A3426]" : "hover:text-[#B4382F] transition-colors"}
                >
                  {l.label}
                </Link>
              ))}
            </span>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-[#4A3426]/10 px-6 py-10 text-[13px] text-[#7A6150]">
        <div className="max-w-[1120px] mx-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={`${home}/privacy`} className="hover:text-[#B4382F] transition-colors">
            {c.footer.privacy}
          </Link>
          <Link href={`${home}/terms`} className="hover:text-[#B4382F] transition-colors">
            {c.footer.terms}
          </Link>
          <a href={CONTACT_URL} className="hover:text-[#B4382F] transition-colors">
            {c.footer.contact}
          </a>
          <Link href="/" className="hover:text-[#B4382F] transition-colors">
            BAULIFE
          </Link>
          <span className="w-full sm:w-auto sm:ml-auto">&copy; 2026 BAULIFE Inc.</span>
        </div>
      </footer>
    </div>
  );
}
