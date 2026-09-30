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
  title: "BAULIFE — 試して、変わり続ける。AIエージェント時代の新規事業スタジオ",
  description:
    "BAULIFEは、来たるAIエージェント時代を見据えて、新しい事業をつくり続ける新規事業スタジオです。AI活用や新規事業の顧問・コンサルティングのご相談も受け付けています。",
};

export default function Page() {
  return (
    <div className={`${geist.variable} ${geistMono.variable} ${zen.variable}`}>
      <Home posts={getPosts("ja").slice(0, 3)} />
    </div>
  );
}
