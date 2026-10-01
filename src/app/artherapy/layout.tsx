import Link from "next/link";
import { APP_STORE_URL } from "./links";

/// Artherapy の3ページ(LP・プライバシー・規約)で共有する枠。
///
/// ⚠️ **配色はアプリ本体に合わせている**(2026-10-01 からアプリの配色「雲」cloud)。
///    地 #F6F6F8 / 文字 #2A2630 / 差し色 ピンク #E0559E。サイト本体の色を持ち込まないこと。
///    (旧: 黒地 #0A0A0D の figmaRef。2026-09-27 の立ち位置変更でアプリが明るい配色になった)
export const metadata = {
  title: "大人の塗り絵 Artherapy — 1日10分、頭をゆるめる塗り絵",
  description:
    "約200点の塗り絵がすべて無料。10分か20分で塗り終わる絵から、じっくり塗る細かい絵まで。自分の写真を本格的な塗り絵にすることもできます。塗っている間、広告は出ません。iPhone / iPad。",
};

export default function ArtherapyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#F6F6F8] text-[#2A2630]">
      {/* ⚠️ 追従させる。ページが長いので、上に戻る手段が常に要る */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#F6F6F8]/85 backdrop-blur-xl">
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/artherapy" className="flex items-baseline gap-2">
            <span className="text-[11px] text-[#6E6875] tracking-[2px]">大人の塗り絵</span>
            <span className="text-[17px] font-bold tracking-[0.5px]" style={{ fontFamily: "var(--font-en)" }}>
              Artherapy
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-[13px] text-[#6E6875]">
            <a href="#features" className="hidden sm:inline hover:text-[#2A2630] transition-colors">
              できること
            </a>
            <a href="#price" className="hidden sm:inline hover:text-[#2A2630] transition-colors">
              料金
            </a>
            <a
              href={APP_STORE_URL}
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
            プライバシーポリシー
          </Link>
          <Link href="/artherapy/terms" className="hover:text-[#2A2630] transition-colors">
            利用規約
          </Link>
          <a href="mailto:koki.takahashi@baulife.world" className="hover:text-[#2A2630] transition-colors">
            お問い合わせ
          </a>
          <Link href="/" className="hover:text-[#2A2630] transition-colors">
            BAULIFE
          </Link>
          <span className="w-full sm:w-auto sm:ml-auto">&copy; 2026 BAULIFE Inc.</span>
        </div>
      </footer>
    </div>
  );
}
