import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { homeFontVars } from "@/components/home/fonts";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "BAULIFE — 試して、変わり続ける。AIエージェント時代の新規事業スタジオ",
  description:
    "BAULIFEは、来たるAIエージェント時代を見据えて、新しい事業をつくり続ける新規事業スタジオです。AI活用や新規事業の顧問・コンサルティングのご相談も受け付けています。",
  alternates: { canonical: "/", languages: { ja: "/", en: "/en" } },
};

export default function Page() {
  return (
    <div className={homeFontVars}>
      <Home posts={getPosts("ja").slice(0, 3)} />
    </div>
  );
}
