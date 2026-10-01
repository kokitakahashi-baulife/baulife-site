import Chrome from "./Chrome";

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
      <Chrome>{children}</Chrome>
    </div>
  );
}
