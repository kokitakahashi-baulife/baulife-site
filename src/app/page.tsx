import type { Metadata } from "next";
import { Geist, Geist_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import Home from "@/components/home/Home";
import { getPosts } from "@/lib/blog";

// トップページだけの書体。ほかのページ(ブログ・Artherapy・採用など)の見た目は変えない
const geist = Geist({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: "400", variable: "--font-geist-mono" });
const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-zen",
  preload: false,
});

export const metadata: Metadata = {
  title: "BAULIFE — 事業を、つくって育てて、届ける。",
  description:
    "BAULIFEは、シーリングスタンプ・スマホゲーム・塗り絵アプリ・犬のしつけメディアを自社で立ち上げて運営する新規事業スタジオです。企業の新規事業やAI活用、個人の物販のブランド化もお手伝いしています。",
};

export default function Page() {
  return (
    <div className={`${geist.variable} ${geistMono.variable} ${zen.variable}`}>
      <Home posts={getPosts("ja").slice(0, 3)} />
    </div>
  );
}
