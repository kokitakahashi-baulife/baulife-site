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
      src: "/home/homu.mp4",
      poster: "/home/homu-poster.jpg",
      label: "HOMUの定期便を開封し、ワックスを溶かしてスタンプを押し、封蝋ができあがるまで",
    },
  },
  artherapy: {
    id: "artherapy",
    name: "Artherapy",
    kind: "大人の塗り絵アプリ",
    status: "近日公開",
    tags: ["アプリ", "iOS", "セルフケア"],
    href: "/artherapy",
    cta: "紹介ページへ",
    media: {
      kind: "video",
      src: "/home/art.mp4",
      poster: "/home/art-poster.jpg",
      label: "夜空の街の線画が、Artherapyで塗り上がっていく様子",
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
