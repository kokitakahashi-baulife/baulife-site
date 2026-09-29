import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogViews";
import { copy, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: `${copy.en.name} — BAULIFE`,
  description: copy.en.tagline,
  alternates: {
    languages: { ja: "/blog" },
    types: { "application/rss+xml": "/en/blog/feed.xml" },
  },
};

export default function Page() {
  return <BlogIndex lang="en" posts={getPosts("en")} />;
}
