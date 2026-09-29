import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Build in Public ブログの記事置き場。
// 1記事=1フォルダ: content/blog/<slug>/ja.md と en.md（片方だけでも可）。
// 記事の追加手順は content/blog/README.md。

export type Lang = "ja" | "en";

export type BlogNumber = { label: string; value: string; note?: string };

export type PostMeta = {
  slug: string;
  lang: Lang;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  project?: string;
  tags: string[];
  numbers: BlogNumber[];
  draft: boolean;
};

export type Post = PostMeta & { html: string; hasOther: boolean };

const ROOT = path.join(process.cwd(), "content", "blog");

// 必要な分だけの小さな frontmatter 解釈:
//   key: value / key: [a, b] / key: に続く "- item" の行
function parseFrontmatter(src: string) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {} as Record<string, string | string[]>, body: src };
  const data: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of m[1].split("\n")) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      (data[listKey] as string[]).push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, raw] = kv;
    if (raw === "") {
      data[key] = [];
      listKey = key;
    } else if (raw.startsWith("[") && raw.endsWith("]")) {
      data[key] = raw
        .slice(1, -1)
        .split(",")
        .map((s) => unquote(s.trim()))
        .filter(Boolean);
      listKey = null;
    } else {
      data[key] = unquote(raw);
      listKey = null;
    }
  }
  return { data, body: m[2] };
}

function unquote(s: string) {
  return s.replace(/^["'](.*)["']$/, "$1");
}

function str(v: string | string[] | undefined) {
  return typeof v === "string" ? v : "";
}

function list(v: string | string[] | undefined) {
  return Array.isArray(v) ? v : v ? [v] : [];
}

// "売上 | ¥120,000 | 前月比+20%" → {label, value, note}
function parseNumber(s: string): BlogNumber {
  const [label, value, note] = s.split("|").map((x) => x.trim());
  return { label, value: value ?? "", note: note || undefined };
}

// 本番では draft: true の記事を出さない。ローカルの next dev では確認用に出す
const showDrafts = process.env.NODE_ENV !== "production";

function readPost(slug: string, lang: Lang): Post | null {
  const file = path.join(ROOT, slug, `${lang}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  const draft = str(data.draft) === "true";
  if (draft && !showDrafts) return null;
  const other: Lang = lang === "ja" ? "en" : "ja";
  return {
    slug,
    lang,
    title: str(data.title) || slug,
    date: str(data.date) || slug.slice(0, 10),
    summary: str(data.summary),
    project: str(data.project) || undefined,
    tags: list(data.tags),
    numbers: list(data.numbers).map(parseNumber),
    draft,
    html: marked.parse(body, { async: false }),
    hasOther: fs.existsSync(path.join(ROOT, slug, `${other}.md`)),
  };
}

function slugs() {
  if (!fs.existsSync(ROOT)) return [];
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getPosts(lang: Lang): Post[] {
  return slugs()
    .map((s) => readPost(s, lang))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPost(slug: string, lang: Lang) {
  return readPost(slug, lang);
}

export const SITE_URL = "https://baulife.world";

export function blogPath(lang: Lang, slug?: string) {
  const base = lang === "ja" ? "/blog" : "/en/blog";
  return slug ? `${base}/${slug}` : base;
}

export const copy = {
  ja: {
    name: "Build in Public",
    tagline:
      "ひとりで事業をつくる中で詰まって、解決できたことの記録。同じ問題にぶつかった人が、そのまま真似して使えるように残しています。",
    owner: "Koki Takahashi",
    role: "BAULIFE 創業者",
    by: "Koki（BAULIFE 創業者）の作業を、AI が記録",
    disclaimer:
      "このブログは、BAULIFE 創業者 Koki の個人的な作業記録です。会社の公式な発信ではありません。",
    back: "← 記事一覧",
    other: "English",
    feed: "RSS",
    empty: "まだ記事はありません。",
    numbers: "今回の数字",
    notice:
      "この記事は、創業者の私（Koki）と AI（Claude）の実際の作業のやり取りをもとに、AI が書いた記録です。同じ問題で困ったら、この記事の URL をお使いの AI に渡してください。AI が参考例として読み、あなたの環境に合わせて同じ対処を進められるように書いています。",
    dateFmt: (d: string) => d.replaceAll("-", "."),
  },
  en: {
    name: "Build in Public",
    tagline:
      "Problems I got stuck on while building businesses solo — and exactly how I solved them, written so you can copy the fix.",
    owner: "Koki Takahashi",
    role: "Founder, BAULIFE",
    by: "Koki's work (founder of BAULIFE), written up by AI",
    disclaimer:
      "This is the personal work log of Koki, founder of BAULIFE — not an official company publication.",
    back: "← All posts",
    other: "日本語",
    feed: "RSS",
    empty: "No posts yet.",
    numbers: "Numbers this time",
    notice:
      "This post was written by AI (Claude), based on my actual working sessions with it. If you hit the same problem, hand this URL to your own AI assistant — it's written so the AI can use it as a reference case and apply the same fix to your setup.",
    dateFmt: (d: string) => d.replaceAll("-", "."),
  },
} as const;

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function rss(lang: Lang) {
  const t = copy[lang];
  const home = SITE_URL + blogPath(lang);
  const items = getPosts(lang)
    .filter((p) => !p.draft)
    .map((p) => {
      const url = SITE_URL + blogPath(lang, p.slug);
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(`${p.date}T09:00:00+09:00`).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${t.owner} — ${t.name}</title><link>${home}</link><description>${esc(t.tagline)}</description><language>${lang}</language>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
