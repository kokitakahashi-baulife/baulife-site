import Link from "next/link";
import { SITE_URL, blogPath, copy, type Lang, type Post } from "@/lib/blog";

// /blog（日本語）と /en/blog（英語）で共有する見た目。
// ページ側は記事を読んで渡すだけにして、見た目はここに寄せる。

function Header({ lang, otherHref }: { lang: Lang; otherHref: string }) {
  const t = copy[lang];
  return (
    <header className="sticky top-0 z-50 border-b border-[#eee] bg-[#faf9f7]/90 backdrop-blur-xl">
      <div className="max-w-[720px] mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href={blogPath(lang)}
          className="flex items-baseline gap-2 text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-en)" }}
        >
          <span className="text-[15px] font-bold tracking-[0.5px]">{t.owner}</span>
          <span className="text-[13px] text-[#999]">/ {t.name}</span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-[#666]">
          <a
            href={`${blogPath(lang)}/feed.xml`}
            className="hover:text-[#1a1a1a] transition-colors"
          >
            {t.feed}
          </a>
          <Link
            href={otherHref}
            hrefLang={lang === "ja" ? "en" : "ja"}
            className="hover:text-[#1a1a1a] transition-colors"
          >
            {t.other}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function BlogFooter({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="border-t border-[#eee] bg-white px-5 sm:px-6 py-8 text-center text-[12px] leading-[1.9] text-[#999]">
      <p>{t.disclaimer}</p>
      <p className="mt-1">
        {t.role}{lang === "ja" ? "：" : ": "}
        <a href="/" className="text-[#777] underline underline-offset-2 hover:text-[#1a1a1a]">
          baulife.world
        </a>
      </p>
    </footer>
  );
}

function Meta({ post }: { post: Post }) {
  const t = copy[post.lang];
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#999]">
      <time dateTime={post.date} style={{ fontFamily: "var(--font-en)" }}>
        {t.dateFmt(post.date)}
      </time>
      {post.project && (
        <span className="text-[#e85d75] font-medium">{post.project}</span>
      )}
      {post.draft && (
        <span className="rounded bg-[#1a1a1a] px-1.5 py-0.5 text-[10px] text-white">
          DRAFT
        </span>
      )}
    </div>
  );
}

export function BlogIndex({ lang, posts }: { lang: Lang; posts: Post[] }) {
  const t = copy[lang];
  return (
    <div lang={lang}>
      <Header lang={lang} otherHref={blogPath(lang === "ja" ? "en" : "ja")} />
      <main className="max-w-[720px] mx-auto px-5 sm:px-6">
        <section className="pt-14 pb-10 sm:pt-20 sm:pb-14 border-b border-[#eee]">
          <h1
            className="text-[34px] sm:text-[44px] font-bold leading-[1.1] tracking-[-0.5px] mb-4"
            style={{ fontFamily: "var(--font-en)" }}
          >
            {t.name}
          </h1>
          <p className="text-[15px] text-[#555] leading-[1.9] max-w-[520px]">
            {t.tagline}
          </p>
          <p className="mt-3 text-[13px] text-[#999]">{t.by}</p>
        </section>

        {posts.length === 0 ? (
          <p className="py-16 text-[14px] text-[#999]">{t.empty}</p>
        ) : (
          <ol className="divide-y divide-[#eee]">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={blogPath(lang, post.slug)}
                  className="group block py-8"
                >
                  <Meta post={post} />
                  <h2 className="mt-2 text-[19px] sm:text-[21px] font-bold leading-[1.5] group-hover:text-[#e85d75] transition-colors">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-2 text-[14px] text-[#666] leading-[1.85]">
                      {post.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </main>
      <div className="h-16" />
      <BlogFooter lang={lang} />
    </div>
  );
}

// 検索エンジンや AI が「誰が・いつ・何語で書いた技術記事か」を読めるように
function articleJsonLd(post: Post) {
  const url = SITE_URL + blogPath(post.lang, post.slug);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: post.lang,
    url,
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
    // 会社の公式記事ではなく、創業者個人の記録として出す
    author: {
      "@type": "Person",
      name: "Koki Takahashi",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "BAULIFE", url: SITE_URL },
    },
  }).replaceAll("<", "\\u003c");
}

export function BlogPost({ post }: { post: Post }) {
  const t = copy[post.lang];
  const other: Lang = post.lang === "ja" ? "en" : "ja";
  // 訳がない記事は、相手言語の一覧へ
  const otherHref = post.hasOther
    ? blogPath(other, post.slug)
    : blogPath(other);
  return (
    <div lang={post.lang}>
      <Header lang={post.lang} otherHref={otherHref} />
      <main className="max-w-[720px] mx-auto px-5 sm:px-6">
        <article className="pt-12 sm:pt-16 pb-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: articleJsonLd(post) }}
          />
          <Meta post={post} />
          <h1 className="mt-3 text-[26px] sm:text-[32px] font-bold leading-[1.45] tracking-[-0.2px]">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-4 text-[15px] text-[#666] leading-[1.9]">
              {post.summary}
            </p>
          )}

          <aside className="mt-6 rounded-xl border border-[#f0d4da] bg-[#fff7f8] px-4 py-3.5 text-[13px] leading-[1.85] text-[#8a3a4c]">
            {t.notice}
          </aside>

          {post.numbers.length > 0 && (
            <section
              aria-label={t.numbers}
              className="mt-8 rounded-2xl border border-[#eee] bg-white px-5 py-5"
            >
              <p className="text-[11px] font-medium tracking-[1.5px] text-[#999] uppercase mb-4">
                {t.numbers}
              </p>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                {post.numbers.map((n) => (
                  <div key={n.label}>
                    <dt className="text-[12px] text-[#888]">{n.label}</dt>
                    <dd
                      className="mt-1 text-[22px] font-bold leading-none tabular-nums"
                      style={{ fontFamily: "var(--font-en)" }}
                    >
                      {n.value}
                    </dd>
                    {n.note && (
                      <dd className="mt-1.5 text-[12px] text-[#999]">
                        {n.note}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div
            className="blog-prose mt-10"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#e5e5e5] px-3 py-1 text-[12px] text-[#777]"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 border-t border-[#eee] pt-6 flex items-center justify-between text-[13px]">
            <Link
              href={blogPath(post.lang)}
              className="text-[#666] hover:text-[#1a1a1a] transition-colors"
            >
              {t.back}
            </Link>
            <span className="text-[#aaa]">{t.by}</span>
          </div>
        </article>
      </main>
      <BlogFooter lang={post.lang} />
    </div>
  );
}
