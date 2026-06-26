import { NextResponse } from "next/server";
import { getAccessToken, loadRankLog, saveRankLog } from "@/lib/tools-drive";

// 売上ランク表の記録タイムライン。ログイン中ユーザー自身の Google ドライブに保存。

// 記録の読み込み
export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { entries } = await loadRankLog(token);
    return NextResponse.json({ entries });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}

// 記録の保存（全件を上書き）
export async function PUT(req: Request) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { entries } = await req.json();
    const r = await saveRankLog(token, Array.isArray(entries) ? entries : []);
    return NextResponse.json({ ok: true, modifiedTime: r.modifiedTime });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
