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
  title: "BAULIFE — AIエージェント時代の新規事業スタジオ",
  description:
    "BAULIFEは、来たるAIエージェント時代を見据えて、新しい事業をつくり続ける新規事業スタジオです。AI活用や新規事業の顧問・コンサルティングのご相談も受け付けています。",
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
