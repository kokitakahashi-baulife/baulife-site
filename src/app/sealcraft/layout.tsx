/// Sealcraft のページの地の色。上下の帯は SiteChrome(言語ごとに文が変わるため、各ページが出す)。
/// ⚠️ 配色はアプリ本体に合わせている(Theme.swift)。サイト本体(白地・#e85d75)とも Artherapy(黒地)とも別物。
export default function SealcraftLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-[#F7EFE2] text-[#4A3426]">{children}</div>;
}
