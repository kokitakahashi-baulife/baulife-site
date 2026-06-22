export type Job = {
  slug: string;
  title: string;
  employmentType: string; // バッジ表示
  summary: string; // 一覧カード用の短い説明
  lead: string; // 詳細ページ冒頭のリード文
  background: string;
  responsibilities: { label: string; body: string }[];
  responsibilitiesNote: string;
  wants: string[];
  terms: {
    headline: string;
    paragraphs: string[];
    callout: string;
  };
};

export const jobs: Job[] = [
  {
    slug: "collab-producer",
    title: "コラボプロデューサー",
    employmentType: "業務委託・完全成果報酬",
    summary:
      "クリエイターと組んで、世界にひとつのコラボ商品（シーリングのブラインドボックス）を企画から世に出すまで一緒に走る役割です。",
    lead: "HOMUは、いろんなクリエイターさんと一緒に、世界にひとつのコラボ商品（シーリングのブラインドボックス）を次々に生み出していきます。その商品を企画から世に出すまで一緒に走る“プロデューサー”を募集します。",
    background:
      "HOMUはいま、たくさんのクリエイターと組んでコラボ商品を量産していくフェーズに入ります。立ち上げ期の今だからこそ、一緒に仕組みをつくりながら、HOMUを“いろんなIPが集まる場所”に育てていける仲間を探しています。",
    responsibilities: [
      {
        label: "企画する",
        body: "クリエイターさんと話し、世界にひとつのコラボ商品を企画する。",
      },
      {
        label: "広げて、売る",
        body: "SNSで告知し、わくわくを広げて、商品を世に出す。",
      },
    ],
    responsibilitiesNote:
      "製造・発注・検品・発送はHOMU側で行います。あなたは「企画」と「SNSでの盛り上げ」に集中できます。",
    wants: [
      "シーリングスタンプや文具が好きな方",
      "SNS発のキャラクターやクリエイター文化が好きな方",
      "SNSでの発信・運用に興味がある方（経験があれば尚可）",
      "複数の案件を段取りよく進められる方",
      "クリエイターと気持ちよくやり取りできる方",
    ],
    terms: {
      headline: "業務委託／固定給なし・完全成果報酬",
      paragraphs: [
        "報酬は2種類です。① コラボプロジェクトが発足したタイミングでお支払いする「立ち上げ報酬」と、② そのプロジェクトから生まれた売上に応じてお支払いする「成果報酬」。",
        "立ち上げから販売までを動かすほど、①と②の両方が積み上がっていきます。具体的な金額・料率は面談時にお伝えします。まずは1コラボだけの有償トライアルから始め、相性を見てから本契約に進みます。",
      ],
      callout:
        "安定した固定給をご希望の方には向きません。そこは正直にお伝えしています。",
    },
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
