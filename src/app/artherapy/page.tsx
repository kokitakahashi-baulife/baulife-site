import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL } from "./links";

/// Artherapy の紹介ページ(2026-10-01 作り直し)。
///
/// ⚠️ **立ち位置は「大人の塗り絵 Artherapy／1日10分、頭をゆるめる塗り絵」**(2026-09-27 Koki決定)。
///    文の正本はアプリの docs/appstore/listing_ja.md。ここを変えたら向こうも見る。
///    旧(〜2026-09)の「あなたの写真が、塗り絵になる」は写真変換が主役だった。今は塗り絵の時間が主役で、写真は柱の1つ。
///
/// ⚠️ **言葉づかい**(アプリの CLAUDE.md): 評価しない・効果を約束しない・「瞑想」と言わない。
///    「広告なし」とは書かない(さがす・マイリストに小さなバナーがある)。「塗っている間、広告は出ません」と書く。
///
/// ⚠️ **料金はアプリの実装と必ず揃える**(docs/monetization.md 冒頭、2026-09-30 Koki決定):
///    塗り絵は全部無料 / 特別な画材5種は有料プラン・無料は各1日5回まで / 写真から塗り絵は無料は月1枚 / 月490円・年3,000円・月額は7日間無料。
///
/// ⚠️ **ドニー(Kokiの犬)の写真は使わない**。写真の見本は ChatGPT で作った茶トラ猫(誰の私物でもない)。
/// ⚠️ **数字と利用者の声は作らない**。載せるのは事実だけ。

const catalog = [
  { src: "/artherapy/cat-stained_window_2.jpg", alt: "ステンドグラスの窓と猫の塗り絵" },
  { src: "/artherapy/cat-bouquet_4.jpg", alt: "花束の塗り絵" },
  { src: "/artherapy/cat-canal_town_2.jpg", alt: "運河の街の塗り絵" },
  { src: "/artherapy/cat-butterfly_10.jpg", alt: "蝶の塗り絵" },
  { src: "/artherapy/cat-night_market_1.jpg", alt: "夜市の塗り絵" },
  { src: "/artherapy/cat-old_bookstore_1.jpg", alt: "古書店の塗り絵" },
  { src: "/artherapy/cat-coral_reef_10.jpg", alt: "珊瑚礁の塗り絵" },
  { src: "/artherapy/cat-flower_alley_2.jpg", alt: "花の路地の塗り絵" },
];

const materials = [
  { src: "/artherapy/mat-watercolor.jpg", name: "水彩" },
  { src: "/artherapy/mat-pencil.jpg", name: "色鉛筆" },
  { src: "/artherapy/mat-oil.jpg", name: "油彩" },
  { src: "/artherapy/mat-crayon.jpg", name: "クレヨン" },
  { src: "/artherapy/mat-glitter.jpg", name: "ラメ", special: true },
  { src: "/artherapy/mat-metallic.jpg", name: "メタリック", special: true },
];

const PINK = "#E0559E";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[12px] tracking-[4px] mb-5" style={{ color: PINK, fontFamily: "var(--font-en)" }}>
      <span className="inline-block w-8 h-px" style={{ background: PINK }} />
      {children}
    </p>
  );
}

function StoreButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold text-white hover:opacity-90 transition-opacity ${className}`}
      style={{ background: PINK }}
    >
      App Store で見る <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Artherapy() {
  return (
    <main>
      {/* ───────── ヒーロー ───────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-48 right-[-10%] w-[760px] h-[560px] rounded-full blur-[140px] opacity-[0.22]"
          style={{ background: "radial-gradient(closest-side, #F3B6D3, #CFC4F2 60%, transparent)" }}
        />
        <div className="relative max-w-[1120px] mx-auto px-6 pt-14 pb-20 sm:pt-20 sm:pb-28 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-[540px]">
            <div className="flex items-center gap-4 mb-8">
              <Image src="/artherapy/appicon.png" alt="Artherapy のアプリアイコン" width={64} height={64} className="rounded-[22.37%] shadow-[0_8px_24px_rgba(60,50,80,0.18)]" />
              <div>
                <p className="text-[12px] tracking-[2px] text-[#6E6875]">大人の塗り絵</p>
                <p className="text-[19px] font-bold leading-tight" style={{ fontFamily: "var(--font-en)" }}>Artherapy</p>
              </div>
            </div>
            <h1 className="text-[36px] sm:text-[54px] font-bold leading-[1.3] tracking-[-0.01em]">
              1日10分、
              <br />
              頭をゆるめる塗り絵
            </h1>
            <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.95] text-[#4A4552]">
              気持ちをひとつ選んで、深呼吸して、好きな色を置いていくだけ。
              <br className="hidden sm:block" />
              約200点の塗り絵が、すべて無料で塗れます。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <StoreButton />
              <span className="text-[13px] text-[#6E6875]">iPhone / iPad ・ 基本無料</span>
            </div>
          </div>
          <div className="w-full max-w-[460px] mx-auto lg:w-[460px] justify-self-center">
            <div className="relative aspect-square rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(60,50,80,0.35)] ring-1 ring-black/[0.04]">
              <video
                src="/home/artherapy.mp4"
                poster="/home/artherapy-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Artherapy の紹介動画"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 塗り絵はすべて無料 ───────── */}
      <section id="features" className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 scroll-mt-14">
        <Eyebrow>COLORING</Eyebrow>
        <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">約200点、すべて無料</h2>
        <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[600px]">
          花、風景、動物、街、かみもの。10分で塗れる絵、20分で塗れる絵、じっくり時間をかける細かい絵まで。新しい絵も増えていきます。
        </p>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {catalog.map((c) => (
            <div key={c.src} className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-[0_10px_30px_-12px_rgba(60,50,80,0.25)]">
              <Image src={c.src} alt={c.alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-white px-7 py-6 text-[15px] leading-[1.9] text-[#4A4552] ring-1 ring-black/[0.04]">
          <strong className="text-[#2A2630]">塗っている間、広告は出ません。</strong>
          塗る画面と、塗り終えた瞬間には広告を出しません。さがす画面とマイリストに、小さなバナーがあるだけです。
        </div>
      </section>

      {/* ───────── 画材 ───────── */}
      <section className="bg-white border-y border-black/[0.05]">
        <div className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28">
          <Eyebrow>MATERIALS</Eyebrow>
          <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">画材を変えると、手ざわりが変わる</h2>
          <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[620px]">
            水彩、油彩、色鉛筆、クレヨン、マーカー、エアブラシ。同じ色でも、画材で仕上がりが変わります。
            ラメ・メタリック・大理石・木目・ネオンの特別な画材も、毎日5回ずつ無料で試せます。
          </p>
          <div className="mt-12 grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {materials.map((m) => (
              <figure key={m.src}>
                <div className="relative aspect-square rounded-full overflow-hidden ring-1 ring-black/[0.06] shadow-[0_10px_24px_-12px_rgba(60,50,80,0.3)]">
                  <Image src={m.src} alt={`${m.name}で塗った見本`} fill sizes="(max-width: 640px) 33vw, 16vw" className="object-cover scale-[1.35]" />
                </div>
                <figcaption className="mt-3 text-center text-[13px] font-bold">
                  {m.name}
                  {m.special && <span className="block text-[11px] font-normal" style={{ color: PINK }}>特別な画材</span>}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-[#6E6875]">指でも Apple Pencil でも塗れます。iPhone でも iPad でも。</p>
        </div>
      </section>

      {/* ───────── 写真から ───────── */}
      <section className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>PHOTO</Eyebrow>
          <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">
            自分の写真で、
            <br />
            本格的な塗り絵
          </h2>
          <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[480px]">
            ペットや家族の写真を選ぶと、番号つきの塗り絵になります。番号どおりに塗っていくと、写真が少しずつ絵になっていきます。
          </p>
          <p className="mt-5 text-[14px] leading-[1.9] text-[#6E6875] max-w-[480px]">
            変換はすべて端末の中で行い、写真をどこにも送りません。無料プランでは月1枚まで作れます。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <figure>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_16px_40px_-16px_rgba(60,50,80,0.35)]">
              <Image src="/artherapy/photo-before.jpg" alt="元の写真(茶トラの猫)" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-[13px] text-[#6E6875]">写真</figcaption>
          </figure>
          <figure className="mt-10">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_16px_40px_-16px_rgba(60,50,80,0.35)]">
              <Image src="/artherapy/photo-after.jpg" alt="写真から作った塗り絵を油彩で塗ったもの" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-[13px] text-[#6E6875]">油彩で塗った絵</figcaption>
          </figure>
        </div>
      </section>

      {/* ───────── きろく ───────── */}
      <section className="bg-white border-y border-black/[0.05]">
        <div className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Eyebrow>DIARY</Eyebrow>
            <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">塗った日の気持ちを、カレンダーに</h2>
            <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[520px]">
              塗る前と後に、気持ちの顔をひとつ選べます。塗った日にはその日の顔が残り、あとから見返せます。
            </p>
            <p className="mt-5 text-[14px] leading-[1.9] text-[#6E6875] max-w-[520px]">
              記録はあなたの端末と iCloud にだけ残ります。ヘルスケアの「マインドフルネス」にも記録できます。
              気持ちはご自身で選んだものです(医療機器ではありません)。
            </p>
          </div>
          <div className="w-[260px] sm:w-[300px] mx-auto rounded-[44px] bg-[#1A191B] p-[10px] shadow-[0_30px_70px_-20px_rgba(60,50,80,0.45)]">
            <div className="relative aspect-[620/1345] rounded-[36px] overflow-hidden">
              <Image src="/artherapy/kiroku-screen.jpg" alt="きろくの画面。塗った日に気持ちの顔が並ぶカレンダー" fill sizes="300px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 料金 ───────── */}
      <section id="price" className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 scroll-mt-14">
        <Eyebrow>PRICING</Eyebrow>
        <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-12">料金</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-9 ring-1 ring-black/[0.05]">
            <p className="text-[19px] font-bold mb-5">無料</p>
            <ul className="space-y-3 text-[15px] leading-[1.8] text-[#4A4552]">
              <li>・約200点の塗り絵が、すべて塗れる</li>
              <li>・基本の画材が使える。特別な画材は1日5回ずつ試せる</li>
              <li>・写真から塗り絵を、月1枚</li>
              <li>・塗っている間、広告は出ません(さがす・マイリストに小さなバナーがあります)</li>
            </ul>
          </div>
          <div className="rounded-2xl p-9 ring-1" style={{ background: "linear-gradient(180deg, #FDF0F6 0%, #FFFFFF 70%)", borderColor: PINK, boxShadow: `inset 0 0 0 1px ${PINK}55` }}>
            <p className="text-[19px] font-bold mb-1">有料プラン</p>
            <p className="text-[14px] mb-5" style={{ color: PINK }}>月額 490円 / 年額 3,000円 ・ 月額は7日間無料</p>
            <ul className="space-y-3 text-[15px] leading-[1.8] text-[#4A4552]">
              <li>・特別な画材5種(ラメ・メタリック・大理石・木目・ネオン)が使い放題</li>
              <li>・写真から塗り絵が何枚でも</li>
              <li>・広告なし</li>
              <li>・シール・ポストカード用の書き出し</li>
            </ul>
          </div>
        </div>
        <p className="mt-7 text-[13px] leading-[1.95] text-[#6E6875] max-w-[680px]">
          料金はアプリ内および App Store の画面に表示されます。お支払いは Apple ID に請求され、期間終了の24時間前までに解約しない限り自動で更新されます。
          解約は iPhone の「設定 → Apple ID → サブスクリプション」からいつでもできます。詳しくは
          <Link href="/artherapy/terms" className="hover:underline mx-1" style={{ color: PINK }}>
            利用規約
          </Link>
          をご覧ください。
        </p>
      </section>

      {/* ───────── プライバシー ───────── */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-white p-10 sm:p-14 text-center ring-1 ring-black/[0.05]">
          <Eyebrow>PRIVACY</Eyebrow>
          <h2 className="text-[24px] sm:text-[34px] font-bold leading-[1.45] mb-6">写真は、端末から出ません。</h2>
          <p className="text-[15px] leading-[1.95] text-[#4A4552] max-w-[600px] mx-auto">
            写真から塗り絵への変換は、すべてあなたの iPhone / iPad の中で行われます。私たちのサーバーへは送りません。詳しくは
            <Link href="/artherapy/privacy" className="hover:underline mx-1" style={{ color: PINK }}>
              プライバシーポリシー
            </Link>
            をご覧ください。
          </p>
          <div className="mt-10">
            <StoreButton />
          </div>
        </div>
      </section>
    </main>
  );
}
