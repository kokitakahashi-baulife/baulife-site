"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LangAutoSwitch, LangLink } from "@/components/home/client";
import { storeUrl, type ArtLang } from "./links";

const T = {
  ja: { kicker: "大人の塗り絵", features: "できること", price: "料金", privacy: "プライバシーポリシー", terms: "利用規約", contact: "お問い合わせ", other: "English" },
  en: { kicker: "Adult Coloring Book", features: "Features", price: "Pricing", privacy: "Privacy Policy (Japanese)", terms: "Terms of Use (Japanese)", contact: "Contact", other: "日本語" },
} as const;

/// Artherapy の頭と足(LP・英語LP・プライバシー・規約で共有)。言語は URL から決める
export default function Chrome({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "";
  const lang: ArtLang = path.startsWith("/artherapy/en") ? "en" : "ja";
  const isLp = path === "/artherapy" || path === "/artherapy/en";
  const t = T[lang];
  const home = lang === "en" ? "/artherapy/en" : "/artherapy";
  return (
    <div lang={lang}>
      {/* 日本語の紹介ページだけ、日本語でないブラウザの人を英語版へ(選んだ言語は覚える) */}
      {path === "/artherapy" && <LangAutoSwitch to="/artherapy/en" />}
      {/* ⚠️ 追従させる。ページが長いので、上に戻る手段が常に要る */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#F6F6F8]/85 backdrop-blur-xl">
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href={home} className="flex items-baseline gap-2">
            <span className="hidden min-[400px]:inline text-[11px] text-[#6E6875] tracking-[2px]">{t.kicker}</span>
            <span className="text-[17px] font-bold tracking-[0.5px]" style={{ fontFamily: "var(--font-en)" }}>
              Artherapy
            </span>
          </Link>
          <nav className="flex items-center gap-5 sm:gap-6 text-[13px] text-[#6E6875]">
            <a href={`${isLp ? "" : home}#features`} className="hidden sm:inline hover:text-[#2A2630] transition-colors">
              {t.features}
            </a>
            <a href={`${isLp ? "" : home}#price`} className="hidden sm:inline hover:text-[#2A2630] transition-colors">
              {t.price}
            </a>
            {isLp && (
              <span className="hover:text-[#2A2630] transition-colors">
                <LangLink href={lang === "en" ? "/artherapy" : "/artherapy/en"} lang={lang === "en" ? "ja" : "en"}>
                  {t.other}
                </LangLink>
              </span>
            )}
            <a
              href={storeUrl(lang)}
              className="rounded-full px-4 py-1.5 text-[13px] font-bold text-white bg-[#E0559E] hover:opacity-90 transition-opacity"
            >
              App Store
            </a>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-black/[0.06] px-6 py-10 text-[13px] text-[#6E6875]">
        <div className="max-w-[1120px] mx-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/artherapy/privacy" className="hover:text-[#2A2630] transition-colors">
            {t.privacy}
          </Link>
          <Link href="/artherapy/terms" className="hover:text-[#2A2630] transition-colors">
            {t.terms}
          </Link>
          <a href="mailto:koki.takahashi@baulife.world" className="hover:text-[#2A2630] transition-colors">
            {t.contact}
          </a>
          <Link href={lang === "en" ? "/en" : "/"} className="hover:text-[#2A2630] transition-colors">
            BAULIFE
          </Link>
          <span className="w-full sm:w-auto sm:ml-auto">&copy; 2026 BAULIFE Inc.</span>
        </div>
      </footer>
    </div>
  );
}
