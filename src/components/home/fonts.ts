import { Geist, Geist_Mono, Zen_Kaku_Gothic_New } from "next/font/google";

// トップページ(日本語・英語)だけの書体。ほかのページ(ブログ・Artherapy・採用など)の見た目は変えない
const geist = Geist({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: "400", variable: "--font-geist-mono" });
const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-zen",
  preload: false,
});

export const homeFontVars = `${geist.variable} ${geistMono.variable} ${zen.variable}`;
