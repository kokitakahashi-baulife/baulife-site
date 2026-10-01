/// Sealcraft のプライバシーポリシーと利用規約の文面(4言語)。
///
/// ⚠️ **正本はアプリ側の `ios/Sealcraft/Content/legal.json`**(アプリの設定画面に出す文と同じ)。
///    訳はアプリの `Content/i18n_<言語>.json` から作る。片方だけ直すと必ずずれる。
///    段落は「■ 見出し\n本文」の形。
import type { Lang } from "./copy";

export const CONTACT_URL = "https://homu.baulife.world/pages/contact";

export type LegalText = { operator: string; updated: string; privacy: string[]; terms: string[] };

export const LEGAL: Record<Lang, LegalText> = {
  "ja": {
    "operator": "株式会社BAULIFE（HOMU）",
    "updated": "2026年10月1日",
    "privacy": [
      "Sealcraft（以下「本アプリ」）は、株式会社BAULIFE（以下「当社」）が提供するゲームです。本アプリでの情報の扱いを以下のとおり定めます。",
      "■ 集める情報\n本アプリは、氏名・メールアドレス・住所・電話番号・位置情報など、あなたを直接特定する情報を集めません。ログインや、メールアドレスでの登録もありません。",
      "■ 端末の中だけに保存する情報\nゲームの進み具合（盤面・コイン・物語・コレクション・ポストカード・設定）は、お使いの端末の中にだけ保存します。当社のサーバーには送りません。アプリを削除すると消えます。",
      "■ フレンド機能で当社のサーバーに置く情報\nフレンド機能を使う（名前を決めてIDをつくる）と、次の情報を当社のサーバーに置きます。\n・ユーザーID（自動でつくる8文字の番号）と、本人の確認に使う合言葉（元に戻せない形に変えて保存）\n・フレンドに見える名前と、着ているリリの衣装\n・フレンドと申請、ブロックの一覧\n・フレンドに送ったポストカード（相手が受け取るとサーバーから消えます。受け取られなくても30日で消えます）\n・通報の内容\n・IDをつくったときの接続元の IP アドレス（短い時間の回数の制限のためだけに、元に戻せない形に変えて1時間まで保存）\nこれらは、フレンド機能を動かすためと、不正や迷惑な行為を防ぐためだけに使います。広告や、ほかの目的には使いません。サーバーは Cloudflare, Inc. のサービスを使っています。",
      "■ フレンドのデータを消す\n設定の「フレンドのデータを消す」で、サーバーにあるあなたの情報（ユーザーID・名前・フレンドの一覧・まだ届いていない作品）をいつでもすべて消せます。通報の記録は、迷惑な行為を防ぐため、あなたとのつながりを消したうえで残ることがあります。",
      "■ 購入\nアプリ内の購入は Apple の App Store を通して行われます。お支払いの情報は Apple が扱い、当社は受け取りません。当社が受け取るのは、購入が完了したという確認だけです。",
      "■ 追加の内容の受け取り\n毎月の「今月のガチャ」などの追加の内容を受け取るため、本アプリは当社が用意した配信先から、データと画像を読み込むことがあります。このとき、あなたを特定する情報は送りません（通信の仕組み上、配信先のサーバーには接続元の IP アドレスが一時的に記録されることがあります）。",
      "■ 画像を保存する\nポストカードを画像にして写真に保存するのは、あなたが選んだときだけです。保存した画像をほかのアプリやサービスに載せたときの扱いは、それぞれの決まりに従います。フレンドに送ったポストカードは、そのフレンドにだけ届きます（ポストカードに貼った写真は送られません）。",
      "■ 広告・解析\n本アプリは、広告や、利用の様子を外部に送る解析の仕組みを使っていません。",
      "■ お子さまの利用\n本アプリは、お子さまを直接特定する情報を集めません。フレンド機能と、アプリ内の購入は、保護者の方の同意のうえでお使いください。",
      "■ 変更\nこの内容を変えるときは、本アプリの中でお知らせします。",
      "■ お問い合わせ\n下のお問い合わせ窓口からご連絡ください。"
    ],
    "terms": [
      "この利用規約（以下「本規約」）は、株式会社BAULIFE（以下「当社」）が提供する Sealcraft（以下「本アプリ」）の利用の条件です。本アプリを使うと、本規約に同意したものとします。",
      "■ アプリ内の品\n宝石・ガチャ券・コイン・ガチャから出た品などは、本アプリの中だけで使えるものです。現金や、ほかのサービスの品、HOMU の商品と交換することはできません。ほかの人に譲ることもできません。",
      "■ 購入\n宝石・はじめての贈り物・毎日のガチャ券の購入は、Apple の App Store を通して行います。宝石に有効期限はありません。法律で定められた場合を除き、購入後の払い戻しはできません。未成年の方は、保護者の方の同意を得てから購入してください。",
      "■ 毎日のガチャ券\n毎日のガチャ券は、一度買うと、毎日もらえるガチャ券がずっと1枚ふえます。設定の「購入の復元」で、同じ Apple ID の端末に戻せます。",
      "■ ガチャ\nガチャから出る品と、その確率は、引く前にガチャの画面の「当たるものと確率」で確認できます。ガチャの中身は毎月1日に替わります。",
      "■ 保存データ\n進み具合は端末の中にだけ保存されます。アプリの削除、端末の故障や買い替えなどで消えた進み具合と、アプリ内の品は、元に戻せません。",
      "■ フレンド機能\nフレンドに見える名前と、フレンドに送るポストカードは、ほかの人がいやな思いをしないものにしてください。ふさわしくない内容・いやがらせは一切認めません。連絡先（電話番号・メールアドレス・ほかのサービスの ID など）を名前や作品に入れることはできません。いやな思いをしたときは、ブロックと通報ができます。通報は24時間以内に確認し、当社が決まりに反すると判断した場合、その内容を取り除き、予告なくフレンド機能の利用を止めます。",
      "■ 禁止すること\n本アプリの改ざん、不正な手段での品の入手、ほかの人へのいやがらせ・なりすまし・勧誘、ほかの人の迷惑になる使い方をしないでください。",
      "■ 変更・終了\n当社は、本アプリの内容を変えたり、提供を終えたりすることがあります。提供を終えるときは、前もって本アプリの中でお知らせします。",
      "■ 責任\n当社は、本アプリが正しく動くよう努めますが、不具合がないことまでは約束できません。当社に故意または重大な過失がある場合を除き、本アプリの利用で生じた損害について責任を負いません。",
      "■ スタンプヘッドの図柄\n本アプリに出てくるスタンプヘッドの図柄は、HOMU の商品のデザインです。無断で複製して使うことはできません。",
      "■ お問い合わせ\n下のお問い合わせ窓口からご連絡ください。"
    ]
  },
  "en": {
    "operator": "BAULIFE Inc. (HOMU)",
    "updated": "October 1, 2026",
    "privacy": [
      "Sealcraft (the \"App\") is a game provided by BAULIFE Inc. (the \"Company\"). This policy sets out how information is handled in the App.",
      "■ Information We Collect\nThe App does not collect information that directly identifies you, such as your name, email address, postal address, phone number, or location. There is no login and no registration by email address.",
      "■ Information Stored Only on Your Device\nYour game progress (board, coins, story, collections, postcards, and settings) is stored only on your device. It is not sent to the Company's servers. It is erased when you delete the App.",
      "■ Information Stored on the Company's Servers for the Friends Feature\nWhen you use the Friends feature (by choosing a name and creating an ID), the following information is stored on the Company's servers.\n・Your user ID (an 8-character code generated automatically) and a passphrase used to verify that it is you (stored in an irreversibly transformed form)\n・The name shown to your Friends, and the outfit Lili is wearing\n・Your lists of Friends, requests, and blocks\n・Postcards you send to Friends (deleted from the server once the recipient receives them; deleted after 30 days even if not received)\n・The content of reports\n・The IP address you connected from when creating your ID (stored in an irreversibly transformed form for up to one hour, solely to limit the number of attempts within a short period)\nThis information is used solely to operate the Friends feature and to prevent fraud and disruptive behavior. It is not used for advertising or any other purpose. Our servers use services provided by Cloudflare, Inc.",
      "■ Deleting Your Friends Data\nYou can delete all of your information on the server (user ID, name, Friends list, and works not yet delivered) at any time with \"Delete Friends Data\" in Settings. Records of reports may be retained, with their link to you removed, in order to prevent disruptive behavior.",
      "■ Purchases\nIn-app purchases are made through Apple's App Store. Your payment information is handled by Apple, and the Company does not receive it. The Company receives only confirmation that a purchase has been completed.",
      "■ Receiving Additional Content\nTo receive additional content such as the monthly \"This Month's Gacha,\" the App may load data and images from a distribution source prepared by the Company. No information that identifies you is sent at that time (due to how network communication works, the distribution server may temporarily record the IP address you connect from).",
      "■ Saving Images\nA postcard is turned into an image and saved to your Photos only when you choose to do so. If you post a saved image to another app or service, it is handled under that app's or service's own rules. Postcards sent to a Friend are delivered only to that Friend (photos placed on your postcards are not sent).",
      "■ Advertising and Analytics\nThe App does not use advertising, or any analytics mechanism that sends information about your usage to outside parties.",
      "■ Use by Children\nThe App does not collect information that directly identifies children. Please use the Friends feature and in-app purchases with the consent of a parent or guardian.",
      "■ Changes\nIf we change this policy, we will notify you within the App.",
      "■ Contact\nPlease contact us through the inquiry form below."
    ],
    "terms": [
      "These Terms of Use (the \"Terms\") set out the conditions for using Sealcraft (the \"App\"), provided by BAULIFE Inc. (the \"Company\"). By using the App, you are deemed to have agreed to these Terms.",
      "■ In-App Items\nGems, gacha tickets, coins, items obtained from the Gacha, and similar items can be used only within the App. They cannot be exchanged for cash, items from other services, or HOMU products. They also cannot be transferred to other people.",
      "■ Purchases\nPurchases of gems, the First Gift, and the Daily Gacha Ticket are made through Apple's App Store. Gems have no expiration date. Except where required by law, purchases are non-refundable. If you are a minor, please obtain the consent of a parent or guardian before making a purchase.",
      "■ Daily Gacha Ticket\nOnce purchased, the Daily Gacha Ticket permanently increases the number of gacha tickets you receive each day by one. You can restore it to devices using the same Apple ID with \"Restore Purchases\" in Settings.",
      "■ Gacha\nBefore drawing, you can check the items available from the Gacha and their probabilities under \"Prizes and Odds\" on the Gacha screen. The Gacha's contents change on the 1st of every month.",
      "■ Saved Data\nYour progress is saved only on your device. Progress and in-app items lost due to deleting the App, device failure, replacing your device, or similar causes cannot be restored.",
      "■ Friends feature\nKeep the name your friends see and the postcards you send to friends free of anything that could upset others. Objectionable content and harassment are not tolerated. You may not include contact information (phone numbers, email addresses, IDs for other services, etc.) in your name or works. If something upsets you, you can block and report. We review reports within 24 hours, and if we find a violation of these rules we will remove the content and may suspend the friends feature without notice.",
      "■ Prohibited Conduct\nDo not tamper with the App, obtain items by illegitimate means, harass, impersonate, or solicit other people, or use the App in any way that bothers others.",
      "■ Changes and Termination\nThe Company may change the contents of the App or end its provision. If we end the provision of the App, we will announce it within the App in advance.",
      "■ Liability\nThe Company strives to ensure the App works correctly, but cannot guarantee that it is free of defects. Except in cases of willful misconduct or gross negligence on the part of the Company, the Company shall not be liable for any damages arising from the use of the App.",
      "■ Stamp Head Designs\nThe stamp head designs that appear in the App are designs of HOMU products. They may not be copied or used without permission.",
      "■ Contact\nPlease contact us through the inquiry form below."
    ]
  },
  "zh-hant": {
    "operator": "株式會社BAULIFE（HOMU）",
    "updated": "2026年10月1日",
    "privacy": [
      "Sealcraft（以下稱「本應用程式」）是由株式會社BAULIFE（以下稱「本公司」）提供的遊戲。本公司就本應用程式中資訊的處理方式，訂定如下。",
      "■ 蒐集的資訊\n本應用程式不會蒐集姓名、電子郵件地址、住址、電話號碼、位置資訊等可直接識別您身分的資訊。本應用程式也沒有登入功能，亦無須以電子郵件地址註冊。",
      "■ 僅儲存於裝置內的資訊\n遊戲進度（盤面、金幣、故事、收藏、明信片、設定）僅儲存於您所使用的裝置內，不會傳送至本公司的伺服器。刪除本應用程式後，這些資料將會消失。",
      "■ 為好友功能而存放於本公司伺服器的資訊\n使用好友功能（決定名字並建立ID）時，下列資訊將存放於本公司的伺服器。\n・使用者ID（自動產生的8位字元編號），以及用於確認本人身分的通關密語（轉換為無法還原的形式後儲存）\n・好友可見的名稱，以及莉莉所穿的服裝\n・好友、申請及封鎖的清單\n・傳送給好友的明信片（對方收取後即從伺服器刪除；即使未被收取，也會在30天後刪除）\n・檢舉的內容\n・建立ID時連線來源的 IP 位址（僅為限制短時間內的操作次數，轉換為無法還原的形式後最多保存1小時）\n上述資訊僅用於運作好友功能，以及防止不當或擾人的行為，不會用於廣告或其他任何目的。伺服器使用 Cloudflare, Inc. 的服務。",
      "■ 刪除好友資料\n透過設定中的「刪除好友資料」，您可以隨時刪除伺服器上所有關於您的資訊（使用者ID、名稱、好友清單、尚未送達的作品）。為防止擾人的行為，檢舉紀錄可能會在切斷與您的關聯後予以保留。",
      "■ 購買\n應用程式內購買透過 Apple 的 App Store 進行。付款資訊由 Apple 處理，本公司不會取得。本公司僅會收到購買已完成的確認。",
      "■ 接收追加內容\n為接收每月的「本月扭蛋」等追加內容，本應用程式可能會從本公司準備的發布來源讀取資料與圖片。此時不會傳送可識別您身分的資訊（基於通訊機制，發布來源的伺服器可能會暫時記錄連線來源的 IP 位址）。",
      "■ 儲存圖片\n只有在您選擇時，才會將明信片轉為圖片並儲存到照片。將儲存的圖片發布到其他應用程式或服務時，依各自的規定處理。傳送給好友的明信片，只會送達該位好友（貼在明信片上的照片不會傳送）。",
      "■ 廣告與分析\n本應用程式未使用廣告，也未使用將使用狀況傳送至外部的分析機制。",
      "■ 兒童的使用\n本應用程式不會蒐集可直接識別兒童身分的資訊。好友功能與應用程式內購買，請在取得監護人同意後使用。",
      "■ 變更\n變更本內容時，將於本應用程式內公告。",
      "■ 聯絡我們\n請透過下方的聯絡窗口與我們聯繫。"
    ],
    "terms": [
      "本使用條款（以下稱「本條款」）為使用株式會社BAULIFE（以下稱「本公司」）所提供之 Sealcraft（以下稱「本應用程式」）的條件。使用本應用程式，即視為您已同意本條款。",
      "■ 應用程式內物品\n寶石、扭蛋券、金幣、從扭蛋獲得的物品等，僅能在本應用程式內使用，無法兌換為現金、其他服務的物品或 HOMU 的商品，也無法轉讓給他人。",
      "■ 購買\n寶石、首次禮物、每日扭蛋券的購買，透過 Apple 的 App Store 進行。寶石沒有使用期限。除法律另有規定外，購買後恕不退款。未成年人請於取得監護人同意後再行購買。",
      "■ 每日扭蛋券\n每日扭蛋券一經購買，每天可獲得的扭蛋券將永久增加1張。可透過設定中的「恢復購買」，恢復至使用相同 Apple ID 的裝置。",
      "■ 扭蛋\n扭蛋可獲得的物品及其機率，可於抽取前在扭蛋畫面的「獎品與機率」中確認。扭蛋的內容於每月1日更換。",
      "■ 儲存資料\n遊戲進度僅儲存於裝置內。因刪除應用程式、裝置故障或更換裝置等原因而遺失的進度及應用程式內物品，將無法復原。",
      "■ 好友功能\n好友看到的名稱與寄給好友的明信片，請不要包含會讓他人感到不舒服的內容。本公司絕不容許不當內容與騷擾行為。名稱與作品中不得包含聯絡方式（電話號碼、電子郵件地址、其他服務的ID等）。感到不舒服時，可以封鎖與檢舉。本公司會在24小時內確認檢舉，若判斷違反規定，將移除該內容，並可能不經通知停止其使用好友功能。",
      "■ 禁止事項\n請勿竄改本應用程式、以不正當手段取得物品、對他人進行騷擾、冒充他人或招攬他人，或以造成他人困擾的方式使用。",
      "■ 變更與終止\n本公司得變更本應用程式的內容，或終止提供。終止提供時，將事先於本應用程式內公告。",
      "■ 責任\n本公司將努力使本應用程式正常運作，但無法保證完全沒有瑕疵。除本公司有故意或重大過失之情形外，對於因使用本應用程式所產生的損害，本公司不負任何責任。",
      "■ 印章頭圖案\n本應用程式中出現的印章頭圖案，為 HOMU 商品的設計。未經許可，不得複製使用。",
      "■ 聯絡我們\n請透過下方的聯絡窗口與我們聯繫。"
    ]
  },
  "ko": {
    "operator": "주식회사 BAULIFE(HOMU)",
    "updated": "2026년 10월 1일",
    "privacy": [
      "Sealcraft(이하 '본 앱')는 주식회사 BAULIFE(이하 '당사')가 제공하는 게임입니다. 본 앱에서의 정보 취급에 관하여 다음과 같이 정합니다.",
      "■ 수집하는 정보\n본 앱은 이름, 이메일 주소, 주소, 전화번호, 위치 정보 등 귀하를 직접 식별할 수 있는 정보를 수집하지 않습니다. 로그인이나 이메일 주소를 통한 가입도 없습니다.",
      "■ 기기에만 저장되는 정보\n게임 진행 상황(보드, 코인, 스토리, 컬렉션, 엽서, 설정)은 사용 중인 기기에만 저장됩니다. 당사의 서버로는 전송하지 않습니다. 앱을 삭제하면 사라집니다.",
      "■ 친구 기능을 위해 당사 서버에 보관하는 정보\n친구 기능을 사용하면(이름을 정해 ID를 만들면) 다음 정보를 당사 서버에 보관합니다.\n・사용자 ID(자동으로 생성되는 8자리 번호)와 본인 확인에 사용하는 암호(원래대로 되돌릴 수 없는 형태로 변환하여 저장)\n・친구에게 보이는 이름과 릴리가 입고 있는 의상\n・친구, 신청, 차단 목록\n・친구에게 보낸 엽서(상대가 받으면 서버에서 삭제됩니다. 받지 않더라도 30일 후 삭제됩니다)\n・신고 내용\n・ID를 만들 때 접속한 IP 주소(짧은 시간 내 횟수 제한만을 위해, 원래대로 되돌릴 수 없는 형태로 변환하여 최대 1시간 저장)\n이 정보는 친구 기능의 운영과 부정행위 및 민폐 행위 방지만을 위해 사용합니다. 광고나 그 밖의 목적으로는 사용하지 않습니다. 서버는 Cloudflare, Inc.의 서비스를 이용하고 있습니다.",
      "■ 친구 데이터 삭제\n설정의 '친구 데이터 삭제'로 서버에 있는 귀하의 정보(사용자 ID, 이름, 친구 목록, 아직 전달되지 않은 작품)를 언제든지 모두 삭제할 수 있습니다. 신고 기록은 민폐 행위를 방지하기 위해 귀하와의 연결을 삭제한 뒤 남을 수 있습니다.",
      "■ 구매\n앱 내 구매는 Apple의 App Store를 통해 이루어집니다. 결제 정보는 Apple이 취급하며, 당사는 받지 않습니다. 당사가 받는 것은 구매가 완료되었다는 확인뿐입니다.",
      "■ 추가 콘텐츠 수신\n매월 '이달의 뽑기' 등 추가 콘텐츠를 받기 위해, 본 앱은 당사가 준비한 배포처에서 데이터와 이미지를 불러올 수 있습니다. 이때 귀하를 식별하는 정보는 전송하지 않습니다(통신 구조상 배포처 서버에 접속한 IP 주소가 일시적으로 기록될 수 있습니다).",
      "■ 이미지 저장\n엽서를 이미지로 만들어 사진에 저장하는 것은 귀하가 선택한 경우에만 이루어집니다. 저장한 이미지를 다른 앱이나 서비스에 올린 경우의 취급은 각각의 규정을 따릅니다. 친구에게 보낸 엽서는 그 친구에게만 전달됩니다(엽서에 붙인 사진은 전송되지 않습니다).",
      "■ 광고 및 분석\n본 앱은 광고나, 이용 현황을 외부로 전송하는 분석 기능을 사용하지 않습니다.",
      "■ 아동의 이용\n본 앱은 아동을 직접 식별할 수 있는 정보를 수집하지 않습니다. 친구 기능과 앱 내 구매는 보호자의 동의를 받은 후 이용해 주십시오.",
      "■ 변경\n이 내용을 변경할 때에는 본 앱 내에서 알려 드립니다.",
      "■ 문의\n아래 문의 창구로 연락해 주십시오."
    ],
    "terms": [
      "이 이용약관(이하 '본 약관')은 주식회사 BAULIFE(이하 '당사')가 제공하는 Sealcraft(이하 '본 앱')의 이용 조건입니다. 본 앱을 이용하면 본 약관에 동의한 것으로 간주합니다.",
      "■ 앱 내 아이템\n보석, 뽑기권, 코인, 뽑기에서 얻은 아이템 등은 본 앱 안에서만 사용할 수 있습니다. 현금이나 다른 서비스의 아이템, HOMU 상품과 교환할 수 없습니다. 다른 사람에게 양도할 수도 없습니다.",
      "■ 구매\n보석, 첫 선물, 매일 뽑기권의 구매는 Apple의 App Store를 통해 이루어집니다. 보석에는 유효 기간이 없습니다. 법률로 정해진 경우를 제외하고, 구매 후에는 환불할 수 없습니다. 미성년자는 보호자의 동의를 얻은 후 구매해 주십시오.",
      "■ 매일 뽑기권\n매일 뽑기권은 한 번 구매하면 매일 받는 뽑기권이 영구적으로 1장 늘어납니다. 설정의 '구매 복원'으로 같은 Apple ID를 사용하는 기기에 복원할 수 있습니다.",
      "■ 뽑기\n뽑기에서 나오는 아이템과 그 확률은 뽑기 전에 뽑기 화면의 '당첨 아이템과 확률'에서 확인할 수 있습니다. 뽑기 내용은 매월 1일에 바뀝니다.",
      "■ 저장 데이터\n진행 상황은 기기에만 저장됩니다. 앱 삭제, 기기 고장이나 교체 등으로 사라진 진행 상황과 앱 내 아이템은 복구할 수 없습니다.",
      "■ 친구 기능\n친구에게 보이는 이름과 친구에게 보내는 엽서에는 다른 사람이 불쾌하게 느낄 내용을 넣지 말아 주세요. 부적절한 내용과 괴롭힘은 일절 허용하지 않아요. 이름과 작품에 연락처(전화번호, 이메일 주소, 다른 서비스의 ID 등)를 넣을 수 없어요. 불쾌한 일이 있으면 차단과 신고를 할 수 있어요. 신고는 24시간 이내에 확인하며, 당사가 규칙 위반으로 판단한 경우 해당 내용을 삭제하고 예고 없이 친구 기능 이용을 중지해요.",
      "■ 금지 사항\n본 앱의 변조, 부정한 수단을 통한 아이템 획득, 다른 사람에 대한 괴롭힘・사칭・권유, 다른 사람에게 폐가 되는 이용을 하지 말아 주십시오.",
      "■ 변경 및 종료\n당사는 본 앱의 내용을 변경하거나 제공을 종료할 수 있습니다. 제공을 종료할 때에는 사전에 본 앱 내에서 알려 드립니다.",
      "■ 책임\n당사는 본 앱이 올바르게 작동하도록 노력하지만, 결함이 없다는 것까지 보증할 수는 없습니다. 당사에 고의 또는 중대한 과실이 있는 경우를 제외하고, 본 앱의 이용으로 발생한 손해에 대하여 책임을 지지 않습니다.",
      "■ 스탬프 헤드 도안\n본 앱에 등장하는 스탬프 헤드 도안은 HOMU 상품의 디자인입니다. 무단으로 복제하여 사용할 수 없습니다.",
      "■ 문의\n아래 문의 창구로 연락해 주십시오."
    ]
  }
};
