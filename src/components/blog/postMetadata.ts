import type { Metadata } from "next";
import { blogPath, copy, type Post } from "@/lib/blog";

export function postMetadata(post: Post | null): Metadata {
  if (!post) return { title: "Build in Public" };
  const other = post.lang === "ja" ? "en" : "ja";
  return {
    title: `${post.title} — ${copy[post.lang].name} / ${copy[post.lang].owner}`,
    description: post.summary,
    alternates: post.hasOther
      ? { languages: { [other]: blogPath(other, post.slug) } }
      : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      url: blogPath(post.lang, post.slug),
    },
    robots: post.draft ? { index: false } : undefined,
  };
}
