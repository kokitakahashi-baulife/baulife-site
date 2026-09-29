import { rss } from "@/lib/blog";

export const dynamic = "force-static";

export function GET() {
  return rss("en");
}
