import LegalDoc from "../LegalDoc";
import { COPY } from "../copy";

export const metadata = { title: `${COPY.ja.legal.privacy} — Sealcraft` };

export default function SealcraftPrivacy() {
  return <LegalDoc lang="ja" kind="privacy" />;
}
