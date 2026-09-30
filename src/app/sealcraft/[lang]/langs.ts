import type { Lang } from "../copy";

/// 日本語以外のページの言語(URL の名前)。これ以外は 404
export const OTHER_LANGS: Exclude<Lang, "ja">[] = ["en", "zh-hant", "ko"];

export function toLang(s: string): Exclude<Lang, "ja"> | null {
  return (OTHER_LANGS as string[]).includes(s) ? (s as Exclude<Lang, "ja">) : null;
}
