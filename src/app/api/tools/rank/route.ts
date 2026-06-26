import { NextResponse } from "next/server";
import {
  getAccessToken,
  getSessionUser,
  loadRankLog,
  appendRankEntry,
  deleteRankEntry,
} from "@/lib/tools-drive";

// 売上ランク表の記録タイムライン（チーム共有・共有ドライブの単一ファイル）。

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

// 記録を1件追加（投稿者はサーバ側でセッションから刻む）
export async function POST(req: Request) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const user = await getSessionUser();
    const b = await req.json();
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: Date.now(),
      author: user.name || (user.email ? user.email.split("@")[0] : "メンバー"),
      authorEmail: user.email || null,
      date: String(b.date || "").slice(0, 10),
      rank: String(b.rank || ""),
      tier: String(b.tier || ""),
      color: String(b.color || ""),
      amount: String(b.amount || ""),
      next: String(b.next || ""),
      memo: String(b.memo || "").slice(0, 2000),
    };
    const { entries } = await appendRankEntry(token, entry);
    return NextResponse.json({ entries });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}

// 記録を1件削除（?id=...、投稿者本人のみ）
export async function DELETE(req: Request) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const user = await getSessionUser();
    const id = new URL(req.url).searchParams.get("id") || "";
    const { entries } = await deleteRankEntry(token, id, user.email);
    return NextResponse.json({ entries });
  } catch (e: any) {
    if (e?.code === "FORBIDDEN") {
      return NextResponse.json({ error: "自分の記録のみ削除できます。" }, { status: 403 });
    }
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
