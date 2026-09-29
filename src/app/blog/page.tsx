import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogViews";
import { copy, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: `${copy.ja.name} — BAULIFE`,
  description: copy.ja.tagline,
  alternates: {
    languages: { en: "/en/blog" },
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
};

export default function Page() {
  return <BlogIndex lang="ja" posts={getPosts("ja")} />;
}
