export type IP = {
  name: string; // 表示名（英/ロゴ名）
  creator: string; // クリエイター名
  image: string;
  color: string; // フレームのアクセントカラー
  href?: string; // 関連リンク（商品・SNS等）
};

export const ips: IP[] = [
  {
    name: "mog it.",
    creator: "小麦いと",
    image:
      "https://cdn.shopify.com/s/files/1/0635/1296/9290/files/40.png?v=1768463369",
    color: "#e85d75",
    href: "https://homu.baulife.world",
  },
];
