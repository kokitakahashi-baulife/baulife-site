import Link from "next/link";

/// MyAtelier の3ページ(LP・プライバシー・規約)で共有する枠。
///
/// ⚠️ **配色はアプリ本体に合わせている**(Theme.swift の figmaRef)。
///    地 #0A0A0D / 差し色 ピンク→紫。サイト本体(白地・#e85d75)とは別物なので、
///    ここに本体サイトの色を持ち込まないこと。
export const metadata = {
  title: "MyAtelier — 好きなあの子も、うちの子も",
  description:
    "手持ちの写真が、番号つきの塗り絵になる iPhone / iPad アプリ。塗った時間はそのまま1本の動画になります。写真は端末の外に出ません。",
};

export default function MyAtelierLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#0A0A0D] text-[#EDEDF2]">
      {/* ⚠️ 追従させる。ページが長いので、上に戻る手段が常に要る */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0A0D]/80 backdrop-blur-xl">
        <div className="max-w-[1120px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/myatelier"
            className="text-[17px] font-bold tracking-[1px]"
            style={{ fontFamily: "var(--font-en)" }}
          >
            MyAtelier
          </Link>
          <nav className="flex items-center gap-6 text-[13px] text-[#9A9AA5]">
            <a href="#how" className="hover:text-white transition-colors">
              できること
            </a>
            <a href="#price" className="hover:text-white transition-colors">
              料金
            </a>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-white/10 px-6 py-10 text-[13px] text-[#8B8B95]">
        <div className="max-w-[1120px] mx-auto flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/myatelier/privacy" className="hover:text-white transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/myatelier/terms" className="hover:text-white transition-colors">
            利用規約
          </Link>
          <a href="mailto:koki.takahashi@baulife.world" className="hover:text-white transition-colors">
            お問い合わせ
          </a>
          <Link href="/" className="hover:text-white transition-colors">
            BAULIFE
          </Link>
          <span className="w-full sm:w-auto sm:ml-auto">&copy; 2026 BAULIFE Inc.</span>
        </div>
      </footer>
    </div>
  );
}
