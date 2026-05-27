import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー — BAULIFE",
};

export default function Privacy() {
  return (
    <>
      <header className="px-6 py-4 border-b border-[#eee] bg-white/90 backdrop-blur-xl">
        <Link
          href="/"
          className="text-lg font-bold tracking-[3px] text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-en)" }}
        >
          BAULIFE
        </Link>
      </header>
      <div className="max-w-[720px] mx-auto px-6 py-12 pb-20">
        <h1 className="text-[28px] font-bold mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-[#999] mb-10">最終更新日: 2026年3月4日</p>

        <div className="space-y-8 text-[15px] text-[#444] leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#1a1a1a] [&_h2]:mt-9 [&_h2]:mb-3 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_strong]:text-[#333]">
          <p>
            本プライバシーポリシーは、株式会社BAULIFE（以下「当社」）が提供するすべてのサービス（Shopifyアプリケーション、ウェブサイト、D2Cブランドを含む、以下総称して「本サービス」）における情報の収集、使用、保護について説明するものです。
          </p>

          <h2>1. 収集する情報</h2>
          <p>収集する情報の種類は、ご利用いただくサービスによって異なります。</p>
          <ul>
            <li><strong>アカウントおよびストア情報：</strong>マーチャントが当社のShopifyアプリをインストールした際、アプリの機能提供に必要な範囲で、Shopify APIを通じてストア関連データ（ショップ名、ドメイン、メールアドレス等）にアクセスします。</li>
            <li><strong>商品および注文情報：</strong>アプリの機能を運用するために必要な範囲で、商品詳細や注文データにアクセスする場合があります。</li>
            <li><strong>顧客情報：</strong>アプリの機能（購入履歴、ユーザー生成コンテンツの表示等）に関連して、顧客IDや関連データを処理する場合があります。</li>
            <li><strong>ウェブサイト利用データ：</strong>当社ウェブサイトにアクセスされた際、標準的なサーバーログにIPアドレス、ブラウザの種類、閲覧ページが記録される場合があります。</li>
          </ul>

          <h2>2. 情報の利用目的</h2>
          <p>収集した情報は以下の目的で利用します。</p>
          <ul>
            <li>本サービスの提供、運営、改善</li>
            <li>取引の処理およびアプリ機能の管理</li>
            <li>マーチャントへのアカウントまたはサービスに関する連絡</li>
            <li>本サービスのセキュリティおよび完全性の確保</li>
            <li>法的義務の遵守</li>
          </ul>

          <h2>3. データの保管とセキュリティ</h2>
          <p>データは安全なサードパーティのホスティングインフラストラクチャに保管されます。すべてのデータはHTTPSを介して送信されます。不正アクセス、改ざん、破壊からデータを保護するため、合理的な技術的・組織的措置を講じています。</p>

          <h2>4. データの共有</h2>
          <p>以下の場合を除き、個人データを第三者に販売、貸与、共有することはありません。</p>
          <ul>
            <li>本サービスの運営に必要な範囲でのインフラおよびサービスプロバイダーとの共有</li>
            <li>法律により要求される場合、または法的義務を遵守するための場合</li>
          </ul>

          <h2>5. データの保持</h2>
          <p>本サービスの提供に必要な期間、データを保持します。マーチャントが当社アプリをアンインストールした場合、法律で保持が義務付けられている場合を除き、合理的な期間内に関連データを削除します。</p>

          <h2>6. Shopify必須ウェブフック</h2>
          <p>当社のShopifyアプリケーションについては、Shopifyの必須プライバシーウェブフックに準拠しています。</p>
          <ul>
            <li><strong>顧客データリクエスト：</strong>リクエストに応じて、特定の顧客に関するすべての保存データを提供します。</li>
            <li><strong>顧客データ消去：</strong>リクエストに応じて、特定の顧客に関するすべての保存データを削除します。</li>
            <li><strong>ショップデータ消去：</strong>マーチャントがアプリをアンインストールした際、すべての保存データを削除します。</li>
          </ul>

          <h2>7. お客様の権利</h2>
          <p>お客様は、いつでもご自身の個人データへのアクセス、訂正、削除を要求する権利を有します。マーチャントの方は当社に直接ご連絡ください。エンドカスタマーの方は、当社または当該マーチャントを通じてお問い合わせいただけます。</p>

          <h2>8. ポリシーの変更</h2>
          <p>本プライバシーポリシーは随時更新される場合があります。重要な変更がある場合は、本サービスまたはメールを通じて該当するユーザーに通知します。</p>

          <h2>9. お問い合わせ</h2>
          <p>本プライバシーポリシーに関するご質問は、以下までお問い合わせください。</p>
          <p><strong>株式会社BAULIFE</strong><br />メール: <a href="mailto:koki.takahashi@baulife.world" className="text-[#e85d75]">koki.takahashi@baulife.world</a></p>
        </div>
      </div>
      <footer className="py-8 px-6 text-center border-t border-[#eee] text-[13px] text-[#aaa]">
        &copy; 2026 BAULIFE Inc. All rights reserved.
      </footer>
    </>
  );
}
