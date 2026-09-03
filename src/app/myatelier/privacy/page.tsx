export const metadata = {
  title: "プライバシーポリシー — MyAtelier",
};

/// ⚠️ **正本は アプリ側の docs/privacy.md**。片方だけ直すと必ずずれる。
///    文面を変えるときは両方を同じ内容にすること。
export default function MyAtelierPrivacy() {
  return (
    <main className="max-w-[720px] mx-auto px-6 py-14 pb-24">
      <h1 className="text-[28px] font-bold mb-2">プライバシーポリシー</h1>
      <p className="text-sm text-[#8B8B95] mb-10">
        MyAtelier（マイアトリエ）／ 最終更新日: 2026年9月3日
      </p>

      <div className="space-y-5 text-[15px] text-[#B8B8C2] leading-[1.95] [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:text-[#EDEDF2] [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-[15px] [&_h3]:font-bold [&_h3]:text-[#EDEDF2] [&_h3]:mt-7 [&_h3]:mb-2 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_strong]:text-[#EDEDF2] [&_strong]:font-bold">
        <p>
          MyAtelier は、あなたの写真を塗り絵に変換し、塗って楽しむためのアプリです。
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
            <strong>アプリを削除すると、これらはすべて消えます</strong>（私たちの手元には何も残りません）
          </li>
        </ul>

        <h3>写真アプリへの保存</h3>
        <p>
          塗った過程のタイムラプス動画を保存するとき、あなたの写真アプリへの書き込み許可を求めます。
          <strong>あなたが「保存」を押したときだけ</strong>書き込みます。読み取りはしません。
        </p>

        <h2>2. 端末の中に保存している情報</h2>
        <p>アプリの動作に必要な設定を、端末の中だけに保存しています。</p>
        <ul>
          <li>表示名 — マイページに出すため</li>
          <li>プロフィール画像 — 同上</li>
          <li>オンボーディングを終えたか — 2回目以降に出さないため</li>
          <li>最初の質問の答え — 説明の文言を合わせるため</li>
          <li>道具の配置（横向きの左右など） — 前回の設定を覚えるため</li>
          <li>変換した回数 — 内部の集計用</li>
        </ul>
        <p>
          <strong>いずれも私たちのサーバーへは送信されません。</strong>
          アプリを削除すると消えます。
        </p>

        <h2>3. 通信について</h2>
        <p>
          このアプリが外部と通信するのは、<strong>Apple の App Store とのやりとりだけ</strong>です。
        </p>
        <ul>
          <li>会員登録（サブスクリプション）の購入・確認は、Apple の仕組み（StoreKit）が行います</li>
          <li>
            クレジットカード番号などの決済情報を、<strong>私たちが受け取ることはありません</strong>。すべて Apple が扱います
          </li>
          <li>私たちが受け取るのは「会員かどうか」という情報だけです</li>
        </ul>
        <p>
          <strong>アクセス解析ツールは入っていません。</strong>
          どの画面を何回見たか、といった情報は取得していません。
        </p>

        <h2>4. 第三者への提供</h2>
        <p>
          <strong>ありません。</strong>提供する情報自体を持っていません。
        </p>

        <h2>5. お子様の利用について</h2>
        <p>
          本アプリは、13歳未満の方から個人情報を意図的に収集することはありません。そもそも個人情報を収集していません。
        </p>

        <h2>6. 今後の変更について</h2>
        <p>以下の機能を追加する際には、このポリシーを更新し、アプリ内でお知らせします。</p>
        <ul>
          <li>
            <strong>広告の表示</strong> — 広告配信事業者が、広告の最適化のために端末の識別子を利用する場合があります。その際は、iOS の「トラッキングの許可」ダイアログであなたに確認します
          </li>
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
          <a href="mailto:koki.takahashi@baulife.world" className="text-[#EC4899] hover:underline">
            koki.takahashi@baulife.world
          </a>
        </p>
      </div>
    </main>
  );
}
