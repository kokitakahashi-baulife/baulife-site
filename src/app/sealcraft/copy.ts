/// Sealcraft の紹介ページの文(4言語)。日本語が正本。
///
/// ⚠️ **見出しは「何のゲームか」がそれだけで分かる言葉**(2026-09-30 Koki: 「手紙に封蝋を押す、ほのぼのマージ」)。
///    アプリの App Store のサブタイトルと同じ。詩的な言い回しにしない。
/// ⚠️ **課金の書き方はアプリの実装と必ず揃える**(アプリの `docs/app-store.md` の課金の品)。
///    無料で物語は最後まで遊べる / 払うと早くなる・見た目が増えるだけ。
/// ⚠️ **数字と利用者の声は載せない**。まだ公開前。作れば嘘になる。
/// ⚠️ 訳語はアプリの `docs/l10n-glossary.md` と同じにする(封蝋=wax seal/封蠟/봉랍 など)。

export type Lang = "ja" | "en" | "zh-hant" | "ko";

export const LANGS: { lang: Lang; label: string; htmlLang: string }[] = [
  { lang: "ja", label: "日本語", htmlLang: "ja" },
  { lang: "en", label: "English", htmlLang: "en" },
  { lang: "zh-hant", label: "繁體中文", htmlLang: "zh-Hant" },
  { lang: "ko", label: "한국어", htmlLang: "ko" },
];

/// ページの住所。日本語は /sealcraft、ほかは /sealcraft/<言語>
export function base(lang: Lang) {
  return lang === "ja" ? "/sealcraft" : `/sealcraft/${lang}`;
}

/// 画面の写真。日本語は前から置いてある写真、ほかは言語ごとのフォルダ
export function screen(lang: Lang, name: "home" | "board" | "stir" | "pour" | "bench") {
  if (lang === "ja") return `/sealcraft/screen-${name}.jpg`;
  return `/sealcraft/${lang}/screen-${name === "bench" ? "press" : name}.jpg`;
}

type Copy = {
  metaTitle: string;
  metaDescription: string;
  nav: { play: string; price: string };
  footer: { privacy: string; terms: string; contact: string };
  platform: string;
  appIconAlt: string;
  heroTitle: [string, string];
  heroLead: [string, string];
  comingSoon: string;
  seePlay: string;
  homeAlt: string;
  liliAlt: string;
  playHeading: [string, string];
  playLead: string;
  steps: { alt: string; title: string; body: string }[];
  sealsHeading: [string, string];
  sealsLead: [string, string, string];
  sealAlts: string[];
  moreHeading: [string, string];
  moreLead: string;
  benchAlt: string;
  more: { title: string; body: string }[];
  priceHeading: [string, string];
  price: string[];
  privacyLink: [string, string, string];
  legal: { privacy: string; terms: string; contactLabel: string; appName: string; updated: string };
};

export const COPY: Record<Lang, Copy> = {
  ja: {
    metaTitle: "Sealcraft — 手紙に封蝋を押す、ほのぼのマージ",
    metaDescription:
      "坂の途中の封蝋工房で、見習いのリリと手紙のお手伝い。重ねて作った材料でスタンプヘッドを仕上げ、ワックスを溶かして、自分の指で垂らして押す。世界にひとつの封蝋を集めるマージゲーム。",
    nav: { play: "あそびかた", price: "料金" },
    footer: { privacy: "プライバシーポリシー", terms: "利用規約", contact: "お問い合わせ" },
    platform: "iPhone",
    appIconAlt: "Sealcraft のアプリアイコン",
    heroTitle: ["手紙に封蝋を押す、", "ほのぼのマージ。"],
    heroLead: ["坂の途中の封蝋工房で、見習いのリリと手紙のお手伝い。", "自分の指で垂らして押した封蝋は、世界にひとつだけ。"],
    comingSoon: "App Store で近日公開",
    seePlay: "あそびかたを見る",
    homeAlt: "封蝋工房のホーム画面",
    liliAlt: "見習いの封蝋師リリ",
    playHeading: ["町の人の手紙に、", "封蝋を押す。"],
    playLead: "工房には、誰かに手紙を送りたい人がやってきます。想いを聞いて、材料を作って、封蝋を押すまでを、ぜんぶ自分の手で。",
    steps: [
      { alt: "作業台の盤面。同じ品を重ねて合体させる", title: "重ねて、材料を作る", body: "同じ品を重ねると、ひとつ上の品に。依頼主の想いに合う題材を届けると、真鍮のスタンプヘッドができあがります。" },
      { alt: "スプーンの中で溶けた3色のワックスを混ぜ棒で混ぜる", title: "溶かして、混ぜる", body: "好きな色のワックスを4粒、スプーンで溶かします。少しだけ混ぜればマーブルに、ぐるぐる回せばひとつの色に。" },
      { alt: "手紙の上で、スタンプヘッドの形を指でなぞってワックスを垂らす", title: "指でなぞって、押す", body: "手紙の上を指でなぞって垂らし、スタンプヘッドを押す。道具を育てるほど、まるくきれいな封蝋になります。" },
    ],
    sealsHeading: ["同じ封蝋は、", "二つとできない。"],
    sealsLead: ["色の選び方、混ぜ方、垂らし方で、仕上がりは毎回ちがいます。押した封蝋はコレクションに残ります。スタンプヘッドの図柄は、封蝋スタンプの店", "HOMU", "のデザインです。"],
    sealAlts: ["うさぎの封蝋", "チューリップの封蝋", "しろくまの封蝋", "カメオの封蝋", "王冠の封蝋", "シーリングスタンプの封蝋"],
    moreHeading: ["のんびり、", "毎日すこしずつ。"],
    moreLead: "争いも、急かされる期限もありません。やさしい物語と一緒に、自分のペースで。",
    benchAlt: "封蝋を押す作業台。炉・スプーン・手紙・色のワックス",
    more: [
      { title: "工房と町をよみがえらせる", body: "設備を建てると、作業台に新しい材料の元が届きます。章ごとに、町の新しい場所へ。" },
      { title: "フレンドとポストカードを送り合う", body: "押した封蝋とシールをポストカードに貼って、IDでつながったフレンドに送れます。文章は送れないので、気楽に。" },
      { title: "毎日の腕だめし", body: "決まった回数で注文をそろえる、1日1面のマージパズル。エネルギーは使いません。" },
      { title: "月替わりのガチャ", body: "1日1回は無料。リリの衣装やシールが毎月替わります。確率はガチャの画面に出ています。" },
    ],
    priceHeading: ["無料で、", "物語は最後まで。"],
    price: [
      "ダウンロードは無料です。アプリ内で、宝石・はじめての贈り物・毎日のガチャ券を買えます。払うと待ち時間が短くなったり、見た目の品が増えたりしますが、払わなくても物語は最後まで遊べます。",
      "ガチャで出る品と確率は、引く前にガチャの画面で確かめられます。",
      "ログインやメールアドレスの登録はありません。進み具合は端末の中だけに保存します。フレンド機能を使うときだけ、ID・名前・送った作品を、届けるためにサーバーに置きます（設定からいつでも消せます）。",
    ],
    privacyLink: ["くわしくは", "プライバシーポリシー", "をご覧ください。"],
    legal: { privacy: "プライバシーポリシー", terms: "利用規約", contactLabel: "お問い合わせ窓口", appName: "Sealcraft（シールクラフト）", updated: "最終更新日" },
  },
  en: {
    metaTitle: "Sealcraft — Cozy merge & wax seal letters",
    metaDescription:
      "In a little wax seal workshop on a hillside, help the apprentice Lili with the townspeople's letters. Merge materials, melt the wax, pour it with your finger and press a seal that's yours alone.",
    nav: { play: "How to play", price: "Price" },
    footer: { privacy: "Privacy Policy", terms: "Terms of Use", contact: "Contact" },
    platform: "iPhone",
    appIconAlt: "Sealcraft app icon",
    heroTitle: ["Press wax seals on letters.", "A cozy merge game."],
    heroLead: ["In a little wax seal workshop on a hillside, help the apprentice Lili with the town's letters.", "Every seal you pour and press by hand is one of a kind."],
    comingSoon: "Coming soon on the App Store",
    seePlay: "See how to play",
    homeAlt: "The wax seal workshop home screen",
    liliAlt: "Lili, the apprentice seal maker",
    playHeading: ["Seal the letters", "of the townspeople."],
    playLead: "People come to the workshop wanting to send a letter to someone. Listen to their feelings, make the materials, and press the seal — all with your own hands.",
    steps: [
      { alt: "The workbench board, where matching items merge", title: "Merge to make materials", body: "Merge two matching items to get the next one. Deliver what matches the client's feelings, and a brass stamp head is finished." },
      { alt: "Stirring three colors of melted wax in a spoon", title: "Melt and stir", body: "Melt 4 beads of wax in any colors in the spoon. Stir a little for marble, or round and round for one soft color." },
      { alt: "Tracing the stamp head's shape on the letter to pour the wax", title: "Trace, pour and press", body: "Trace over the letter with your finger to pour, then press the stamp head. The more you grow your tools, the rounder and prettier your seals." },
    ],
    sealsHeading: ["No two seals", "are ever the same."],
    sealsLead: ["The colors you pick, how you stir and how you pour make every seal different. Every seal you press stays in your collection. The stamp head designs come from the wax seal stamp shop", "HOMU", "."],
    sealAlts: ["Rabbit wax seal", "Tulip wax seal", "Polar bear wax seal", "Cameo wax seal", "Crown wax seal", "Sealing stamp wax seal"],
    moreHeading: ["Slow and cozy,", "a little every day."],
    moreLead: "No battles and no deadlines rushing you. Just a gentle story, at your own pace.",
    benchAlt: "The sealing bench with the melting stove, spoon, letter and colored beads",
    more: [
      { title: "Bring the workshop and town back to life", body: "Build facilities and new material generators arrive on your workbench. Each chapter takes you to a new place in town." },
      { title: "Send postcards to friends", body: "Put your seals and stickers on a postcard and send it to friends you connect with by ID. No text messages, so it's always relaxed." },
      { title: "Daily Puzzle", body: "A merge puzzle a day: fill the orders within a set number of taps. It doesn't use energy." },
      { title: "Monthly gacha", body: "One free draw a day. Lili's outfits and stickers change every month. The odds are shown on the gacha screen." },
    ],
    priceHeading: ["Free to play,", "the whole story."],
    price: [
      "The download is free. In the app you can buy gems, the Welcome Gift and the Daily Gacha Ticket. Paying shortens waits or adds cosmetic items, but you can play the whole story without paying.",
      "You can check the items and odds on the gacha screen before you draw.",
      "There is no login or email sign-up. Your progress is saved only on your device. Only when you use the friends feature are your ID, name and the postcards you send kept on our server to deliver them (you can delete them anytime in Settings).",
    ],
    privacyLink: ["For details, see the", "Privacy Policy", "."],
    legal: { privacy: "Privacy Policy", terms: "Terms of Use", contactLabel: "Contact", appName: "Sealcraft", updated: "Last updated" },
  },
  "zh-hant": {
    metaTitle: "Sealcraft — 在信上蓋封蠟的療癒合成遊戲",
    metaDescription:
      "在坡道上的小小封蠟工房，和見習生莉莉一起幫忙小鎮居民寄信。合成材料完成印章頭，熔化蠟，用手指倒下並蓋印。收集世界上獨一無二的封蠟吧。",
    nav: { play: "玩法", price: "費用" },
    footer: { privacy: "隱私權政策", terms: "使用條款", contact: "聯絡我們" },
    platform: "iPhone",
    appIconAlt: "Sealcraft 的 App 圖示",
    heroTitle: ["在信上蓋封蠟，", "療癒的合成遊戲。"],
    heroLead: ["在坡道上的封蠟工房，和見習生莉莉一起幫忙大家寄信。", "親手倒下、蓋印的封蠟，世界上只有一個。"],
    comingSoon: "即將在 App Store 推出",
    seePlay: "看看玩法",
    homeAlt: "封蠟工房的主畫面",
    liliAlt: "見習封蠟師莉莉",
    playHeading: ["為小鎮居民的信，", "蓋上封蠟。"],
    playLead: "想寄信給某人的人們會來到工房。傾聽他們的心意、製作材料、蓋下封蠟，全部都由你親手完成。",
    steps: [
      { alt: "工作台的盤面，把相同的物品疊在一起合成", title: "合成，製作材料", body: "把相同的物品疊在一起，就會變成上一級的物品。交出符合委託人心意的東西，黃銅印章頭就完成了。" },
      { alt: "用攪拌棒攪拌蠟勺中熔化的三色蠟", title: "熔化，攪拌", body: "把4顆喜歡顏色的蠟粒放進蠟勺熔化。稍微攪一下是大理石紋，一直攪就融成一種顏色。" },
      { alt: "在信上用手指描繪印章頭的形狀倒蠟", title: "用手指描繪，蓋印", body: "用手指在信上描繪倒蠟，再蓋下印章頭。工具培養得越好，封蠟就越圓、越漂亮。" },
    ],
    sealsHeading: ["沒有兩個", "一模一樣的封蠟。"],
    sealsLead: ["顏色的選法、攪拌方式、倒蠟方式不同，每次的成品都不一樣。蓋好的封蠟會留在收藏中。印章頭的圖案來自封蠟印章專賣店", "HOMU", "的設計。"],
    sealAlts: ["兔子封蠟", "鬱金香封蠟", "北極熊封蠟", "浮雕人像封蠟", "王冠封蠟", "封蠟印章圖案的封蠟"],
    moreHeading: ["悠閒地，", "每天一點點。"],
    moreLead: "沒有戰鬥，也沒有催促的期限。和溫柔的故事一起，按照自己的步調。",
    benchAlt: "蓋封蠟的工作台，有熔爐、蠟勺、信和彩色蠟粒",
    more: [
      { title: "讓工房與小鎮重現生機", body: "建造設施後，工作台會送來新的材料產生器。每一章都會前往小鎮的新地方。" },
      { title: "和好友互寄明信片", body: "把封蠟和貼紙貼在明信片上，寄給用ID連結的好友。無法傳送文字，輕鬆自在。" },
      { title: "每日挑戰", body: "在限定次數內湊齊訂單，每天一關的合成益智遊戲。不消耗能量。" },
      { title: "每月更換的扭蛋", body: "每天1次免費。莉莉的服裝和貼紙每個月都會更換。機率顯示在扭蛋畫面上。" },
    ],
    priceHeading: ["免費遊玩，", "故事可以玩到最後。"],
    price: [
      "下載免費。可在 App 內購買寶石、第一份禮物、每日扭蛋券。付費可以縮短等待時間或增加外觀物品，但不付費也能玩到故事的最後。",
      "扭蛋會出現的物品和機率，可以在抽之前於扭蛋畫面確認。",
      "不需要登入或註冊電子郵件。遊戲進度只保存在你的裝置中。只有在使用好友功能時，才會為了傳送而把ID、名稱和寄出的作品放在伺服器上（隨時可在設定中刪除）。",
    ],
    privacyLink: ["詳情請參閱", "隱私權政策", "。"],
    legal: { privacy: "隱私權政策", terms: "使用條款", contactLabel: "聯絡窗口", appName: "Sealcraft", updated: "最後更新" },
  },
  ko: {
    metaTitle: "Sealcraft — 편지에 봉랍을 찍는 힐링 머지",
    metaDescription:
      "언덕길의 작은 봉랍 공방에서 견습생 릴리와 함께 마을 사람들의 편지를 도와요. 재료를 합쳐 스탬프 헤드를 만들고, 왁스를 녹여 손가락으로 붓고 찍어요.",
    nav: { play: "플레이 방법", price: "요금" },
    footer: { privacy: "개인정보 처리방침", terms: "이용약관", contact: "문의" },
    platform: "iPhone",
    appIconAlt: "Sealcraft 앱 아이콘",
    heroTitle: ["편지에 봉랍을 찍는,", "힐링 머지 게임."],
    heroLead: ["언덕길의 봉랍 공방에서 견습생 릴리와 함께 편지를 도와요.", "내 손으로 붓고 찍은 봉랍은 세상에 하나뿐이에요."],
    comingSoon: "App Store 출시 예정",
    seePlay: "플레이 방법 보기",
    homeAlt: "봉랍 공방 홈 화면",
    liliAlt: "견습 봉랍사 릴리",
    playHeading: ["마을 사람들의 편지에", "봉랍을 찍어요."],
    playLead: "누군가에게 편지를 보내고 싶은 사람들이 공방을 찾아와요. 마음을 듣고, 재료를 만들고, 봉랍을 찍는 것까지 모두 내 손으로.",
    steps: [
      { alt: "같은 아이템을 겹쳐 합치는 작업대 보드", title: "합쳐서 재료를 만들어요", body: "같은 아이템을 겹치면 한 단계 위의 아이템이 돼요. 의뢰인의 마음에 맞는 것을 전하면 황동 스탬프 헤드가 완성돼요." },
      { alt: "스푼 안에서 녹은 세 가지 색의 왁스를 젓는 모습", title: "녹이고, 저어요", body: "좋아하는 색의 왁스 알갱이 4개를 스푼에서 녹여요. 조금만 저으면 마블, 빙글빙글 저으면 한 가지 색이 돼요." },
      { alt: "편지 위에서 스탬프 헤드 모양을 손가락으로 따라 그리며 왁스를 붓는 모습", title: "손가락으로 그리며 찍어요", body: "편지 위를 손가락으로 따라 그리며 붓고, 스탬프 헤드를 찍어요. 도구를 키울수록 둥글고 예쁜 봉랍이 돼요." },
    ],
    sealsHeading: ["똑같은 봉랍은", "두 번 다시 없어요."],
    sealsLead: ["색 고르는 법, 젓는 법, 붓는 법에 따라 매번 다르게 완성돼요. 찍은 봉랍은 컬렉션에 남아요. 스탬프 헤드의 도안은 봉랍 스탬프 가게", "HOMU", "의 디자인이에요."],
    sealAlts: ["토끼 봉랍", "튤립 봉랍", "북극곰 봉랍", "카메오 봉랍", "왕관 봉랍", "실링 스탬프 봉랍"],
    moreHeading: ["느긋하게,", "매일 조금씩."],
    moreLead: "싸움도, 재촉하는 기한도 없어요. 따뜻한 이야기와 함께 내 속도대로.",
    benchAlt: "화로, 스푼, 편지, 색 알갱이가 놓인 봉랍 작업대",
    more: [
      { title: "공방과 마을을 되살려요", body: "설비를 지으면 작업대에 새로운 재료 생성기가 도착해요. 장마다 마을의 새로운 장소로." },
      { title: "친구와 엽서를 주고받아요", body: "봉랍과 스티커를 엽서에 붙여 ID로 연결된 친구에게 보낼 수 있어요. 글은 보낼 수 없어서 부담 없어요." },
      { title: "오늘의 퍼즐", body: "정해진 횟수 안에 주문을 채우는 하루 한 판 머지 퍼즐. 에너지를 쓰지 않아요." },
      { title: "매달 바뀌는 뽑기", body: "하루 1회 무료. 릴리의 의상과 스티커가 매달 바뀌어요. 확률은 뽑기 화면에 나와 있어요." },
    ],
    priceHeading: ["무료로,", "이야기는 끝까지."],
    price: [
      "다운로드는 무료예요. 앱에서 보석, 첫 선물, 매일 뽑기권을 살 수 있어요. 결제하면 기다리는 시간이 짧아지거나 꾸미기 아이템이 늘어나지만, 결제하지 않아도 이야기를 끝까지 즐길 수 있어요.",
      "뽑기에서 나오는 아이템과 확률은 뽑기 전에 뽑기 화면에서 확인할 수 있어요.",
      "로그인이나 이메일 등록은 없어요. 진행 상황은 기기 안에만 저장돼요. 친구 기능을 쓸 때만 ID, 이름, 보낸 작품을 전달하기 위해 서버에 둬요(설정에서 언제든 삭제할 수 있어요).",
    ],
    privacyLink: ["자세한 내용은", "개인정보 처리방침", "을 확인해 주세요."],
    legal: { privacy: "개인정보 처리방침", terms: "이용약관", contactLabel: "문의 창구", appName: "Sealcraft", updated: "최종 업데이트" },
  },
};
