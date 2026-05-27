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
  title: "BAULIFE — キャラクターとブランドに付加価値を与え、世の中に届ける",
  description:
    "BAULIFEはクリエイターのパートナーとして、キャラクターのブランド設計からライセンス展開まで一貫してプロデュースします。",
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
