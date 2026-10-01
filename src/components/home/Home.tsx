import Image from "next/image";
import Link from "next/link";
import { homuObjectsFor, servicesFor, worksFor, type HomeLang, type Work } from "@/data/home";
import type { PostMeta } from "@/lib/blog";
import { ContactForm, InquiryLink, LangAutoSwitch, LangLink, LoopVideo, RevealObserver } from "./client";
import s from "./home.module.css";

const rv = { "data-reveal": "" };

function Media({ work, sizes }: { work: Work; sizes: string }) {
  const m = work.media;
  switch (m.kind) {
    case "video":
      return (
        <div className={s.ph}>
          <LoopVideo src={m.src} poster={m.poster} label={m.label} />
        </div>
      );
    case "pan":
      return (
        <div className={`${s.ph} ${s.pan}`}>
          <Image src={m.src} alt={m.alt} fill sizes={sizes} />
        </div>
      );
    case "image":
      return (
        <div className={s.ph}>
          <Image src={m.src} alt={m.alt} fill sizes={sizes} />
        </div>
      );
    case "dogs":
      return (
        <div className={s.ph}>
          <div className={s.dogs}>
            {m.items.map((d) => (
              <figure key={d.src}>
                <Image src={d.src} alt="" width={480} height={480} unoptimized />
                <figcaption>{d.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
  }
}

function WorkCard({ work, className, sizes }: { work: Work & { devStatus: boolean }; className: string; sizes: string }) {
  const inner = (
    <>
      <Media work={work} sizes={sizes} />
      <div className={s.meta}>
        <div>
          <h3 style={work.nameFont ? { fontFamily: work.nameFont, fontWeight: 700, letterSpacing: "0.04em" } : undefined}>{work.name}</h3>
          <p className={s.kind}>{work.kind}</p>
        </div>
        <span className={`${s.st} ${work.devStatus ? s.stDev : ""}`}>{work.status}</span>
      </div>
      <p className={s.tags}>
        {work.tags.map((t) => (
          <span key={t}>#{t}</span>
        ))}
      </p>
      {work.cta && work.href && (
        <span className={`${s.link} ${s.cta}`}>
          {work.cta} <span aria-hidden="true">{work.href.startsWith("http") ? "↗" : "→"}</span>
        </span>
      )}
    </>
  );
  const cls = `${s.work} ${className} ${s.rv}`;
  if (!work.href) return <div className={cls} {...rv}>{inner}</div>;
  const external = work.href.startsWith("http");
  return external ? (
    <a className={cls} href={work.href} target="_blank" rel="noopener" {...rv}>
      {inner}
    </a>
  ) : (
    <Link className={cls} href={work.href} {...rv}>
      {inner}
    </Link>
  );
}

/** トップページの文(日本語が正本。英語は /en) */
const T = {
  ja: {
    navLabel: "ページ内",
    h1: ["試して、", "変わり続ける。"],
    range: "BAULIFEは、来たるAIエージェント時代を見据えた新規事業スタジオです。アプリ・物販・メディアの事業を自分たちでつくり、うまくいったやり方も、うまくいかなかったことも次に生かしながら、事業の形を変え続けています。AI活用や新規事業の顧問・コンサルティングのご相談も受け付けています。",
    works: "事業一覧",
    sellerH: ["個人の物販を、", "ブランドに育てませんか。"],
    sellerP: "HOMUを立ち上げて育ててきた経験をもとに、商品づくり・見せ方・売り方をご一緒に考えます。個人で物販をしている方からのご相談をお受けしています。",
    sellerCta: "ブランド化の相談をする",
    aboutH: ["AIと一緒に、作って、試す。", "試したことだけを、お渡しする。"],
    aboutP: "BAULIFEでは、アプリの開発も、商品の企画と販売も、メディアの記事づくりも、AIを組み込んだ形で回しています。AIが変われば、仕事のやり方も変える。その試行錯誤から得たことを、AI活用や新規事業に取り組む企業、ブランドを育てたい個人の方にお渡ししています。",
    journal: "AIによる観察日記",
    journalLead: "創業者の日々の作業を、そばで見ているAIが勝手に記事にしています。",
    allPosts: "すべての記事",
    company: "会社概要",
    rows: [
      ["会社名", "株式会社BAULIFE"],
      ["代表者", "高橋 香輝"],
      ["取締役", "高橋 明日香"],
      ["所在地", "〒150-0002 東京都渋谷区渋谷2-19-15 宮益坂ビルディング609"],
      ["法人番号", "3011001149137"],
      ["事業内容", "AI駆動のアプリ開発・物販・メディア運営\nAI活用・新規事業の顧問・コンサルティング／物販のブランド化の支援"],
    ],
    contact: "お問い合わせ",
    siteLabel: "サイト",
    footer: [["/blog", "AIによる観察日記"], ["/recruit", "採用情報"], ["/privacy", "プライバシーポリシー"], ["/terms", "利用規約"], ["/tools", "社内ポータル"]],
    blog: "/blog",
    other: { href: "/en", label: "English" },
  },
  en: {
    navLabel: "On this page",
    h1: ["Keep trying.", "Keep changing."],
    range: "BAULIFE is a venture studio building for the coming age of AI agents. We make our own businesses — apps, retail and media — and keep reshaping them, carrying forward both what worked and what didn't. We also take on advisory and consulting work in AI adoption and new businesses.",
    works: "Our businesses",
    sellerH: ["Turn your shop", "into a brand."],
    sellerP: "Drawing on our experience launching and growing HOMU, we work with you on products, presentation and how you sell. We take consultations from independent sellers.",
    sellerCta: "Talk to us about your brand",
    aboutH: ["Build with AI, test it,", "and share only what we've tried."],
    aboutP: "At BAULIFE, app development, product planning and sales, and media writing all run with AI built in. When AI changes, we change how we work. We share what we learn from that trial and error with companies taking on AI and new businesses, and with individuals who want to grow a brand.",
    journal: "Observed by AI",
    journalLead: "An AI that watches our founder work every day writes it up — on its own.",
    allPosts: "All posts",
    company: "Company",
    rows: [
      ["Name", "BAULIFE Inc."],
      ["CEO", "Koki Takahashi"],
      ["Director", "Asuka Takahashi"],
      ["Address", "Miyamasuzaka Building 609, 2-19-15 Shibuya, Shibuya-ku, Tokyo 150-0002, Japan"],
      ["Corporate number", "3011001149137"],
      ["Business", "AI-driven app development, retail and media\nAdvisory and consulting on AI adoption and new businesses / Brand building for independent sellers"],
    ],
    contact: "Contact",
    siteLabel: "Site",
    footer: [["/en/blog", "Observed by AI"], ["/privacy", "Privacy Policy (Japanese)"], ["/terms", "Terms (Japanese)"]],
    blog: "/en/blog",
    other: { href: "/", label: "日本語" },
  },
} as const;

export default function Home({ posts, lang = "ja" }: { posts: PostMeta[]; lang?: HomeLang }) {
  const t = T[lang];
  const ws = worksFor(lang);
  return (
    <div className={s.root} lang={lang}>
      <RevealObserver />
      {lang === "ja" && <LangAutoSwitch to="/en" />}
      <header className={s.header}>
        <div className={s.wrap}>
          <a className={s.logo} href="#top">
            baulife
          </a>
          <nav className={s.nav} aria-label={t.navLabel}>
            <a href="#works">works</a>
            <a href="#about">about</a>
            <a href="#journal">journal</a>
            <a href="#contact">contact</a>
            <LangLink href={t.other.href} lang={lang === "ja" ? "en" : "ja"}>{t.other.label}</LangLink>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className={s.hero}>
          <div className={s.wrap}>
            <p className={s.mono}>BAULIFE Inc. — New Venture Studio for the Agentic Era, Tokyo</p>
            <h1>
              <span className={s.nw}>{t.h1[0]}</span>
              {lang === "en" && " "}
              <span className={s.nw}>{t.h1[1]}</span>
            </h1>
            {lang === "ja" && <p className={s.en}>A venture studio built for the age of AI agents.</p>}
            <p className={s.range}>{t.range}</p>
          </div>
        </div>

        <div className={s.wrap} id="works">
          <div className={`${s.head} ${s.rv}`} {...rv}>
            <p className={s.mono}>Works</p>
            <h2>{t.works}</h2>
          </div>
          <div className={s.works}>
            {ws.map((w) => (
              <WorkCard key={w.id} work={w} className={s.wEq} sizes="(max-width: 900px) 100vw, 50vw" />
            ))}

            <div className={`${s.objects} ${s.rv}`} {...rv}>
              {homuObjectsFor(lang).map((o) => (
                <figure key={o.src}>
                  <div className={s.ph}>
                    <Image src={o.src} alt={o.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
                  </div>
                  <figcaption>{o.caption}</figcaption>
                </figure>
              ))}
            </div>

            <InquiryLink type="brand" className={`${s.seller} ${s.rv}`} {...rv}>
              <div>
                <span className={s.mono}>For Sellers</span>
                <h4>
                  {t.sellerH[0]}
                  <br />
                  {t.sellerH[1]}
                </h4>
              </div>
              <div>
                <p>{t.sellerP}</p>
                <span className={s.link}>
                  {t.sellerCta} <span aria-hidden="true">→</span>
                </span>
              </div>
            </InquiryLink>
          </div>
        </div>

        <div className={s.dark} id="about">
          <div className={s.wrap}>
            <div className={`${s.msg} ${s.rv}`} {...rv}>
              <p className={s.mono}>About</p>
              <h2>
                {t.aboutH[0]}
                <br />
                {t.aboutH[1]}
              </h2>
              <p>{t.aboutP}</p>
            </div>
            <div className={`${s.svc} ${s.rv}`} {...rv}>
              {servicesFor(lang).map((sv) => (
                <InquiryLink key={sv.type} type={sv.type}>
                  <span className={`${s.mono} ${s.who}`}>{sv.who}</span>
                  <h3>{sv.title}</h3>
                  <p>{sv.body}</p>
                  <span className={s.arr} aria-hidden="true">
                    →
                  </span>
                </InquiryLink>
              ))}
            </div>
          </div>
        </div>

        <section className={s.section} id="journal">
          <div className={s.wrap}>
            <div className={`${s.head} ${s.rv}`} {...rv}>
              <p className={s.mono}>Observed by AI</p>
              <h2>{t.journal}</h2>
              <p className={s.lead}>{t.journalLead}</p>
            </div>
            <div className={`${s.list} ${s.rv}`} {...rv}>
              {posts.map((p) => (
                <Link key={p.slug} href={`${t.blog}/${p.slug}`}>
                  <time className={s.mono} dateTime={p.date}>
                    {p.date.replaceAll("-", ".")}
                  </time>
                  <span className={s.title}>{p.title}</span>
                  <span className={`${s.mono} ${s.tagCol}`}>by AI</span>
                </Link>
              ))}
            </div>
            <div className={s.more}>
              <Link className={s.link} href={t.blog}>
                {t.allPosts} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={s.section} id="company">
          <div className={s.wrap}>
            <div className={`${s.head} ${s.rv}`} {...rv}>
              <p className={s.mono}>Company</p>
              <h2>{t.company}</h2>
            </div>
            <div className={`${s.co} ${s.rv}`} {...rv}>
              <table>
                <tbody>
                  {t.rows.map(([k, v]) => (
                    <tr key={k}>
                      <th>{k}</th>
                      <td>
                        {v.split("\n").map((line, i) => (
                          <span key={i}>
                            {i > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={s.section} id="contact">
          <div className={s.wrap}>
            <div className={`${s.head} ${s.rv}`} {...rv}>
              <p className={s.mono}>Contact</p>
              <h2>{t.contact}</h2>
            </div>
            <ContactForm lang={lang} />
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <a className={s.logo} href="#top">
            baulife
          </a>
          <nav aria-label={t.siteLabel}>
            {t.footer.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <LangLink href={t.other.href} lang={lang === "ja" ? "en" : "ja"}>{t.other.label}</LangLink>
            <span>© {new Date().getFullYear()} BAULIFE Inc.</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
