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
      "SNSで「反応」や「売上」をつくった経験がある方",
      "複数の案件を段取りよく回せる方",
      "クリエイターさんと気持ちよくやり取りできる方",
      "シーリングやキャラクターが好きな方",
    ],
    terms: {
      headline: "業務委託／固定給なし・完全成果報酬",
      paragraphs: [
        "報酬は「コラボを立ち上げた成果」と「その売上」に連動する2階建ての設計。やった分・伸ばした分が、そのまま返ります。本数を増やすほど報酬も伸びていきます。",
        "具体的な報酬条件は、面談時に詳しくお伝えします。まずは1コラボだけの有償トライアルから始め、相性を見てから本契約に進みます。",
      ],
      callout:
        "安定した固定給をご希望の方には向きません。そこは正直にお伝えしています。",
    },
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
