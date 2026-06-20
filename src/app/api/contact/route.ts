import { Resend } from "resend";

// お問い合わせの届け先（2名へ送信）
const RECIPIENTS = [
  "koki.takahashi@baulife.world",
  "asuka.takahashi@baulife.world",
];

const FROM = process.env.RESEND_FROM || "BAULIFE お問い合わせ <recruit@baulife.world>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot（人間は空のまま）
};

export async function POST(request: Request) {
  let body: ContactBody;
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

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  const missing: string[] = [];
  if (!name) missing.push("お名前");
  if (!email) missing.push("メールアドレス");
  if (!message) missing.push("お問い合わせ内容");

  if (missing.length > 0) {
    return Response.json(
      { ok: false, error: `未入力の項目があります：${missing.join("、")}` },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "メールアドレスの形式が正しくありません。" },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY が未設定です。");
    return Response.json(
      {
        ok: false,
        error:
          "送信設定が未完了のため受け付けできませんでした。お手数ですが koki.takahashi@baulife.world までご連絡ください。",
      },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const lines = [
    "BAULIFE公式サイトのお問い合わせフォームから新しいメッセージが届きました。",
    "",
    `■ お名前\n${name}`,
    "",
    `■ メールアドレス\n${email}`,
    "",
    `■ お問い合わせ内容\n${message}`,
  ];

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENTS,
      replyTo: email,
      subject: `【BAULIFEお問い合わせ】${name} さん`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend送信エラー:", error);
      return Response.json(
        {
          ok: false,
          error:
            "送信中にエラーが発生しました。時間をおいて再度お試しいただくか、メールでご連絡ください。",
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
          "送信中にエラーが発生しました。時間をおいて再度お試しいただくか、メールでご連絡ください。",
      },
      { status: 500 }
    );
  }
}
