import type { Metadata } from "next";
import LandingPage from "./LandingPage";
import { COPY } from "./copy";

/// 日本語の紹介ページ(/sealcraft)。ほかの言語は [lang]/page.tsx。
export const metadata: Metadata = {
  title: COPY.ja.metaTitle,
  description: COPY.ja.metaDescription,
  alternates: { languages: { ja: "/sealcraft", en: "/sealcraft/en", "zh-Hant": "/sealcraft/zh-hant", ko: "/sealcraft/ko" } },
};

export default function Sealcraft() {
  return <LandingPage lang="ja" />;
}
