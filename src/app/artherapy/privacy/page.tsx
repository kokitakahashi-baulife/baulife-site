export const metadata = {
  title: "プライバシーポリシー — Artherapy",
};

/// ⚠️ **正本は アプリ側の docs/privacy.md**。片方だけ直すと必ずずれる。
///    文面を変えるときは両方を同じ内容にすること(2026-09-08: 広告・iCloud・お知らせを反映)。
export default function ArtherapyPrivacy() {
  return (
    <main className="max-w-[720px] mx-auto px-6 py-14 pb-24">
      <h1 className="text-[28px] font-bold mb-2">プライバシーポリシー</h1>
      <p className="text-sm text-[#8B8B95] mb-10">
        Artherapy（アーセラピー）／ 最終更新日: 2026年9月8日
      </p>

      <div className="space-y-5 text-[15px] text-[#B8B8C2] leading-[1.95] [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:text-[#EDEDF2] [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-[15px] [&_h3]:font-bold [&_h3]:text-[#EDEDF2] [&_h3]:mt-7 [&_h3]:mb-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_strong]:text-[#EDEDF2] [&_strong]:font-bold [&_a]:text-[#EC4899] [&_a]:hover:underline">
        <p>
          Artherapy は、あなたの写真を塗り絵に変換し、塗って楽しむためのアプリです。
        </p>
        <p>
          このアプリの設計方針は単純です。
          <strong>あなたの写真を、私たちのサーバーに送りません。</strong>
          変換も保存も、すべてあなたの iPhone / iPad の中だけで完結します。
        </p>
        <p>以下、実際にアプリが何をしているかを、そのまま書きます。</p>

        <h2>1. 写真について</h2>
        <p>
          <strong>送信しません。保存もしません（私たちの側には）。</strong>
        </p>
        <ul>
          <li>あなたが選んだ写真だけを読み込みます。写真ライブラリ全体を見ることはありません</li>
          <li>
            塗り絵への変換は、<strong>あなたの端末の中で計算しています</strong>。サーバーへ送っていません
          </li>
          <li>
            変換した画布と塗った記録は、<strong>アプリ専用の保存領域</strong>に置かれます。他のアプリからは読めません
          </li>
          <li>
            <strong>アプリを削除すると、これらはすべて消えます</strong>（私たちの手元には何も残りません。iCloud に写した分は下記 2 をご覧ください）
          </li>
        </ul>

        <h3>写真アプリへの保存</h3>
        <p>
          塗り上げた絵・タイムラプス動画・壁紙用の Live Photo を保存するとき、あなたの写真アプリへの<strong>書き込み（追加のみ）</strong>の許可を求めます。
          <strong>あなたが「保存」を押したときだけ</strong>書き込みます。写真アプリの中身を読み取ることはありません。
        </p>

        <h2>2. 端末の中に保存している情報</h2>
        <p>アプリの動作に必要な情報を、端末の中に保存しています。</p>
        <ul>
          <li>作った画布・白紙のキャンバスと塗った記録 — 続きから塗るため</li>
          <li>塗り上げた絵の見本画像・作った動画 — 一覧に出す・すぐ再生するため</li>
          <li>実績（塗ったマス・連続日数・バッジなど） — マイページに出すため</li>
          <li>オンボーディングを終えたか — 2回目以降に出さないため</li>
          <li>最初の質問の答え — 説明の文言を合わせるため</li>
          <li>道具の配置（横向きの左右など）・お知らせの設定 — 前回の設定を覚えるため</li>
          <li>変換した回数・広告を出した回数・レビュー依頼を出した日 — 内部の集計用</li>
        </ul>
        <p>
          <strong>いずれも私たちのサーバーへは送信されません。</strong>
        </p>

        <h3>iCloud について</h3>
        <p>
          iCloud にサインインしている端末では、作った画布・塗った記録・実績を<strong>あなたの iCloud</strong>に写します。
          同じ Apple ID の iPhone・iPad で続きが塗れ、アプリを入れ直したり機種を変えたりしても戻ってきます。
        </p>
        <ul>
          <li>写す先は Apple が提供する、あなた自身の iCloud の保存領域です。<strong>私たちがその中身を見ることはできません</strong></li>
          <li>iCloud を使っていない、または容量が足りない場合は、端末の中だけに保存されます（動作は変わりません）</li>
          <li>iCloud に写した分は、iPhone の「設定 &gt; Apple ID &gt; iCloud」から消せます。アプリを削除しただけでは iCloud 側は残ります</li>
        </ul>

        <h3>お知らせ（通知）</h3>
        <p>
          「塗りかけの絵の呼び戻し」と「新しい線画の追加」のお知らせは、<strong>端末の中で予約するローカル通知</strong>です。
          通知のためにサーバーへ何かを送ることはありません。設定でいつでも切れます。
        </p>

        <h2>3. 通信について</h2>
        <p>このアプリが外部と通信するのは、次の 2 つです。</p>

        <h3>Apple の App Store</h3>
        <ul>
          <li>有料プラン（サブスクリプション）の購入・確認は、Apple の仕組み（StoreKit）が行います</li>
          <li>
            クレジットカード番号などの決済情報を、<strong>私たちが受け取ることはありません</strong>。すべて Apple が扱います
          </li>
          <li>私たちが受け取るのは「有料プランかどうか」という情報だけです</li>
        </ul>

        <h3>広告（Google AdMob）</h3>
        <p>
          無料でお使いの場合、画面に広告が表示されます。広告の配信には Google の
          <strong>Google Mobile Ads SDK（AdMob）</strong>を使っています。
        </p>
        <ul>
          <li>
            広告を表示するために、Google が端末の識別子（広告識別子など）・端末の種類や OS のバージョン・IP アドレス（おおよその地域の推定に使われます）・広告を表示した／タップしたという情報・広告 SDK の動作記録（クラッシュや動作速度などの診断データ）を受け取ります。
            <strong>あなたの写真や塗った絵が広告のために送られることはありません</strong>
          </li>
          <li>
            広告識別子を使ったトラッキングは、iOS の「トラッキングの許可」ダイアログであなたに確認します。
            <strong>許可しなくても、機能はすべてそのまま使えます</strong>（広告の内容があなた向けに最適化されなくなるだけです）
          </li>
          <li>広告のパーソナライズは iPhone の「設定 &gt; プライバシーとセキュリティ &gt; トラッキング」および「Apple 広告」からいつでも変えられます</li>
          <li>
            Google がどのように情報を扱うかは、
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google のプライバシーポリシー</a>
            および
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">広告に関するページ</a>
            をご覧ください
          </li>
          <li>
            <strong>有料プランでは広告を表示せず、広告 SDK が通信することもありません</strong>
          </li>
        </ul>
        <p>
          <strong>アクセス解析ツールやクラッシュ収集ツールは入っていません。</strong>
          どの画面を何回見たか、といった情報は取得していません。
        </p>

        <h2>4. 第三者への提供</h2>
        <p>
          上記 3 の広告配信のために Google が受け取る情報を除き、<strong>第三者への提供はありません。</strong>
          提供する個人情報自体を持っていません。
        </p>

        <h2>5. お子様の利用について</h2>
        <p>
          本アプリは、13歳未満の方から個人情報を意図的に収集することはありません。広告は一般向けの設定で配信しています。
        </p>

        <h2>6. 今後の変更について</h2>
        <p>以下の機能を追加する際には、このポリシーを更新し、アプリ内でお知らせします。</p>
        <ul>
          <li>
            <strong>コミュニティ機能</strong> — 作品を公開する機能を追加する場合、公開した作品と表示名は他の利用者に見えるようになります。公開するかどうかは、あなたが選べます
          </li>
        </ul>
        <p>
          <strong>追加する前に、必ずこのページを更新します。</strong>
        </p>

        <h2>7. お問い合わせ</h2>
        <p>ご不明な点は、以下までご連絡ください。</p>
        <p>
          <strong>株式会社BAULIFE</strong>
          <br />
          メール:{" "}
          <a href="mailto:koki.takahashi@baulife.world">koki.takahashi@baulife.world</a>
        </p>
      </div>
    </main>
  );
}
