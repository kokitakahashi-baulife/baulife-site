import LegalDoc from "../LegalDoc";
import { PRIVACY } from "../legal";

export const metadata = {
  title: "プライバシーポリシー — SealCraft",
};

export default function SealcraftPrivacy() {
  return <LegalDoc title="プライバシーポリシー" paragraphs={PRIVACY} />;
}
