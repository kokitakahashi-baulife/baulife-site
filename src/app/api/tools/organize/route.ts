import { NextResponse } from "next/server";
import { getAccessToken, getSessionUser, organizeDrive } from "@/lib/tools-drive";

// ドライブ整理（社内ポータル構成へ移行）。管理者のみ。
// GET=ドライ実行（確認のみ）、POST=本実行。移動のみ・削除なし・冪等。

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "koki.takahashi@baulife.world")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

async function guard() {
  const token = await getAccessToken();
  if (!token) return { res: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  const user = await getSessionUser();
  if (!user.email || !ADMIN_EMAILS.includes(user.email.toLowerCase())) {
    return { res: NextResponse.json({ error: "forbidden（管理者のみ実行できます）" }, { status: 403 }) };
  }
  return { token };
}

export async function GET() {
  const g = await guard();
  if (g.res) return g.res;
  try {
    return NextResponse.json(await organizeDrive(g.token!, true));
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}

export async function POST() {
  const g = await guard();
  if (g.res) return g.res;
  try {
    return NextResponse.json(await organizeDrive(g.token!, false));
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
