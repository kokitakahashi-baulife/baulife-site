import LegalDoc from "../LegalDoc";
import { TERMS } from "../legal";

export const metadata = {
  title: "利用規約 — SealCraft",
};

export default function SealcraftTerms() {
  return <LegalDoc title="利用規約" paragraphs={TERMS} />;
}
