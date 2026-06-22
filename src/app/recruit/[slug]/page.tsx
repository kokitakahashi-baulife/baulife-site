import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import AboutHomu from "@/components/AboutHomu";
import ApplyForm from "@/components/ApplyForm";
import Footer from "@/components/Footer";
import { jobs, getJob } from "@/data/jobs";

const HOMU_X_URL = "https://x.com/homu_baulife";
const HOMU_X_HANDLE = "@homu_baulife";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "採用情報 — BAULIFE / HOMU" };
  return {
    title: `${job.title}（${job.employmentType}） — BAULIFE / HOMU`,
    description: job.summary,
  };
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

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
          href="/#recruit"
          className="text-[13px] text-[#666] hover:text-[#1a1a1a] transition-colors"
        >
          ← 採用情報
        </Link>
      </header>

      {/* Hero（コンパクト） */}
      <section
        className="pt-28 sm:pt-32 pb-12 px-5 sm:px-6"
        style={{
          background:
            "linear-gradient(160deg, #fdfbfb 0%, #f7e8ec 45%, #faf0e6 100%)",
        }}
      >
        <div className="max-w-[680px] mx-auto text-center">
          <ScrollReveal>
            <span className="inline-block text-[12px] font-medium text-[#e85d75] bg-white/70 border border-[#f0d4da] rounded-full px-4 py-1.5 mb-5">
              {job.employmentType}
            </span>
            <h1 className="text-[24px] sm:text-[30px] font-bold leading-[1.4] mb-4">
              {job.title}
            </h1>
            <p className="text-sm sm:text-[15px] text-[#555] leading-[1.85] max-w-[560px] mx-auto">
              {job.lead}
            </p>
            <a
              href="#apply"
              className="inline-flex items-center justify-center mt-7 text-sm font-semibold text-white bg-[#e85d75] px-7 py-3 rounded-full hover:bg-[#d44d65] transition-colors hover:scale-[1.03] active:scale-[0.98]"
            >
              応募する（5分で完了）→
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* HOMUってどんなブランド？（応募者向けの紹介） */}
      <AboutHomu />

      {/* 募集要項（1本の記事としてコンパクトに） */}
      <article className="max-w-[680px] mx-auto px-5 sm:px-6 py-14">
        <ScrollReveal>
          <div className="space-y-10 [&>section]:border-t [&>section]:border-[#eee] [&>section]:pt-8 [&>section:first-child]:border-0 [&>section:first-child]:pt-0">
            {/* 募集の背景 */}
            <section>
              <h2 className="text-[18px] font-bold mb-3">募集の背景</h2>
              <p className="text-[15px] text-[#444] leading-[1.9]">
                {job.background}
              </p>
            </section>

            {/* 仕事内容 */}
            <section>
              <h2 className="text-[18px] font-bold mb-4">仕事内容</h2>
              <ul className="space-y-3 mb-4">
                {job.responsibilities.map((r) => (
                  <li key={r.label} className="flex gap-3">
                    <span className="text-[#e85d75] font-bold mt-[2px]">●</span>
                    <span className="text-[15px] text-[#444] leading-[1.8]">
                      <span className="font-bold text-[#1a1a1a]">
                        {r.label}
                      </span>
                      {" — "}
                      {r.body}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-[#888] leading-relaxed bg-[#faf9f7] border border-[#eee] rounded-xl px-4 py-3">
                ※{job.responsibilitiesNote}
              </p>
            </section>

            {/* こんな方に来てほしい */}
            <section>
              <h2 className="text-[18px] font-bold mb-4">
                こんな方に来てほしい
              </h2>
              <ul className="space-y-2.5">
                {job.wants.map((w) => (
                  <li key={w} className="flex gap-3">
                    <span className="text-[#e85d75] font-bold mt-[1px]">✓</span>
                    <span className="text-[15px] text-[#444] leading-[1.8]">
                      {w}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 雇用形態・報酬 */}
            <section>
              <h2 className="text-[18px] font-bold mb-1">雇用形態・報酬</h2>
              <p className="text-sm font-medium text-[#e85d75] mb-4">
                {job.terms.headline}
              </p>
              <div className="space-y-4 mb-5">
                {job.terms.paragraphs.map((p) => (
                  <p key={p} className="text-[15px] text-[#444] leading-[1.9]">
                    {p}
                  </p>
                ))}
              </div>
              <div className="bg-[#fff7f8] border border-[#f3d2d9] rounded-xl px-5 py-4">
                <p className="text-[14px] text-[#a23b50] leading-relaxed">
                  ※{job.terms.callout}
                </p>
              </div>
            </section>
          </div>
        </ScrollReveal>
      </article>

      {/* 応募 */}
      <section
        id="apply"
        className="scroll-mt-20 py-14 sm:py-20 px-5 sm:px-6 border-t border-[#eee]"
        style={{
          background:
            "linear-gradient(160deg, #fdfbfb 0%, #f7e8ec 45%, #faf0e6 100%)",
        }}
      >
        <div className="max-w-[560px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold mb-3">
                「{job.title}」に応募する
              </h2>
              <p className="text-sm text-[#555] leading-relaxed">
                簡単なプロフィールと、SNSで反応・売上をつくった事例を1つ教えてください。5分で完了します。
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ApplyForm position={job.title} />
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
