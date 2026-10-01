import type { Metadata } from "next";
import LandingPage from "../LandingPage";

export const metadata: Metadata = {
  title: "Artherapy: Adult Coloring Book — Ten minutes a day to let your mind unwind",
  description:
    "About 200 color-by-number pages, all free. Quick 10- or 20-minute pieces and detailed ones to savor. Turn your own photos into coloring pages. No ads while you color. iPhone / iPad.",
  alternates: { languages: { ja: "/artherapy", en: "/artherapy/en" } },
};

export default function ArtherapyEn() {
  return <LandingPage lang="en" />;
}
