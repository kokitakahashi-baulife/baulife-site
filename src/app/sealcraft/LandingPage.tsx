import Image from "next/image";
import SiteChrome from "./SiteChrome";
import { COPY, base, screen, type Lang } from "./copy";

/// SealCraft の紹介ページの本体(4言語で同じ作り)。文は copy.ts。
/// ⚠️ 画面の写真に日付(今月のガチャの期限など)が写ったものは使わない。すぐ古くなる。

const SEALS = ["seal_rabbit", "seal_tulip", "seal_polarbear", "seal_cameo", "seal_crown", "seal_stamplover"];

function Phone({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[600/1304] rounded-[34px] overflow-hidden bg-[#2B1D14] p-[6px] shadow-[0_24px_60px_-24px_rgba(74,52,38,0.55)]">
      <div className="relative w-full h-full rounded-[28px] overflow-hidden">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 70vw, 300px" priority={priority} className="object-cover" />
      </div>
    </div>
  );
}

/// 見出し2行。狭い画面でも句の途中で折れないように、句ごとに inline-block
function Heading({ parts, className }: { parts: [string, string]; className: string }) {
  return (
    <h2 className={className}>
      <span className="inline-block">{parts[0]}</span>
      <span className="inline-block">{parts[1]}</span>
    </h2>
  );
}

export default function LandingPage({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const stepShots = [screen(lang, "board"), screen(lang, "stir"), screen(lang, "pour")];
  return (
    <SiteChrome lang={lang}>
      <main>
        {/* ───────── ヒーロー ───────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[130px] opacity-[0.22] bg-[#E9B98F]"
          />
          <div className="relative max-w-[1120px] mx-auto px-6 pt-14 pb-20 sm:pt-20 sm:pb-28 grid gap-14 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-[560px]">
              <div className="flex items-center gap-4 mb-8">
                {/* アイコンの角丸 22.37% は iOS のスクワークルに近い */}
                <Image src="/sealcraft/appicon.png" alt={c.appIconAlt} width={64} height={64} priority className="rounded-[22.37%] ring-1 ring-[#4A3426]/10" />
                <div>
                  <p className="text-[15px] font-bold leading-tight" style={{ fontFamily: "var(--font-en)" }}>
                    SealCraft
                  </p>
                  <p className="text-[12px] tracking-[2px] text-[#7A6150] mt-1">{c.platform}</p>
                </div>
              </div>
              <h1 className="text-[33px] sm:text-[52px] font-bold leading-[1.22] tracking-[-0.01em]">
                {c.heroTitle[0]}
                <br />
                {c.heroTitle[1]}
              </h1>
              <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.95] text-[#5C4535]">
                {c.heroLead[0]}
                <br className="hidden sm:block" /> {c.heroLead[1]}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-bold text-white bg-[#B4382F]">{c.comingSoon}</span>
                <a href="#play" className="inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-bold border border-[#4A3426]/25 hover:bg-[#4A3426]/5 transition-colors">
                  {c.seePlay}
                </a>
              </div>
            </div>

            {/* ホームの画面(後ろ)と リリ(手前) */}
            <div className="relative w-[64%] max-w-[300px] mx-auto lg:w-[300px] lg:mx-0 justify-self-center lg:justify-self-end">
              <Phone src={screen(lang, "home")} alt={c.homeAlt} priority />
              <div className="absolute -left-[38%] -bottom-[6%] w-[62%] aspect-square">
                <Image src="/sealcraft/char_lili.webp" alt={c.liliAlt} fill sizes="200px" priority className="object-contain drop-shadow-[0_10px_18px_rgba(74,52,38,0.25)]" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────── あそびかた ───────── */}
        <section id="play" className="scroll-mt-14 bg-[#EFE3CF] px-6 py-20 sm:py-28">
          <div className="max-w-[1120px] mx-auto">
            <p className="text-[12px] tracking-[3px] text-[#B4382F] font-bold" style={{ fontFamily: "var(--font-en)" }}>
              HOW TO PLAY
            </p>
            <Heading parts={c.playHeading} className="mt-3 text-[28px] sm:text-[38px] font-bold leading-[1.35]" />
            <p className="mt-5 max-w-[640px] text-[16px] leading-[1.95] text-[#5C4535]">{c.playLead}</p>
            <ol className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
              {c.steps.map((s, i) => (
                <li key={s.title}>
                  <div className="w-[70%] max-w-[260px] mx-auto sm:w-full">
                    <Phone src={stepShots[i]} alt={s.alt} />
                  </div>
                  <p className="mt-7 text-[13px] font-bold text-[#B4382F]" style={{ fontFamily: "var(--font-en)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-[20px] font-bold">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.9] text-[#5C4535]">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────── 封蝋 ───────── */}
        <section className="px-6 py-20 sm:py-28">
          <div className="max-w-[1120px] mx-auto">
            <Heading parts={c.sealsHeading} className="text-[28px] sm:text-[38px] font-bold leading-[1.35]" />
            <p className="mt-5 max-w-[640px] text-[16px] leading-[1.95] text-[#5C4535]">
              {c.sealsLead[0]}{" "}
              <a href="https://homu.baulife.world" className="text-[#B4382F] hover:underline">
                {c.sealsLead[1]}
              </a>{" "}
              {c.sealsLead[2]}
            </p>
            <ul className="mt-12 grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
              {SEALS.map((s, i) => (
                <li key={s} className="relative aspect-square">
                  <Image src={`/sealcraft/${s}.webp`} alt={c.sealAlts[i]} fill sizes="(max-width: 640px) 30vw, 170px" className="object-contain drop-shadow-[0_8px_14px_rgba(74,52,38,0.22)]" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── ほかにも ───────── */}
        <section className="bg-[#EFE3CF] px-6 py-20 sm:py-28">
          <div className="max-w-[1120px] mx-auto grid gap-14 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="w-[64%] max-w-[280px] mx-auto lg:w-[280px] lg:mx-0">
              <Phone src={screen(lang, "bench")} alt={c.benchAlt} />
            </div>
            <div>
              <Heading parts={c.moreHeading} className="text-[28px] sm:text-[38px] font-bold leading-[1.35]" />
              <p className="mt-5 max-w-[560px] text-[16px] leading-[1.95] text-[#5C4535]">{c.moreLead}</p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2">
                {c.more.map((m) => (
                  <li key={m.title} className="rounded-2xl bg-[#F7EFE2] p-6 ring-1 ring-[#4A3426]/10">
                    <h3 className="text-[16px] font-bold">{m.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.85] text-[#5C4535]">{m.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── 料金 ───────── */}
        <section id="price" className="scroll-mt-14 px-6 py-20 sm:py-28">
          <div className="max-w-[720px] mx-auto">
            <Heading parts={c.priceHeading} className="text-[28px] sm:text-[38px] font-bold leading-[1.35]" />
            <div className="mt-8 space-y-4 text-[16px] leading-[1.95] text-[#5C4535]">
              {c.price.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                {c.privacyLink[0]}{" "}
                <a href={`${base(lang)}/privacy`} className="text-[#B4382F] hover:underline">
                  {c.privacyLink[1]}
                </a>
                {c.privacyLink[2]}
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
