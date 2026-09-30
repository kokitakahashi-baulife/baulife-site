import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalDoc from "../../LegalDoc";
import { COPY } from "../../copy";
import { OTHER_LANGS, toLang } from "../langs";

export const dynamicParams = false;
export function generateStaticParams() {
  return OTHER_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return lang ? { title: `${COPY[lang].legal.privacy} — SealCraft` } : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang);
  if (!lang) notFound();
  return <LegalDoc lang={lang} kind="privacy" />;
}
