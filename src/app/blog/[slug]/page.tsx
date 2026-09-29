import { notFound } from "next/navigation";
import { BlogPost } from "@/components/blog/BlogViews";
import { postMetadata } from "@/components/blog/postMetadata";
import { getPost, getPosts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts("ja").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return postMetadata(getPost(slug, "ja"));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug, "ja");
  if (!post) notFound();
  return <BlogPost post={post} />;
}
