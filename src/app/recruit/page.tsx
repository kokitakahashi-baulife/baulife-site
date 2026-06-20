import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ApplyForm from "@/components/ApplyForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "コラボプロデューサー募集（業務委託） — BAULIFE / HOMU",
  description:
    "HOMUと一緒に、いろんなクリエイターとのコラボ商品（シーリングのブラインドボックス）を企画から世に出すまで走るプロデューサーを募集します。業務委託・完全成果報酬。",
};

// ───────────────────────────────────────────────
// 掲載前に埋める空欄（ここだけ差し替えればOK）
const FORM_URL = "#apply"; // ページ内の応募フォームへスクロール
const HOMU_X_URL = "https://x.com/homu_baulife"; // HOMU公式X
const HOMU_X_HANDLE = "@homu_baulife";
// ───────────────────────────────────────────────

const wants = [
  "SNSで「反応」や「売上」をつくった経験がある方",
  "複数の案件を段取りよく回せる方",
  "クリエイターさんと気持ちよくやり取りできる方",
  "シーリングやキャラクターが好きな方",
];

const jobs = [
  {
    label: "企画する",
    body: "クリエイターさんと話し、世界にひとつのコラボ商品を企画する。",
  },
  {
    label: "広げて、売る",
    body: "SNSで告知し、わくわくを広げて、商品を世に出す。",
  },
];

export default function Recruit() {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 py-4 border-b border-[#eee] bg-[#faf9f7]/90 backdrop-blur-xl flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-[3px] text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-en)" }}
        >
          BAULIFE
        </Link>
        <Link
          href="/"
          className="text-[13px] text-[#666] hover:text-[#1a1a1a] transition-colors"
        >
          ← ホームへ
        </Link>
      </header>

      {/* Hero */}
      <section
        className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-6 text-center"
        style={{
          background:
            "linear-gradient(160deg, #fdfbfb 0%, #f7e8ec 45%, #faf0e6 100%)",
        }}
      >
        <div className="max-w-[680px] mx-auto">
          <ScrollReveal>
            <p
              className="text-xs tracking-[4px] uppercase text-[#e85d75] mb-4"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Join HOMU
            </p>
            <div className="inline-block text-[12px] font-medium text-[#e85d75] bg-white/70 border border-[#f0d4da] rounded-full px-4 py-1.5 mb-6">
              業務委託・完全成果報酬
            </div>
            <h1 className="text-[26px] sm:text-[34px] font-bold leading-[1.4] mb-6">
              コラボプロデューサー
              <br className="sm:hidden" />
              募集
            </h1>
            <p className="text-sm sm:text-[15px] text-[#555] leading-[1.9] max-w-[560px] mx-auto">
              HOMUは、いろんなクリエイターさんと一緒に、世界にひとつのコラボ商品（シーリングのブラインドボックス）を次々に生み出していきます。その商品を企画から世に出すまで一緒に走る“プロデューサー”を募集します。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={FORM_URL}
                className="inline-flex items-center justify-center w-full sm:w-auto text-sm font-semibold text-white bg-[#e85d75] px-7 py-3.5 rounded-full hover:bg-[#d44d65] transition-colors hover:scale-[1.03] active:scale-[0.98]"
              >
                応募する（5分で完了）→
              </a>
              <a
                href={HOMU_X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto text-sm font-medium text-[#e85d75] border-2 border-[#e85d75] px-7 py-3 rounded-full hover:bg-[#e85d75] hover:text-white transition-colors"
              >
                Xで気軽に質問する
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 募集の背景 */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-white border-t border-b border-[#eee]">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <p
              className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Why now
            </p>
            <h2 className="text-2xl font-bold text-center mb-10">募集の背景</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[15px] text-[#444] leading-[1.95] text-center">
              HOMUはいま、たくさんのクリエイターと組んでコラボ商品を量産していくフェーズに入ります。立ち上げ期の今だからこそ、一緒に仕組みをつくりながら、HOMUを“いろんなIPが集まる場所”に育てていける仲間を探しています。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 仕事内容 */}
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-[760px] mx-auto">
          <ScrollReveal>
            <p
              className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
              style={{ fontFamily: "var(--font-en)" }}
            >
              What you do
            </p>
            <h2 className="text-2xl font-bold text-center mb-12">仕事内容</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {jobs.map((job, i) => (
              <ScrollReveal key={job.label} delay={0.1 + i * 0.08}>
                <div className="h-full bg-white border border-[#eee] rounded-2xl p-7">
                  <div
                    className="text-[13px] font-bold text-[#e85d75] mb-3"
                    style={{ fontFamily: "var(--font-en)" }}
                  >
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{job.label}</h3>
                  <p className="text-sm text-[#666] leading-relaxed">
                    {job.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.26}>
            <p className="mt-6 text-[13px] text-[#888] leading-relaxed bg-[#faf9f7] border border-[#eee] rounded-xl px-5 py-4 text-center">
              ※製造・発注・検品・発送はHOMU側で行います。あなたは「企画」と「SNSでの盛り上げ」に集中できます。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* こんな方に来てほしい */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-white border-t border-b border-[#eee]">
        <div className="max-w-[600px] mx-auto">
          <ScrollReveal>
            <p
              className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Who we want
            </p>
            <h2 className="text-2xl font-bold text-center mb-10">
              こんな方に来てほしい
            </h2>
          </ScrollReveal>

          <ul className="space-y-3">
            {wants.map((w, i) => (
              <ScrollReveal key={w} delay={0.08 + i * 0.06}>
                <li className="flex items-start gap-3 bg-[#faf9f7] border border-[#eee] rounded-xl px-5 py-4">
                  <span className="text-[#e85d75] font-bold mt-[1px]">✓</span>
                  <span className="text-[15px] text-[#444] leading-relaxed">
                    {w}
                  </span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 雇用形態・報酬 */}
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-[640px] mx-auto">
          <ScrollReveal>
            <p
              className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Terms
            </p>
            <h2 className="text-2xl font-bold text-center mb-4">
              雇用形態・報酬
            </h2>
            <p className="text-center text-sm font-medium text-[#e85d75] mb-10">
              業務委託／固定給なし・完全成果報酬
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-[15px] text-[#444] leading-[1.95] mb-5">
              報酬は「コラボを立ち上げた成果」と「その売上」に連動する2階建ての設計。やった分・伸ばした分が、そのまま返ります。本数を増やすほど報酬も伸びていきます。
            </p>
            <p className="text-[15px] text-[#444] leading-[1.95] mb-8">
              具体的な報酬条件は、面談時に詳しくお伝えします。まずは1コラボだけの<strong className="font-bold text-[#1a1a1a]">有償トライアル</strong>から始め、相性を見てから本契約に進みます。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <div className="bg-[#fff7f8] border border-[#f3d2d9] rounded-2xl px-6 py-5">
              <p className="text-[14px] text-[#a23b50] leading-relaxed">
                ※安定した固定給をご希望の方には向きません。そこは正直にお伝えしています。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 応募方法 */}
      <section
        id="apply"
        className="scroll-mt-20 py-16 sm:py-28 px-5 sm:px-6 border-t border-[#eee]"
        style={{
          background:
            "linear-gradient(160deg, #fdfbfb 0%, #f7e8ec 45%, #faf0e6 100%)",
        }}
      >
        <div className="max-w-[560px] mx-auto">
          <ScrollReveal>
            <div className="text-center">
              <p
                className="text-xs tracking-[4px] uppercase text-[#e85d75] mb-2"
                style={{ fontFamily: "var(--font-en)" }}
              >
                Apply
              </p>
              <h2 className="text-2xl font-bold mb-5">応募する</h2>
              <p className="text-sm text-[#555] leading-relaxed mb-2">
                簡単なプロフィールと、SNSで反応・売上をつくった事例を1つ教えてください。
              </p>
              <p className="text-[13px] text-[#888] mb-9">5分で完了します。</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ApplyForm />
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="text-[13px] text-[#888] text-center mt-6">
              気軽な質問はDMでも：
              <a
                href={HOMU_X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e85d75] font-medium hover:underline"
              >
                HOMU公式X {HOMU_X_HANDLE}
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
