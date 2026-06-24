import { NextResponse } from "next/server";
import { getAccessToken, readProject, saveProject, getMeta } from "@/lib/tools-drive";

// 1案件の読み込み（?meta=1 で更新時刻・更新者のみ取得＝競合検知用）
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const wantMeta = new URL(req.url).searchParams.get("meta");
  try {
    if (wantMeta) {
      const meta = await getMeta(token, id);
      return NextResponse.json({ meta });
    }
    const content = await readProject(token, id);
    return NextResponse.json({ content });
  } catch (e: any) {
    if (e?.code === "PARSE") {
      return NextResponse.json(
        { error: "このファイルは企画書の形式ではないため開けません。", code: "PARSE" },
        { status: 422 }
      );
    }
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}

// 自動保存（上書き）
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const { name, content, meta } = await req.json();
    const r = await saveProject(token, id, name || "無題_企画書", content ?? {}, meta ?? {});
    return NextResponse.json(r);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
