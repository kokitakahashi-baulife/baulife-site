import Link from "next/link";
import { CONTACT_URL } from "./legal";

/// SealCraft の3ページ(LP・プライバシー・規約)で共有する枠。
///
/// ⚠️ **配色はアプリ本体に合わせている**(Theme.swift: 生成りの紙・封蝋の赤・こげ茶の線)。
///    サイト本体(白地・#e85d75)とも Artherapy(黒地)とも別物。ここに他の色を持ち込まないこと。
/// ⚠️ 問い合わせ先は HOMU のお問い合わせページ(2026-09-28 Koki確定。アプリの Content/legal.json と同じ)。
export const metadata = {
  title: "SealCraft — 手紙に封蝋を押す、ほのぼのマージ",
  description:
    "坂の途中の封蝋工房で、見習いのリリと手紙のお手伝い。重ねて作った材料で金型を仕上げ、ワックスを溶かして、自分の指で垂らして押す。世界にひとつの封蝋を集めるマージゲーム。",
};

export default function SealcraftLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#F7EFE2] text-[#4A3426]">
      <header className="sticky top-0 z-50 border-b border-[#4A3426]/10 bg-[#F7EFE2]/85 backdrop-blur-xl">
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/sealcraft"
            className="text-[17px] font-bold tracking-[1px]"
            style={{ fontFamily: "var(--font-en)" }}
          >
            SealCraft
          </Link>
          <nav className="flex items-center gap-6 text-[13px] text-[#7A6150]">
            <a href="/sealcraft#play" className="hover:text-[#B4382F] transition-colors">
              あそびかた
            </a>
            <a href="/sealcraft#price" className="hover:text-[#B4382F] transition-colors">
              料金
            </a>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-[#4A3426]/10 px-6 py-10 text-[13px] text-[#7A6150]">
        <div className="max-w-[1120px] mx-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/sealcraft/privacy" className="hover:text-[#B4382F] transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/sealcraft/terms" className="hover:text-[#B4382F] transition-colors">
            利用規約
          </Link>
          <a href={CONTACT_URL} className="hover:text-[#B4382F] transition-colors">
            お問い合わせ
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
