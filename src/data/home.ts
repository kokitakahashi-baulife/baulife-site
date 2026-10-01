// トップページ(baulife.world)の中身。
// 事業の追加・終了、写真や動画の差し替えはこのファイルと public/home/ だけで済むようにしてある。

export type Media =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; label: string }
  | { kind: "pan"; src: string; alt: string } // 静止画をゆっくり動かして見せる
  | { kind: "dogs"; items: { src: string; caption: string }[] }; // 線画は再圧縮せずそのまま出す

export type Work = {
  id: string;
  name: string;
  kind: string;
  status: "販売中" | "公開中" | "近日公開" | "開発中";
  tags: string[];
  href?: string;
  nameFont?: string; // ブランドのロゴと同じ書体で名前を出すとき
  cta?: string; // カードの下に出す行き先の案内
  media: Media;
};

export const works: Record<"homu" | "artherapy" | "sealcraft" | "baudog", Work> = {
  homu: {
    id: "homu",
    name: "HOMU",
    nameFont: '"Gill Sans", "Gill Sans MT", "Gill Sans Nova", "Lato", sans-serif', // HOMUのロゴの書体(Gill Sans Bold)
    kind: "シーリングスタンプ専門店",
    status: "販売中",
    tags: ["物販", "D2C", "商品企画", "クリエイターコラボ"],
    href: "https://homu.baulife.world/",
    cta: "オンラインストアへ",
    media: {
      kind: "video",
      src: "/home/homu-brand.mp4",
      poster: "/home/homu-brand-poster.jpg",
      label: "HOMUの事業紹介。3Dスタンプヘッド、クリエイターとのコラボ、ポストカードとワックス、定期便",
    },
  },
  artherapy: {
    id: "artherapy",
    name: "Artherapy",
    kind: "大人の塗り絵アプリ",
    status: "公開中",
    tags: ["アプリ", "iOS", "セルフケア"],
    href: "/artherapy",
    cta: "紹介ページへ",
    media: {
      kind: "video",
      src: "/home/artherapy.mp4",
      poster: "/home/artherapy-poster.jpg",
      label: "Artherapyの紹介動画。リネンの机のスマホで、くまのカフェの塗り絵が色づいていく",
    },
  },
  sealcraft: {
    id: "sealcraft",
    name: "Sealcraft",
    href: "/sealcraft",
    cta: "紹介ページへ",
    kind: "シーリングスタンプのスマホゲーム",
    status: "開発中",
    tags: ["ゲーム", "iOS"],
    media: { kind: "video", src: "/home/sealcraft.mp4", poster: "/home/sealcraft-poster.jpg", label: "Sealcraftの紹介動画" },
  },
  baudog: {
    id: "baudog",
    name: "BAUDOG",
    kind: "犬のしつけコマンドに特化したメディア",
    status: "公開中",
    tags: ["メディア", "SEO", "ペット"],
    href: "https://baudog.world/",
    cta: "サイトへ",
    media: {
      kind: "dogs",
      items: [
        { src: "/home/dog-down.webp", caption: "down" },
        { src: "/home/dog-high-five.webp", caption: "high five" },
        { src: "/home/dog-come.webp", caption: "come" },
        { src: "/home/dog-place.webp", caption: "place" },
      ],
    },
  },
};

// HOMUの物撮り(白地に並べる)
export const homuObjects = [
  { src: "/home/homu-ufo.jpg", alt: "3Dスタンプヘッド「さらわれる牛さん」の封蝋", caption: "abducted cow" },
  { src: "/home/homu-ocean.jpg", alt: "3Dスタンプヘッド「OCEAN FRIENDS」の封蝋", caption: "ocean friends" },
  { src: "/home/homu-wax-pink.jpg", alt: "限定MIXワックス ポップピンク", caption: "pop pink wax" },
  { src: "/home/homu-bouquet.jpg", alt: "花束の封蝋", caption: "bouquet" },
];

// お問い合わせの用件。value は /api/contact にも送られ、メール件名に入る
export const inquiryTypes = {
  biz: "新規事業の顧問・コンサルのご相談",
  ai: "AI活用の顧問・コンサルのご相談",
  brand: "物販のブランド化のご相談",
  other: "取材・各事業・その他",
} as const;

export type InquiryType = keyof typeof inquiryTypes;

export const services: { type: InquiryType; who: string; title: string; body: string }[] = [
  {
    type: "biz",
    who: "For Business",
    title: "新規事業の顧問・コンサルティング",
    body: "アイデアの検証から、最初の商品・アプリ・サイトを世に出すところまで、自社で試してきたやり方でご一緒します。",
  },
  {
    type: "ai",
    who: "For Business",
    title: "AI活用の顧問・コンサルティング",
    body: "業務のどこをAIに任せられるかを洗い出し、実際に動く仕組みまで作ります。",
  },
  {
    type: "brand",
    who: "For Sellers",
    title: "物販のブランド化支援",
    body: "個人の物販を、選ばれ続けるブランドに育てるための商品づくりと見せ方をご一緒します。",
  },
];

// ───────── 英語版(/en) ─────────
// 日本語が正本。日本語を変えたら、ここの英語も合わせて直す。
export type HomeLang = "ja" | "en";

const WORKS_EN: Record<keyof typeof works, { kind: string; status: string; tags: string[]; cta: string; label?: string }> = {
  homu: { kind: "Wax sealing stamp shop", status: "On sale", tags: ["Retail", "D2C", "Product design", "Creator collabs"], cta: "Visit the store", label: "About HOMU: 3D stamp heads, creator collaborations, postcards and wax, and the monthly subscription" },
  artherapy: { kind: "Coloring app for adults", status: "Available", tags: ["App", "iOS", "Self-care"], cta: "Learn more", label: "Artherapy: a bear café coloring page filling in with color on a phone" },
  sealcraft: { kind: "Wax seal merge game", status: "In development", tags: ["Game", "iOS"], cta: "Learn more", label: "Sealcraft trailer" },
  baudog: { kind: "Dog training commands, explained one by one", status: "Live", tags: ["Media", "SEO", "Pets"], cta: "Visit the site" },
};

/** 言語に合わせた事業カード。status の判定(開発中かどうか)は devStatus を見る */
export function worksFor(lang: HomeLang): (Work & { devStatus: boolean })[] {
  return [works.homu, works.sealcraft, works.artherapy, works.baudog].map((w) => {
    const dev = w.status === "開発中";
    if (lang === "ja") return { ...w, devStatus: dev };
    const e = WORKS_EN[w.id as keyof typeof works];
    const media = w.media.kind === "video" && e.label ? { ...w.media, label: e.label } : w.media;
    const href = w.href === "/artherapy" ? "/artherapy/en" : w.href === "/sealcraft" ? "/sealcraft/en" : w.href;
    return { ...w, kind: e.kind, status: e.status as Work["status"], tags: e.tags, cta: e.cta, href, media, devStatus: dev };
  });
}

const HOMU_OBJECTS_EN = ["Wax seal from the 3D stamp head “Abducted Cow”", "Wax seal from the 3D stamp head “OCEAN FRIENDS”", "Limited MIX wax, Pop Pink", "Bouquet wax seal"];
export function homuObjectsFor(lang: HomeLang) {
  return lang === "ja" ? homuObjects : homuObjects.map((o, i) => ({ ...o, alt: HOMU_OBJECTS_EN[i] }));
}

/** 画面に出す用件の名前(送る値は inquiryTypes の日本語のまま。メール件名は日本語でそろえる) */
export const inquiryLabels: Record<HomeLang, Record<InquiryType, string>> = {
  ja: { ...inquiryTypes },
  en: {
    biz: "Advisory for new businesses",
    ai: "Advisory on using AI",
    brand: "Turning your shop into a brand",
    other: "Press, our products, or anything else",
  },
};

const SERVICES_EN: Record<InquiryType, { title: string; body: string } | undefined> = {
  biz: { title: "New business advisory & consulting", body: "From testing an idea to shipping the first product, app or site — we work alongside you using the methods we've tried on our own businesses." },
  ai: { title: "AI adoption advisory & consulting", body: "We map out which parts of your work AI can take over, and build systems that actually run." },
  brand: { title: "Brand building for independent sellers", body: "Product development and presentation that turn an individual shop into a brand people keep choosing." },
  other: undefined,
};
export function servicesFor(lang: HomeLang) {
  return lang === "ja" ? services : services.map((sv) => ({ ...sv, ...SERVICES_EN[sv.type]! }));
}
