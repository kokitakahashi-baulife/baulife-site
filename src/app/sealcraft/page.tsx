import Image from "next/image";

/// SealCraft の紹介ページ。
///
/// ⚠️ **見出しは「何のゲームか」がそれだけで分かる言葉**(2026-09-30 Koki: 「手紙に封蝋を押す、ほのぼのマージ」)。
///    アプリの App Store のサブタイトルと同じ。詩的な言い回しにしない。
/// ⚠️ **課金の書き方はアプリの実装と必ず揃える**(`docs/app-store.md` の課金の品)。
///    無料で物語は最後まで遊べる / 払うと早くなる・見た目が増えるだけ。
/// ⚠️ **数字と利用者の声は載せない**。まだ公開前。作れば嘘になる。
/// ⚠️ 画面の写真に日付(今月のガチャの期限など)が写ったものは使わない。すぐ古くなる。

const steps = [
  {
    n: "01",
    src: "/sealcraft/screen-board.jpg",
    alt: "作業台の盤面。同じ品を重ねて合体させる",
    title: "重ねて、材料を作る",
    body: "同じ品を重ねると、ひとつ上の品に。依頼主の想いに合う題材を届けると、真鍮の金型ができあがります。",
  },
  {
    n: "02",
    src: "/sealcraft/screen-stir.jpg",
    alt: "スプーンの中で溶けた3色のワックスを混ぜ棒で混ぜる",
    title: "溶かして、混ぜる",
    body: "好きな色のワックスを4粒、スプーンで溶かします。少しだけ混ぜればマーブルに、ぐるぐる回せばひとつの色に。",
  },
  {
    n: "03",
    src: "/sealcraft/screen-pour.jpg",
    alt: "手紙の上で、金型の形を指でなぞってワックスを垂らす",
    title: "指でなぞって、押す",
    body: "手紙の上を指でなぞって垂らし、金型を押す。道具を育てるほど、まるくきれいな封蝋になります。",
  },
];

const seals = [
  { src: "/sealcraft/seal_rabbit.webp", alt: "うさぎの封蝋" },
  { src: "/sealcraft/seal_tulip.webp", alt: "チューリップの封蝋" },
  { src: "/sealcraft/seal_polarbear.webp", alt: "しろくまの封蝋" },
  { src: "/sealcraft/seal_cameo.webp", alt: "カメオの封蝋" },
  { src: "/sealcraft/seal_crown.webp", alt: "王冠の封蝋" },
  { src: "/sealcraft/seal_stamplover.webp", alt: "シーリングスタンプの封蝋" },
];

const more = [
  { title: "工房と町をよみがえらせる", body: "設備を建てると、作業台に新しい材料の元が届きます。章ごとに、町の新しい場所へ。" },
  { title: "フレンドとコラージュを送り合う", body: "押した封蝋とシールをポストカードに貼って、IDでつながったフレンドに送れます。文章は送れないので、気楽に。" },
  { title: "毎日の腕だめし", body: "決まった回数で注文をそろえる、1日1面のマージパズル。エネルギーは使いません。" },
  { title: "月替わりのガチャ", body: "1日1回は無料。リリの衣装やシールが毎月替わります。確率はガチャの画面に出ています。" },
];

function Phone({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[600/1304] rounded-[34px] overflow-hidden bg-[#2B1D14] p-[6px] shadow-[0_24px_60px_-24px_rgba(74,52,38,0.55)]">
      <div className="relative w-full h-full rounded-[28px] overflow-hidden">
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 70vw, 300px" priority={priority} className="object-cover" />
      </div>
    </div>
  );
}

export default function Sealcraft() {
  return (
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
              <Image
                src="/sealcraft/appicon.png"
                alt="SealCraft のアプリアイコン"
                width={64}
                height={64}
                priority
                className="rounded-[22.37%] ring-1 ring-[#4A3426]/10"
              />
              <div>
                <p className="text-[15px] font-bold leading-tight" style={{ fontFamily: "var(--font-en)" }}>
                  SealCraft
                </p>
                <p className="text-[12px] tracking-[2px] text-[#7A6150] mt-1">iPhone</p>
              </div>
            </div>
            <h1 className="text-[33px] sm:text-[56px] font-bold leading-[1.22] tracking-[-0.01em]">
              手紙に封蝋を押す、
              <br />
              ほのぼのマージ。
            </h1>
            <p className="mt-7 text-[16px] sm:text-[18px] leading-[1.95] text-[#5C4535]">
              坂の途中の封蝋工房で、見習いのリリと手紙のお手伝い。
              <br className="hidden sm:block" />
              自分の指で垂らして押した封蝋は、世界にひとつだけ。
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-bold text-white bg-[#B4382F]">
                App Store で近日公開
              </span>
              <a
                href="#play"
                className="inline-flex items-center rounded-full px-7 py-3.5 text-[15px] font-bold border border-[#4A3426]/25 hover:bg-[#4A3426]/5 transition-colors"
              >
                あそびかたを見る
              </a>
            </div>
          </div>

          {/* ホームの画面(後ろ)と リリ(手前) */}
          <div className="relative w-[64%] max-w-[300px] mx-auto lg:w-[300px] lg:mx-0 justify-self-center lg:justify-self-end">
            <Phone src="/sealcraft/screen-home.jpg" alt="封蝋工房のホーム画面" priority />
            <div className="absolute -left-[38%] -bottom-[6%] w-[62%] aspect-square">
              <Image
                src="/sealcraft/char_lili.webp"
                alt="見習いの封蝋師リリ"
                fill
                sizes="200px"
                priority
                className="object-contain drop-shadow-[0_10px_18px_rgba(74,52,38,0.25)]"
              />
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
          <h2 className="mt-3 text-[28px] sm:text-[38px] font-bold leading-[1.35]">
            <span className="inline-block">町の人の手紙に、</span><span className="inline-block">封をする。</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-[16px] leading-[1.95] text-[#5C4535]">
            工房には、誰かに手紙を送りたい人がやってきます。想いを聞いて、材料を作って、封蝋を押すまでを、ぜんぶ自分の手で。
          </p>
          <ol className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {steps.map((s) => (
              <li key={s.n}>
                <div className="w-[70%] max-w-[260px] mx-auto sm:w-full">
                  <Phone src={s.src} alt={s.alt} />
                </div>
                <p className="mt-7 text-[13px] font-bold text-[#B4382F]" style={{ fontFamily: "var(--font-en)" }}>
                  {s.n}
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
          <h2 className="text-[28px] sm:text-[38px] font-bold leading-[1.35]">
            <span className="inline-block">同じ封蝋は、</span><span className="inline-block">二つとできない。</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-[16px] leading-[1.95] text-[#5C4535]">
            色の選び方、混ぜ方、垂らし方で、仕上がりは毎回ちがいます。押した封蝋はコレクションに残ります。
            金型の図柄は、封蝋スタンプの店{" "}
            <a href="https://homu.baulife.world" className="text-[#B4382F] hover:underline">
              HOMU
            </a>{" "}
            のデザインです。
          </p>
          <ul className="mt-12 grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
            {seals.map((s) => (
              <li key={s.src} className="relative aspect-square">
                <Image src={s.src} alt={s.alt} fill sizes="(max-width: 640px) 30vw, 170px" className="object-contain drop-shadow-[0_8px_14px_rgba(74,52,38,0.22)]" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── ほかにも ───────── */}
      <section className="bg-[#EFE3CF] px-6 py-20 sm:py-28">
        <div className="max-w-[1120px] mx-auto grid gap-14 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="w-[64%] max-w-[280px] mx-auto lg:w-[280px] lg:mx-0">
            <Phone src="/sealcraft/screen-bench.jpg" alt="封蝋を押す作業台。炉・スプーン・手紙・色の粒" />
          </div>
          <div>
            <h2 className="text-[28px] sm:text-[38px] font-bold leading-[1.35]"><span className="inline-block">のんびり、</span><span className="inline-block">毎日すこしずつ。</span></h2>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.95] text-[#5C4535]">
              争いも、急かされる期限もありません。やさしい物語と一緒に、自分のペースで。
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {more.map((m) => (
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
          <h2 className="text-[28px] sm:text-[38px] font-bold leading-[1.35]"><span className="inline-block">無料で、</span><span className="inline-block">物語は最後まで。</span></h2>
          <div className="mt-8 space-y-4 text-[16px] leading-[1.95] text-[#5C4535]">
            <p>
              ダウンロードは無料です。アプリ内で、宝石・はじめての贈り物・毎日のガチャ券を買えます。
              払うと待ち時間が短くなったり、見た目の品が増えたりしますが、払わなくても物語は最後まで遊べます。
            </p>
            <p>ガチャで出る品と確率は、引く前にガチャの画面で確かめられます。</p>
            <p>
              ログインやメールアドレスの登録はありません。進み具合は端末の中だけに保存します。
              フレンド機能を使うときだけ、ID・名前・送った作品を、届けるためにサーバーに置きます（設定からいつでも消せます）。
              くわしくは
              <a href="/sealcraft/privacy" className="text-[#B4382F] hover:underline">
                プライバシーポリシー
              </a>
              をご覧ください。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
