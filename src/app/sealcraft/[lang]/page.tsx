import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "../LandingPage";
import { COPY } from "../copy";
import { OTHER_LANGS, toLang } from "./langs";

/// 英語・繁体字中国語・韓国語の紹介ページ(/sealcraft/en など)。日本語は ../page.tsx。
export const dynamicParams = false;
export function generateStaticParams() {
  return OTHER_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = toLang((await params).lang);
  if (!lang) return {};
  return {
    title: COPY[lang].metaTitle,
    description: COPY[lang].metaDescription,
    alternates: { languages: { ja: "/sealcraft", en: "/sealcraft/en", "zh-Hant": "/sealcraft/zh-hant", ko: "/sealcraft/ko" } },
  };
}

export default async function SealcraftLang({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang);
  if (!lang) notFound();
  return <LandingPage lang={lang} />;
}
