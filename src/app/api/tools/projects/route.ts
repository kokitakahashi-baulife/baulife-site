import { NextResponse } from "next/server";
import { getAccessToken, listProjects, createProject } from "@/lib/tools-drive";

// 案件一覧
export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const files = await listProjects(token);
    return NextResponse.json({ files });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}

// 新規作成
export async function POST(req: Request) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { name, content, meta } = await req.json();
    const file = await createProject(token, name || "無題_企画書", content ?? {}, meta ?? {});
    return NextResponse.json(file);
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
