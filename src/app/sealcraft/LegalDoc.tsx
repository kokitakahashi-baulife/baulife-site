import SiteChrome from "./SiteChrome";
import { COPY, type Lang } from "./copy";
import { CONTACT_URL, LEGAL } from "./legal";

/// プライバシーポリシー・利用規約の共通の見た目(4言語)。段落は legal.ts の「■ 見出し\n本文」。
export default function LegalDoc({ lang, kind }: { lang: Lang; kind: "privacy" | "terms" }) {
  const c = COPY[lang];
  const legal = LEGAL[lang];
  const paragraphs = kind === "privacy" ? legal.privacy : legal.terms;
  return (
    <SiteChrome lang={lang} path={kind === "privacy" ? "/privacy" : "/terms"}>
      <main className="max-w-[720px] mx-auto px-6 py-14 pb-24">
        <h1 className="text-[28px] font-bold mb-2">{kind === "privacy" ? c.legal.privacy : c.legal.terms}</h1>
        <p className="text-sm text-[#7A6150] mb-10">
          {c.legal.appName} ／ {legal.operator} ／ {c.legal.updated}: {legal.updated}
        </p>
        <div className="space-y-5 text-[15px] leading-[1.95] text-[#5C4535]">
          {paragraphs.map((p, i) => {
            if (!p.startsWith("■")) return <p key={i}>{p}</p>;
            const [head, ...body] = p.split("\n");
            return (
              <section key={i}>
                <h2 className="text-[18px] font-bold text-[#4A3426] mt-10 mb-3">{head.replace(/^■\s*/, "")}</h2>
                {body.map((b, j) => (
                  <p key={j}>{b}</p>
                ))}
              </section>
            );
          })}
          <p className="pt-4">
            {c.legal.contactLabel}:{" "}
            <a href={CONTACT_URL} className="text-[#B4382F] hover:underline break-all">
              {CONTACT_URL}
            </a>
          </p>
        </div>
      </main>
    </SiteChrome>
  );
}
