import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { jobs } from "@/data/jobs";

export const metadata = {
  title: "採用情報 — BAULIFE / HOMU",
  description:
    "BAULIFE / HOMU の募集中の職種一覧。クリエイターと一緒に、人と人を繋ぐ媒介物を生み出す仲間を募集しています。",
};

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
        className="pt-28 sm:pt-36 pb-14 sm:pb-20 px-5 sm:px-6 text-center"
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
              Careers
            </p>
            <h1 className="text-[26px] sm:text-[34px] font-bold leading-[1.4] mb-6">
              採用情報
            </h1>
            <p className="text-sm sm:text-[15px] text-[#555] leading-[1.9] max-w-[560px] mx-auto">
              BAULIFEは「人と人を繋ぐ媒介物」を、クリエイターと一緒に生み出し、世界に届けていきます。立ち上げ期の今だからこそ面白い仲間を募集しています。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 募集中の職種 */}
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-[760px] mx-auto">
          <ScrollReveal>
            <p
              className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
              style={{ fontFamily: "var(--font-en)" }}
            >
              Open positions
            </p>
            <h2 className="text-2xl font-bold text-center mb-12">
              募集中の職種
            </h2>
          </ScrollReveal>

          <div className="space-y-5">
            {jobs.map((job, i) => (
              <ScrollReveal key={job.slug} delay={0.08 + i * 0.08}>
                <Link
                  href={`/recruit/${job.slug}`}
                  className="group block bg-white border border-[#eee] rounded-2xl p-6 sm:p-7 transition-all hover:border-[#e85d75]/40 hover:shadow-[0_8px_30px_rgba(232,93,117,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block text-[11px] font-medium text-[#e85d75] bg-[#fff0f3] rounded-full px-3 py-1 mb-3">
                        {job.employmentType}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-[#e85d75] transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-sm text-[#666] leading-relaxed">
                        {job.summary}
                      </p>
                    </div>
                    <span className="hidden sm:block text-[#e85d75] text-xl mt-1 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <span className="sm:hidden inline-block mt-4 text-sm font-semibold text-[#e85d75]">
                    詳細を見る →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
