import Link from "next/link";

/// MyAtelier の紹介ページ。
///
/// ⚠️ **課金の書き方はアプリの実装と必ず揃える**(2026-08-28 Koki決定):
///    無料 = 全機能・枚数制限なし・広告あり / アトリエ会員 = 広告が消えるだけ。
///    「広告は一切ありません」と書いた古い掲載文が docs/appstore に残っているが、
///    それは現行の方針ではない。審査で説明文と挙動が食い違うと差し戻される。
const features = [
  {
    title: "手持ちの写真が、塗り絵になる",
    body:
      "うちの子、家族、旅先の1枚。選ぶだけで下絵に変わります。輪郭も表情も、写真のまま残します。",
  },
  {
    title: "塗った時間が、そのまま動画に",
    body:
      "最初の一筆から完成までが1本のタイムラプスになります。たて型で書き出せるので、そのまま投稿できます。",
  },
  {
    title: "絵の具の手ざわり",
    body:
      "水彩・油彩・クレヨン。絵の具が盛り上がり、光を受けて陰影が出ます。指でも Apple Pencil でも塗れます。",
  },
  {
    title: "写真は端末から出ません",
    body:
      "変換はすべてあなたの iPhone / iPad の中で行われます。私たちのサーバーへ送っていません。解析ツールも入っていません。",
  },
];

export default function MyAtelier() {
  return (
    <main>
      <section className="max-w-[860px] mx-auto px-6 pt-20 pb-16">
        <p className="text-[13px] tracking-[2px] text-[#8B8B95] mb-5">
          iPhone / iPad
        </p>
        <h1 className="text-[34px] sm:text-[46px] font-bold leading-[1.25] mb-6">
          好きなあの子も、
          <br />
          うちの子も。
        </h1>
        <p className="text-[17px] leading-[1.9] text-[#B8B8C2] max-w-[560px]">
          手持ちの写真が塗り絵になる。塗って、飾れる一枚に。
        </p>

        <div className="mt-10 inline-flex items-center rounded-full px-6 py-3 text-[15px] font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#A855F7]">
          App Store で近日公開
        </div>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-20">
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 rounded-2xl overflow-hidden">
          {features.map((f) => (
            <div key={f.title} className="bg-[#0A0A0D] p-7">
              <h2 className="text-[17px] font-bold mb-3">{f.title}</h2>
              <p className="text-[15px] leading-[1.9] text-[#9A9AA5]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[860px] mx-auto px-6 pb-24">
        <h2 className="text-[22px] font-bold mb-6">料金</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-7">
            <p className="text-[15px] font-bold mb-2">無料</p>
            <p className="text-[15px] leading-[1.9] text-[#9A9AA5]">
              全機能が使えます。<strong className="text-[#EDEDF2] font-bold">枚数の制限はありません。</strong>
              そのかわり広告が入ります。塗っている最中と、完成した瞬間には入りません。
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 p-7">
            <p className="text-[15px] font-bold mb-2">アトリエ会員</p>
            <p className="text-[15px] leading-[1.9] text-[#9A9AA5]">
              広告が消えます。
              <strong className="text-[#EDEDF2] font-bold">それだけです。</strong>
              できることは無料と同じです。いつでも解約できます。
            </p>
          </div>
        </div>
        <p className="mt-6 text-[13px] leading-[1.9] text-[#8B8B95]">
          料金と期間はアプリ内および App Store の画面に表示されます。自動更新され、解約は
          iPhone の「設定 → Apple ID → サブスクリプション」から行えます。詳しくは
          <Link href="/myatelier/terms" className="text-[#EC4899] hover:underline mx-1">
            利用規約
          </Link>
          をご覧ください。
        </p>
      </section>
    </main>
  );
}
