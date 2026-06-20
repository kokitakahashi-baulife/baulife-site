import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import { jobs } from "@/data/jobs";

export default function Recruit() {
  return (
    <section id="recruit" className="scroll-mt-16 py-16 sm:py-28 px-5 sm:px-6">
      <div className="max-w-[760px] mx-auto">
        <ScrollReveal>
          <p
            className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
            style={{ fontFamily: "var(--font-en)" }}
          >
            Careers
          </p>
          <h2 className="text-2xl font-bold text-center mb-3">採用情報</h2>
          <p className="text-sm text-[#666] text-center max-w-[480px] mx-auto mb-12 leading-relaxed">
            クリエイターと一緒に、人と人を繋ぐ媒介物を生み出す仲間を募集しています。立ち上げ期の今だからこそ面白いフェーズです。
          </p>
        </ScrollReveal>

        <div className="space-y-4">
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
  );
}
