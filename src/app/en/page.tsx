import type { Metadata } from "next";
import Home from "@/components/home/Home";
import { homeFontVars } from "@/components/home/fonts";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "BAULIFE — Keep trying. Keep changing. A venture studio for the age of AI agents",
  description:
    "BAULIFE is a Tokyo venture studio building for the coming age of AI agents. We build our own apps, retail and media businesses, and advise on AI adoption and new businesses.",
  alternates: { canonical: "/en", languages: { ja: "/", en: "/en" } },
};

export default function Page() {
  return (
    <div className={homeFontVars}>
      <Home lang="en" posts={getPosts("en").slice(0, 3)} />
    </div>
  );
}
