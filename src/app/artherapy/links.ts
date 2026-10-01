export type ArtLang = "ja" | "en";

/// App Store のリンク。日本語版は日本のストア、英語版は国を付けない(開いた人の国のストアに移る)
export const APP_STORE_URL = "https://apps.apple.com/jp/app/id6808562261";
export const storeUrl = (lang: ArtLang) => (lang === "ja" ? APP_STORE_URL : "https://apps.apple.com/app/id6808562261");
