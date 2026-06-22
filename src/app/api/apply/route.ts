import { Resend } from "resend";

// 応募の届け先（2名へ送信）
const RECIPIENTS = [
  "koki.takahashi@baulife.world",
  "asuka.takahashi@baulife.world",
];

// 差出人。baulife.world をResendで認証後はこのアドレスから届く。
// 認証前に試す場合は Vercel の環境変数 RESEND_FROM を一時的に上書きしてもよい。
const FROM = process.env.RESEND_FROM || "HOMU採用 <recruit@baulife.world>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ApplyBody = {
  position?: string;
  name?: string;
  contact?: string;
  stationery?: string;
  character?: string;
  snsExperience?: string;
  snsUrl?: string;
  reason?: string;
  commission?: string;
  availability?: string;
  company?: string; // honeypot（人間は空のまま）
};

export async function POST(request: Request) {
  let body: ApplyBody;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "リクエストの形式が正しくありません。" },
      { status: 400 }
    );
  }

  // ハニーポット：ボットが埋めたら成功を装って黙って破棄
  if (body.company && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const position = (body.position || "").trim();
  const name = (body.name || "").trim();
  const contact = (body.contact || "").trim();
  const stationery = (body.stationery || "").trim();
  const character = (body.character || "").trim();
  const snsExperience = (body.snsExperience || "").trim();
  const snsUrl = (body.snsUrl || "").trim();
  const reason = (body.reason || "").trim();
  const commission = (body.commission || "").trim();
  const availability = (body.availability || "").trim();

  // 必須項目の検証
  const missing: string[] = [];
  if (!name) missing.push("お名前");
  if (!contact) missing.push("連絡先");
  if (!stationery) missing.push("シーリング・文具への関心");
  if (!character) missing.push("SNS発キャラクターへの詳しさ");
  if (!snsExperience) missing.push("SNS運用・発信の経験");
  if (!reason) missing.push("志望理由");
  if (!commission) missing.push("成果報酬の確認");
  if (!availability) missing.push("月の稼働量");

  if (missing.length > 0) {
    return Response.json(
      { ok: false, error: `未入力の項目があります：${missing.join("、")}` },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY が未設定です。");
    return Response.json(
      {
        ok: false,
        error:
          "送信設定が未完了のため受け付けできませんでした。お手数ですがDMでご連絡ください。",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const lines = [
    `HOMU 採用に新しい応募が届きました。`,
    `応募職種: ${position || "（未指定）"}`,
    "",
    `■ お名前 / 連絡先\n${name}\n${contact}`,
    "",
    `■ シーリングスタンプ・文具への関わり\n${stationery}`,
    "",
    `■ SNS発キャラクターへの詳しさ\n${character}`,
    "",
    `■ SNSの運用・発信の経験\n${snsExperience}${
      snsUrl ? `\nアカウント: ${snsUrl}` : ""
    }`,
    "",
    `■ 志望理由\n${reason}`,
    "",
    `■ 成果報酬（固定給なし）で問題ないか\n${commission}`,
    "",
    `■ 月にどれくらい動けそうか\n${availability}`,
  ];

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENTS,
      // 連絡先がメールアドレスなら、受信メールに返信＝応募者へ直接届く
      replyTo: EMAIL_RE.test(contact) ? contact : undefined,
      subject: position
        ? `【HOMU採用応募】${position} / ${name} さん`
        : `【HOMU採用応募】${name} さん`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend送信エラー:", error);
      return Response.json(
        {
          ok: false,
          error:
            "送信中にエラーが発生しました。時間をおいて再度お試しいただくか、DMでご連絡ください。",
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("送信処理で例外:", err);
    return Response.json(
      {
        ok: false,
        error:
          "送信中にエラーが発生しました。時間をおいて再度お試しいただくか、DMでご連絡ください。",
      },
      { status: 500 }
    );
  }
}
