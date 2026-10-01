import Image from "next/image";
import Link from "next/link";
import { homuObjects, services, works, type Work } from "@/data/home";
import type { PostMeta } from "@/lib/blog";
import { ContactForm, InquiryLink, LoopVideo, RevealObserver } from "./client";
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

function WorkCard({ work, className, sizes }: { work: Work; className: string; sizes: string }) {
  const inner = (
    <>
      <Media work={work} sizes={sizes} />
      <div className={s.meta}>
        <div>
          <h3 style={work.nameFont ? { fontFamily: work.nameFont, fontWeight: 700, letterSpacing: "0.04em" } : undefined}>{work.name}</h3>
          <p className={s.kind}>{work.kind}</p>
        </div>
        <span className={`${s.st} ${work.status === "開発中" ? s.stDev : ""}`}>{work.status}</span>
      </div>
      <p className={s.tags}>
        {work.tags.map((t) => (
          <span key={t}>#{t}</span>
        ))}
      </p>
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

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <div className={s.root}>
      <RevealObserver />
      <header className={s.header}>
        <div className={s.wrap}>
          <a className={s.logo} href="#top">
            baulife
          </a>
          <nav className={s.nav} aria-label="ページ内">
            <a href="#works">works</a>
            <a href="#about">about</a>
            <a href="#journal">journal</a>
            <a href="#contact">contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <div className={s.hero}>
          <div className={s.wrap}>
            <p className={s.mono}>BAULIFE Inc. — New Venture Studio for the Agentic Era, Tokyo</p>
            <h1>
              <span className={s.nw}>試して、</span>
              <span className={s.nw}>変わり続ける。</span>
            </h1>
            <p className={s.en}>A venture studio built for the age of AI agents.</p>
            <p className={s.range}>
              BAULIFEは、来たるAIエージェント時代を見据えた新規事業スタジオです。アプリ・物販・メディアの事業を自分たちでつくり、うまくいったやり方も、うまくいかなかったことも次に生かしながら、事業の形を変え続けています。AI活用や新規事業の顧問・コンサルティングのご相談も受け付けています。
            </p>
          </div>
        </div>

        <div className={s.wrap} id="works">
          <div className={`${s.head} ${s.rv}`} {...rv}>
            <p className={s.mono}>Works</p>
            <h2>事業一覧</h2>
          </div>
          <div className={s.works}>
            {[works.homu, works.sealcraft, works.artherapy, works.baudog].map((w) => (
              <WorkCard key={w.id} work={w} className={s.wEq} sizes="(max-width: 900px) 100vw, 50vw" />
            ))}

            <div className={`${s.objects} ${s.rv}`} {...rv}>
              {homuObjects.map((o) => (
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
                  個人の物販を、
                  <br />
                  ブランドに育てませんか。
                </h4>
              </div>
              <div>
                <p>
                  HOMUを立ち上げて育ててきた経験をもとに、商品づくり・見せ方・売り方をご一緒に考えます。個人で物販をしている方からのご相談をお受けしています。
                </p>
                <span className={s.link}>
                  ブランド化の相談をする <span aria-hidden="true">→</span>
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
                AIと一緒に、作って、試す。
                <br />
                試したことだけを、お渡しする。
              </h2>
              <p>
                BAULIFEでは、アプリの開発も、商品の企画と販売も、メディアの記事づくりも、AIを組み込んだ形で回しています。AIが変われば、仕事のやり方も変える。その試行錯誤から得たことを、AI活用や新規事業に取り組む企業、ブランドを育てたい個人の方にお渡ししています。
              </p>
            </div>
            <div className={`${s.svc} ${s.rv}`} {...rv}>
              {services.map((sv) => (
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
              <p className={s.mono}>Journal</p>
              <h2>創業者のブログ</h2>
            </div>
            <div className={`${s.list} ${s.rv}`} {...rv}>
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <time className={s.mono} dateTime={p.date}>
                    {p.date.replaceAll("-", ".")}
                  </time>
                  <span className={s.title}>{p.title}</span>
                  <span className={`${s.mono} ${s.tagCol}`}>blog</span>
                </Link>
              ))}
            </div>
            <div className={s.more}>
              <Link className={s.link} href="/blog">
                すべての記事 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={s.section} id="company">
          <div className={s.wrap}>
            <div className={`${s.head} ${s.rv}`} {...rv}>
              <p className={s.mono}>Company</p>
              <h2>会社概要</h2>
            </div>
            <div className={`${s.co} ${s.rv}`} {...rv}>
              <table>
                <tbody>
                  <tr>
                    <th>会社名</th>
                    <td>株式会社BAULIFE</td>
                  </tr>
                  <tr>
                    <th>代表者</th>
                    <td>高橋 香輝</td>
                  </tr>
                  <tr>
                    <th>取締役</th>
                    <td>高橋 明日香</td>
                  </tr>
                  <tr>
                    <th>所在地</th>
                    <td>〒150-0002 東京都渋谷区渋谷2-19-15 宮益坂ビルディング609</td>
                  </tr>
                  <tr>
                    <th>法人番号</th>
                    <td>3011001149137</td>
                  </tr>
                  <tr>
                    <th>事業内容</th>
                    <td>
                      AI駆動のアプリ開発・物販・メディア運営
                      <br />
                      AI活用・新規事業の顧問・コンサルティング／物販のブランド化の支援
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={s.section} id="contact">
          <div className={s.wrap}>
            <div className={`${s.head} ${s.rv}`} {...rv}>
              <p className={s.mono}>Contact</p>
              <h2>お問い合わせ</h2>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>
          <a className={s.logo} href="#top">
            baulife
          </a>
          <nav aria-label="サイト">
            <Link href="/blog">ブログ</Link>
            <Link href="/recruit">採用情報</Link>
            <Link href="/privacy">プライバシーポリシー</Link>
            <Link href="/terms">利用規約</Link>
            <Link href="/tools">社内ポータル</Link>
            <span>© {new Date().getFullYear()} BAULIFE Inc.</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
