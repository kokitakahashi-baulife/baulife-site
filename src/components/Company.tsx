"use client";

import ScrollReveal from "./ScrollReveal";

const rows = [
  { label: "会社名", value: "株式会社BAULIFE" },
  { label: "代表者", value: "高橋 香輝" },
  { label: "取締役", value: "高橋 明日香" },
  {
    label: "所在地",
    value: "〒150-0002 東京都渋谷区渋谷2-19-15 宮益坂ビルディング609",
  },
  { label: "法人番号", value: "3011001149137" },
  { label: "資本金", value: "100万円" },
  {
    label: "事業内容",
    value: "キャラクタープロデュース / D2Cブランド運営 / アプリ開発",
  },
];

export default function Company() {
  return (
    <section
      id="company"
      className="py-16 sm:py-28 px-5 sm:px-6 bg-white border-t border-[#eee]"
    >
      <div className="max-w-[640px] mx-auto">
        <ScrollReveal>
          <p
            className="text-xs tracking-[4px] uppercase text-[#e85d75] text-center mb-2"
            style={{ fontFamily: "var(--font-en)" }}
          >
            Company
          </p>
          <h2 className="text-2xl font-bold text-center mb-14">会社概要</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <table className="w-full text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-[#eee]">
                  <th className="text-left font-semibold text-[#1a1a1a] py-3.5 pr-4 whitespace-nowrap align-top w-[120px]">
                    {row.label}
                  </th>
                  <td className="text-[#666] py-3.5 leading-relaxed">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>
      </div>
    </section>
  );
}
