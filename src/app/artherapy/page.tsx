import type { Metadata } from "next";
import LandingPage from "./LandingPage";

// 題と説明は layout.tsx(プライバシー・規約と共有)。ここは言語の対応だけ
export const metadata: Metadata = {
  alternates: { languages: { ja: "/artherapy", en: "/artherapy/en" } },
};

export default function Artherapy() {
  return <LandingPage lang="ja" />;
}
