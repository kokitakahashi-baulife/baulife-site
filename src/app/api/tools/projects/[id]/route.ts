import { NextResponse } from "next/server";
import { getAccessToken, readProject, saveProject } from "@/lib/tools-drive";

// 1案件の読み込み
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const content = await readProject(token, id);
    return NextResponse.json({ content });
  } catch (e: any) {
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
