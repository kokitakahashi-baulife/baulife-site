import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-ja",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://baulife.world"),
  title: "BAULIFE — 新規事業スタジオ",
  description:
    "BAULIFEは、事業を自社で立ち上げて運営する新規事業スタジオです。企業の新規事業やAI活用、個人の物販のブランド化もお手伝いしています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
