import Image from "next/image";
import Link from "next/link";
import { storeUrl, type ArtLang } from "./links";

/// Artherapy の紹介ページ(2026-10-01 作り直し)。日本語 /artherapy・英語 /artherapy/en で共有する。
/// 英語の文はアプリのストア掲載(ios/i18n/listing_en-US.json)にそろえる。英語版では円の値段を書かない(国ごとに違う)。
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

const CATALOG = [
  ["/artherapy/cat-stained_window_2.jpg", "ステンドグラスの窓と猫の塗り絵", "Stained-glass window with a cat"],
  ["/artherapy/cat-bouquet_4.jpg", "花束の塗り絵", "Bouquet"],
  ["/artherapy/cat-canal_town_2.jpg", "運河の街の塗り絵", "Canal town"],
  ["/artherapy/cat-butterfly_10.jpg", "蝶の塗り絵", "Butterfly"],
  ["/artherapy/cat-night_market_1.jpg", "夜市の塗り絵", "Night market"],
  ["/artherapy/cat-old_bookstore_1.jpg", "古書店の塗り絵", "Old bookstore"],
  ["/artherapy/cat-coral_reef_10.jpg", "珊瑚礁の塗り絵", "Coral reef"],
  ["/artherapy/cat-flower_alley_2.jpg", "花の路地の塗り絵", "Flower alley"],
] as const;

const MATERIALS = [
  { src: "/artherapy/mat-watercolor.jpg", ja: "水彩", en: "Watercolor" },
  { src: "/artherapy/mat-pencil.jpg", ja: "色鉛筆", en: "Colored pencil" },
  { src: "/artherapy/mat-oil.jpg", ja: "油彩", en: "Oil" },
  { src: "/artherapy/mat-crayon.jpg", ja: "クレヨン", en: "Crayon" },
  { src: "/artherapy/mat-glitter.jpg", ja: "ラメ", en: "Glitter", special: true },
  { src: "/artherapy/mat-metallic.jpg", ja: "メタリック", en: "Metallic", special: true },
];

const T = {
  ja: {
    store: "App Store で見る",
    iconAlt: "Artherapy のアプリアイコン",
    kicker: "大人の塗り絵",
    h1: ["1日10分、", "頭をゆるめる塗り絵"],
    lead: ["気持ちをひとつ選んで、深呼吸して、好きな色を置いていくだけ。", "約200点の塗り絵が、すべて無料で塗れます。"],
    platform: "iPhone / iPad ・ 基本無料",
    videoLabel: "Artherapy の紹介動画",
    freeH: "約200点、すべて無料",
    freeP: "花、風景、動物、街、かみもの。10分で塗れる絵、20分で塗れる絵、じっくり時間をかける細かい絵まで。新しい絵も増えていきます。",
    noAdsH: "塗っている間、広告は出ません。",
    noAdsP: "塗る画面と、塗り終えた瞬間には広告を出しません。さがす画面とマイリストに、小さなバナーがあるだけです。",
    matH: "画材を変えると、手ざわりが変わる",
    matP: "水彩、油彩、色鉛筆、クレヨン、マーカー、エアブラシ。同じ色でも、画材で仕上がりが変わります。ラメ・メタリック・大理石・木目・ネオンの特別な画材も、毎日5回ずつ無料で試せます。",
    matAlt: (n: string) => `${n}で塗った見本`,
    special: "特別な画材",
    pencil: "指でも Apple Pencil でも塗れます。iPhone でも iPad でも。",
    photoH: ["自分の写真で、", "本格的な塗り絵"],
    photoP: "ペットや家族の写真を選ぶと、番号つきの塗り絵になります。番号どおりに塗っていくと、写真が少しずつ絵になっていきます。",
    photoNote: "変換はすべて端末の中で行い、写真をどこにも送りません。無料プランでは月1枚まで作れます。",
    beforeAlt: "元の写真(茶トラの猫)",
    before: "写真",
    afterAlt: "写真から作った塗り絵を油彩で塗ったもの",
    after: "油彩で塗った絵",
    diaryH: "塗った日の気持ちを、カレンダーに",
    diaryP: "塗る前と後に、気持ちの顔をひとつ選べます。塗った日にはその日の顔が残り、あとから見返せます。",
    diaryNote: "記録はあなたの端末と iCloud にだけ残ります。ヘルスケアの「マインドフルネス」にも記録できます。気持ちはご自身で選んだものです(医療機器ではありません)。",
    diaryShot: "/artherapy/kiroku-screen.jpg",
    diaryAlt: "きろくの画面。塗った日に気持ちの顔が並ぶカレンダー",
    priceH: "料金",
    freePlan: "無料",
    freeList: [
      "約200点の塗り絵が、すべて塗れる",
      "基本の画材が使える。特別な画材は1日5回ずつ試せる",
      "写真から塗り絵を、月1枚",
      "塗っている間、広告は出ません(さがす・マイリストに小さなバナーがあります)",
    ],
    paidPlan: "有料プラン",
    paidPrice: "月額 490円 / 年額 3,000円 ・ 月額は7日間無料",
    paidList: ["特別な画材5種(ラメ・メタリック・大理石・木目・ネオン)が使い放題", "写真から塗り絵が何枚でも", "広告なし", "シール・ポストカード用の書き出し"],
    billing: [
      "料金はアプリ内および App Store の画面に表示されます。お支払いは Apple ID に請求され、期間終了の24時間前までに解約しない限り自動で更新されます。解約は iPhone の「設定 → Apple ID → サブスクリプション」からいつでもできます。詳しくは",
      "利用規約",
      "をご覧ください。",
    ],
    privH: "写真は、端末から出ません。",
    privP: ["写真から塗り絵への変換は、すべてあなたの iPhone / iPad の中で行われます。私たちのサーバーへは送りません。詳しくは", "プライバシーポリシー", "をご覧ください。"],
  },
  en: {
    store: "View on the App Store",
    iconAlt: "Artherapy app icon",
    kicker: "Adult Coloring Book",
    h1: ["10 minutes a day", "to unwind"],
    lead: ["Pick how you feel, take a breath, and lay down the colors you love.", "About 200 coloring pages, all free to color."],
    platform: "iPhone / iPad · Free to start",
    videoLabel: "Artherapy trailer",
    freeH: "About 200 pages, all free",
    freeP: "Flowers, landscapes, animals, cities and more. Some take 10 minutes, some take 20, and some are detailed pieces to savor slowly. New pages are added regularly.",
    noAdsH: "No ads while you color.",
    noAdsP: "No ads appear on the coloring screen or when you finish a piece. There are only small banners on the Browse and My List screens.",
    matH: "Materials you can feel",
    matP: "Watercolor, oil, colored pencil, crayon, marker and airbrush. Switch materials and the same color takes on a whole new texture. Five special materials — glitter, metallic, marble, wood and neon — can each be tried free 5 times a day.",
    matAlt: (n: string) => `Sample colored with ${n.toLowerCase()}`,
    special: "Special",
    pencil: "Color with your finger or with Apple Pencil, on iPhone or iPad.",
    photoH: ["Your own photo,", "now a coloring page"],
    photoP: "Choose a photo of your pet or your family, and it becomes a color-by-number page. Fill in the numbers and watch your photo slowly turn into a painting.",
    photoNote: "The conversion happens entirely on your device. Your photos are never sent anywhere. The free plan includes 1 photo per month.",
    beforeAlt: "Original photo of a ginger cat",
    before: "Photo",
    afterAlt: "The coloring page made from the photo, colored in oil",
    after: "Colored in oil",
    diaryH: "Your days, on a calendar",
    diaryP: "Before and after coloring, pick a face that matches your mood. Each day you color keeps that face, so you can look back on it later.",
    diaryNote: "Your records stay only on your device and in iCloud. You can also log Mindful Minutes to Apple Health. Moods are your own choice — this app is not a medical device.",
    diaryShot: "/artherapy/kiroku-screen-en.jpg",
    diaryAlt: "The diary screen: a calendar with a mood face on each day you colored",
    priceH: "Pricing",
    freePlan: "Free",
    freeList: [
      "Color all ~200 pages",
      "Basic materials included; try each special material 5 times a day",
      "1 photo-to-coloring page per month",
      "No ads while you color (small banners on Browse and My List)",
    ],
    paidPlan: "Artherapy Premium",
    paidPrice: "Monthly or yearly · 7-day free trial on monthly",
    paidList: ["All 5 special materials (glitter, metallic, marble, wood, neon), unlimited", "Unlimited photo-to-coloring pages", "No ads", "Printable exports for stickers and postcards"],
    billing: [
      "Prices are shown in the app and on the App Store in your local currency. Payment is charged to your Apple ID, and subscriptions renew automatically unless canceled at least 24 hours before the end of the current period. You can cancel anytime in Settings → Apple ID → Subscriptions. See the",
      "Terms of Use (Japanese)",
      "for details.",
    ],
    privH: "Your photos never leave your device.",
    privP: ["Turning a photo into a coloring page happens entirely on your iPhone or iPad. Nothing is sent to our servers. See the", "Privacy Policy (Japanese)", "for details."],
  },
} as const;

const PINK = "#E0559E";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[12px] tracking-[4px] mb-5" style={{ color: PINK, fontFamily: "var(--font-en)" }}>
      <span className="inline-block w-8 h-px" style={{ background: PINK }} />
      {children}
    </p>
  );
}

function StoreButton({ lang, className = "" }: { lang: ArtLang; className?: string }) {
  return (
    <a
      href={storeUrl(lang)}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold text-white hover:opacity-90 transition-opacity ${className}`}
      style={{ background: PINK }}
    >
      {T[lang].store} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function LandingPage({ lang }: { lang: ArtLang }) {
  const t = T[lang];
  const en = lang === "en";
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
              <Image src="/artherapy/appicon.png" alt={t.iconAlt} width={64} height={64} className="rounded-[22.37%] shadow-[0_8px_24px_rgba(60,50,80,0.18)]" />
              <div>
                <p className="text-[12px] tracking-[2px] text-[#6E6875]">{t.kicker}</p>
                <p className="text-[19px] font-bold leading-tight" style={{ fontFamily: "var(--font-en)" }}>Artherapy</p>
              </div>
            </div>
            <h1 className="text-[36px] sm:text-[54px] font-bold leading-[1.3] tracking-[-0.01em]">
              {t.h1[0]}
              <br />
              {t.h1[1]}
            </h1>
            <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.95] text-[#4A4552]">
              {t.lead[0]}
              <br className="hidden sm:block" />
              {en ? " " : ""}{t.lead[1]}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <StoreButton lang={lang} />
              <span className="text-[13px] text-[#6E6875]">{t.platform}</span>
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
                aria-label={t.videoLabel}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 塗り絵はすべて無料 ───────── */}
      <section id="features" className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 scroll-mt-14">
        <Eyebrow>COLORING</Eyebrow>
        <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">{t.freeH}</h2>
        <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[600px]">
          {t.freeP}
        </p>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATALOG.map(([src, ja, enAlt]) => (
            <div key={src} className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-[0_10px_30px_-12px_rgba(60,50,80,0.25)]">
              <Image src={src} alt={en ? enAlt : ja} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-white px-7 py-6 text-[15px] leading-[1.9] text-[#4A4552] ring-1 ring-black/[0.04]">
          <strong className="text-[#2A2630]">{t.noAdsH}</strong>{en ? " " : ""}
          {t.noAdsP}
        </div>
      </section>

      {/* ───────── 画材 ───────── */}
      <section className="bg-white border-y border-black/[0.05]">
        <div className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28">
          <Eyebrow>MATERIALS</Eyebrow>
          <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">{t.matH}</h2>
          <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[620px]">
            {t.matP}
          </p>
          <div className="mt-12 grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {MATERIALS.map((m) => (
              <figure key={m.src}>
                <div className="relative aspect-square rounded-full overflow-hidden ring-1 ring-black/[0.06] shadow-[0_10px_24px_-12px_rgba(60,50,80,0.3)]">
                  <Image src={m.src} alt={t.matAlt(m[lang])} fill sizes="(max-width: 640px) 33vw, 16vw" className="object-cover scale-[1.35]" />
                </div>
                <figcaption className="mt-3 text-center text-[13px] font-bold">
                  {m[lang]}
                  {m.special && <span className="block text-[11px] font-normal" style={{ color: PINK }}>{t.special}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-[13px] text-[#6E6875]">{t.pencil}</p>
        </div>
      </section>

      {/* ───────── 写真から ───────── */}
      <section className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>PHOTO</Eyebrow>
          <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">
            {t.photoH[0]}
            <br />
            {t.photoH[1]}
          </h2>
          <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[480px]">
            {t.photoP}
          </p>
          <p className="mt-5 text-[14px] leading-[1.9] text-[#6E6875] max-w-[480px]">
            {t.photoNote}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <figure>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_16px_40px_-16px_rgba(60,50,80,0.35)]">
              <Image src="/artherapy/photo-before.jpg" alt={t.beforeAlt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-[13px] text-[#6E6875]">{t.before}</figcaption>
          </figure>
          <figure className="mt-10">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_16px_40px_-16px_rgba(60,50,80,0.35)]">
              <Image src="/artherapy/photo-after.jpg" alt={t.afterAlt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-[13px] text-[#6E6875]">{t.after}</figcaption>
          </figure>
        </div>
      </section>

      {/* ───────── きろく ───────── */}
      <section className="bg-white border-y border-black/[0.05]">
        <div className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Eyebrow>DIARY</Eyebrow>
            <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-5">{t.diaryH}</h2>
            <p className="text-[16px] leading-[1.95] text-[#4A4552] max-w-[520px]">
              {t.diaryP}
            </p>
            <p className="mt-5 text-[14px] leading-[1.9] text-[#6E6875] max-w-[520px]">
              {t.diaryNote}
            </p>
          </div>
          <div className="w-[260px] sm:w-[300px] mx-auto rounded-[44px] bg-[#1A191B] p-[10px] shadow-[0_30px_70px_-20px_rgba(60,50,80,0.45)]">
            <div className="relative aspect-[620/1345] rounded-[36px] overflow-hidden">
              <Image src={t.diaryShot} alt={t.diaryAlt} fill sizes="300px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 料金 ───────── */}
      <section id="price" className="max-w-[1120px] mx-auto px-6 py-20 sm:py-28 scroll-mt-14">
        <Eyebrow>PRICING</Eyebrow>
        <h2 className="text-[28px] sm:text-[40px] font-bold leading-[1.4] mb-12">{t.priceH}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-9 ring-1 ring-black/[0.05]">
            <p className="text-[19px] font-bold mb-5">{t.freePlan}</p>
            <ul className="space-y-3 text-[15px] leading-[1.8] text-[#4A4552]">
              {t.freeList.map((li) => (
                <li key={li}>・{li}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-9 ring-1" style={{ background: "linear-gradient(180deg, #FDF0F6 0%, #FFFFFF 70%)", borderColor: PINK, boxShadow: `inset 0 0 0 1px ${PINK}55` }}>
            <p className="text-[19px] font-bold mb-1">{t.paidPlan}</p>
            <p className="text-[14px] mb-5" style={{ color: PINK }}>{t.paidPrice}</p>
            <ul className="space-y-3 text-[15px] leading-[1.8] text-[#4A4552]">
              {t.paidList.map((li) => (
                <li key={li}>・{li}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-7 text-[13px] leading-[1.95] text-[#6E6875] max-w-[680px]">
          {t.billing[0]}
          <Link href="/artherapy/terms" className="hover:underline mx-1" style={{ color: PINK }}>
            {t.billing[1]}
          </Link>
          {t.billing[2]}
        </p>
      </section>

      {/* ───────── プライバシー ───────── */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-white p-10 sm:p-14 text-center ring-1 ring-black/[0.05]">
          <Eyebrow>PRIVACY</Eyebrow>
          <h2 className="text-[24px] sm:text-[34px] font-bold leading-[1.45] mb-6">{t.privH}</h2>
          <p className="text-[15px] leading-[1.95] text-[#4A4552] max-w-[600px] mx-auto">
            {t.privP[0]}
            <Link href="/artherapy/privacy" className="hover:underline mx-1" style={{ color: PINK }}>
              {t.privP[1]}
            </Link>
            {t.privP[2]}
          </p>
          <div className="mt-10">
            <StoreButton lang={lang} />
          </div>
        </div>
      </section>
    </main>
  );
}
