import LegalDoc from "../LegalDoc";
import { COPY } from "../copy";

export const metadata = { title: `${COPY.ja.legal.terms} — Sealcraft` };

export default function SealcraftTerms() {
  return <LegalDoc lang="ja" kind="terms" />;
}
