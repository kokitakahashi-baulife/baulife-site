"use client";

import ScrollReveal from "./ScrollReveal";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="py-16 sm:py-24 px-5 sm:px-6"
      style={{
        background:
          "linear-gradient(160deg, #fdfbfb 0%, #f7e8ec 40%, #faf0e6 100%)",
      }}
    >
      <div className="max-w-[640px] mx-auto">
        <ScrollReveal>
          <p
            className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
            style={{ fontFamily: "var(--font-en)" }}
          >
            Philosophy
          </p>
          <h2 className="text-2xl font-bold text-center mb-10">私たちの信念</h2>
        </ScrollReveal>

        <div className="space-y-5 text-[15px] sm:text-base leading-[1.9] text-[#333]">
          <ScrollReveal delay={0.1}>
            <p>
              人生において最も価値があるのは、何でも話せる、心を通わせ合えた相手がいることだと、私は信じています。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <p>
              だからこそ私は、人と人を繋ぐ「媒介物」を生み出し、届けたいという想いでBAULIFE（バウライフ）を創りました。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <p>
              媒介物のカタチは、ブランド、キャラクター、空間、サービス、生物など、様々です。これらへの愛着は、決して人間関係の「代わり」になるものではありません。むしろ、大切な人との関係をさらに広げ、深めてくれる「拡張や補完」として機能するものだと実感しています。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p>
              例えば、私には愛犬がいます。言葉は交わせなくても、彼に愛情を注いだ思い出や、彼をきっかけに他者との繋がりが深まった機会は数えきれません。客観的に見れば、それは社会の大きな課題を解決するものではないが、それでも、私の人生には確かな意味を与えてくれています。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p>
              世の中にあるものが、すべて大規模で、永続的で、役に立つモノである必要はありません。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p>
              小さくても、いつか消えてしまうものでも、何かを解決してくれるモノでなくともいい。誰かの人生にそっと寄り添い、心を通わせるきっかけになる。そんな愛される媒介物を、私たちは世界に届けていきます。
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
