import Image from "next/image";
import Link from "next/link";

/// MyAtelier の紹介ページ。
///
/// ⚠️ **見出しの中心は「写真が絵になる」の3幕**(2026-09-03)。競合(Color Pop)は
///    既製の塗り絵カタログが主役なので、全面に1枚の作品を敷く作りになっている。
///    こちらの差は**変換**で、それは1枚では見せられない。写真→線画→塗り上がりの
///    3枚を並べる形が、このアプリで唯一この作りになる理由。
///
/// ⚠️ **課金の書き方はアプリの実装と必ず揃える**(2026-08-28 Koki決定):
///    無料 = 全機能・枚数制限なし・広告あり / アトリエ会員 = 広告が消えるだけ。
///
/// ⚠️ **数字と利用者の声は載せない**。まだ1人も使っていない。作れば嘘になる。

const steps = [
  {
    n: "01",
    src: "/myatelier/donny-photo.jpg",
    alt: "元になった犬の写真",
    title: "あなたの写真",
    body: "うちの子でも、家族でも、旅先の1枚でも。",
  },
  {
    n: "02",
    src: "/myatelier/donny-progress.jpg",
    alt: "線に沿って色を置いていく途中の画布",
    title: "線に沿って、色を置く",
    body: "写真は端末の中だけで下絵になります。あとは番号どおりに埋めていくだけ。",
  },
  {
    n: "03",
    src: "/myatelier/donny-painted.jpg",
    alt: "塗り上がった絵",
    title: "絵になって、戻ってくる",
    body: "輪郭も表情も、写真のまま。飾れる一枚になります。",
  },
];

const catalog = [
  { line: "/myatelier/cafe-line.jpg", color: "/myatelier/cafe-color.jpg", title: "くまのカフェ" },
  { line: "/myatelier/sandwich-line.jpg", color: "/myatelier/sandwich-color.jpg", title: "サンドイッチな朝" },
];

const tools = [
  { title: "水彩・油彩・クレヨン", body: "絵の具が盛り上がり、光を受けて陰影が出ます。画材で手ざわりが変わります。" },
  { title: "指でも、Apple Pencilでも", body: "なぞって塗る筆と、タップで一気に塗るモード。どちらでも同じ絵になります。" },
  { title: "はみ出さない切り替え", body: "線の中だけに収める / 自由に塗る。いつでも1タップで行き来できます。" },
  { title: "迷ったら電球", body: "次に塗る場所まで画面が寄って、その面が光ります。回数の制限はありません。" },
];

export default function MyAtelier() {
  return (
    <main>
      {/* ───────── ヒーロー ───────── */}
      {/*
        ⚠️ **縦長の作品を横長の帯に敷いて暗幕を重ねると、ただの黒い面になる**(2026-09-03に一度やった)。
           3:4 の絵は 3:4 のまま置く。写真を後ろに、塗り上がりを手前に重ねて、
           見出しを読む前に「前と後」が分かるようにしている。
      */}
      <section className="relative overflow-hidden">
        {/* 上端の環境光。画像ではないので、どの幅でも崩れない */}
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[130px] opacity-[0.18] bg-gradient-to-r from-[#EC4899] to-[#A855F7]"
        />

        <div className="relative max-w-[1120px] mx-auto px-6 pt-16 pb-24 sm:pt-24 sm:pb-32 grid gap-14 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-[560px]">
            <p className="text-[12px] tracking-[3px] text-[#B8B8C2] mb-6">iPhone / iPad</p>
            <h1 className="text-[40px] sm:text-[60px] font-bold leading-[1.18] tracking-[-0.01em]">
              好きなあの子も、
              <br />
              うちの子も。
            </h1>
            <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.95] text-[#C6C6D0]">
              手持ちの写真が、番号つきの塗り絵になる。
              <br className="hidden sm:block" />
              塗って、飾れる一枚に。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-bold text-white bg-gradient-to-r from-[#EC4899] to-[#A855F7]">
                App Store で近日公開
              </span>
              <a
                href="#how"
                className="inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-bold border border-white/25 hover:bg-white/10 transition-colors"
              >
                何ができるのか見る
              </a>
            </div>
          </div>

          {/* 写真(後ろ) と 塗り上がり(手前) */}
          {/* ⚠️ 傾け(-5deg)と横ずらし(-6%)の分、器の幅を画面より狭くしておく。
                  幅いっぱいにすると、狭い画面でカードの角が左端で切れる(2026-09-03) */}
          <div className="relative w-[80%] max-w-[420px] mx-auto lg:w-[420px] lg:mx-0 justify-self-center lg:justify-self-end">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/10 rotate-[-5deg] translate-x-[-6%] opacity-70">
              <Image
                src="/myatelier/donny-photo.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 top-[9%] left-[10%] aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/15 rotate-[3deg] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <Image
                src="/myatelier/donny-painted.jpg"
                alt="写真から作った塗り絵を塗り上げたもの"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 3幕：写真が絵になる ───────── */}
      <section id="how" className="max-w-[1120px] mx-auto px-6 py-24 sm:py-32 scroll-mt-14">
        <p className="text-[12px] tracking-[3px] text-[#EC4899] mb-5">HOW IT WORKS</p>
        <h2 className="text-[30px] sm:text-[42px] font-bold leading-[1.35] mb-5">
          写真が、絵になる。
        </h2>
        <p className="text-[16px] leading-[1.95] text-[#9A9AA5] max-w-[560px]">
          既製の塗り絵ではありません。あなたが撮った1枚が、そのまま画布になります。
          輪郭も表情も、写真のまま残します。
        </p>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 text-[11px] font-bold tracking-[2px] px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 text-[17px] font-bold">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.9] text-[#8B8B95]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── タイムラプス ───────── */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-[1120px] mx-auto px-6 py-24 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[12px] tracking-[3px] text-[#EC4899] mb-5">TIMELAPSE</p>
            <h2 className="text-[28px] sm:text-[38px] font-bold leading-[1.4] mb-5">
              塗った時間が、
              <br />
              そのまま動画に。
            </h2>
            <p className="text-[16px] leading-[1.95] text-[#9A9AA5] max-w-[460px]">
              最初の一筆から完成までが、1本のタイムラプスになります。記録の操作は要りません。
              たて型で書き出せるので、そのまま投稿できます。
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden ring-1 ring-white/10">
            <Image
              src="/myatelier/atelier.jpg"
              alt="絵の道具が並んだ机"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ───────── カタログ ───────── */}
      <section className="max-w-[1120px] mx-auto px-6 py-24 sm:py-32">
        <p className="text-[12px] tracking-[3px] text-[#EC4899] mb-5">CATALOG</p>
        <h2 className="text-[28px] sm:text-[38px] font-bold leading-[1.4] mb-5">
          塗るだけの日も。
        </h2>
        <p className="text-[16px] leading-[1.95] text-[#9A9AA5] max-w-[560px]">
          写真を選ぶ気分でない日のために、線画も入っています。こちらは番号も色の指定もありません。
          好きな色で塗ってください。
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {catalog.map((c) => (
            <figure key={c.title}>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/10 bg-white">
                  <Image src={c.line} alt={`${c.title}の線画`} fill sizes="25vw" className="object-cover" />
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/10">
                  <Image src={c.color} alt={`${c.title}を塗ったもの`} fill sizes="25vw" className="object-cover" />
                </div>
              </div>
              <figcaption className="mt-4 text-[15px] font-bold">{c.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────── 道具 ───────── */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-[1120px] mx-auto px-6 py-24 sm:py-28">
          <p className="text-[12px] tracking-[3px] text-[#EC4899] mb-5">TOOLKIT</p>
          <h2 className="text-[28px] sm:text-[38px] font-bold leading-[1.4] mb-14">
            道具は、ぜんぶ机の上に。
          </h2>
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 rounded-2xl overflow-hidden">
            {tools.map((t) => (
              <div key={t.title} className="bg-[#0C0C10] p-8">
                <h3 className="text-[17px] font-bold mb-3">{t.title}</h3>
                <p className="text-[15px] leading-[1.95] text-[#9A9AA5]">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── プライバシー ───────── */}
      <section className="max-w-[1120px] mx-auto px-6 py-24 sm:py-32">
        <div className="rounded-3xl border border-white/10 p-10 sm:p-14 text-center">
          <p className="text-[12px] tracking-[3px] text-[#EC4899] mb-6">PRIVACY</p>
          <h2 className="text-[26px] sm:text-[36px] font-bold leading-[1.45] mb-6">
            写真は、端末から出ません。
          </h2>
          <p className="text-[16px] leading-[1.95] text-[#9A9AA5] max-w-[600px] mx-auto">
            塗り絵への変換は、すべてあなたの iPhone / iPad の中で行われます。私たちのサーバーへ送っていません。
            アクセス解析ツールも入っていません。詳しくは
            <Link href="/myatelier/privacy" className="text-[#EC4899] hover:underline mx-1">
              プライバシーポリシー
            </Link>
            に、実際にアプリが何をしているかをそのまま書いています。
          </p>
        </div>
      </section>

      {/* ───────── 料金 ───────── */}
      <section id="price" className="max-w-[1120px] mx-auto px-6 pb-28 scroll-mt-14">
        <p className="text-[12px] tracking-[3px] text-[#EC4899] mb-5">PRICING</p>
        <h2 className="text-[28px] sm:text-[38px] font-bold leading-[1.4] mb-14">料金</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 p-9">
            <p className="text-[19px] font-bold mb-4">無料</p>
            <p className="text-[15px] leading-[1.95] text-[#9A9AA5]">
              全機能が使えます。
              <strong className="text-[#EDEDF2] font-bold">枚数の制限はありません。</strong>
              そのかわり広告が入ります。
              <strong className="text-[#EDEDF2] font-bold">
                塗っている最中と、完成した瞬間には入りません。
              </strong>
            </p>
          </div>
          <div className="rounded-2xl border border-[#EC4899]/40 p-9 bg-gradient-to-b from-[#EC4899]/[0.07] to-transparent">
            <p className="text-[19px] font-bold mb-4">アトリエ会員</p>
            <p className="text-[15px] leading-[1.95] text-[#9A9AA5]">
              広告が消えます。
              <strong className="text-[#EDEDF2] font-bold">それだけです。</strong>
              できることは無料と同じです。いつでも解約できます。
            </p>
          </div>
        </div>

        <p className="mt-7 text-[13px] leading-[1.95] text-[#8B8B95] max-w-[640px]">
          料金と期間はアプリ内および App Store の画面に表示されます。自動更新され、解約は iPhone の
          「設定 → Apple ID → サブスクリプション」から行えます。詳しくは
          <Link href="/myatelier/terms" className="text-[#EC4899] hover:underline mx-1">
            利用規約
          </Link>
          をご覧ください。
        </p>
      </section>
    </main>
  );
}
