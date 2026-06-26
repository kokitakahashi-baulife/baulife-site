import { NextResponse } from "next/server";
import { getAccessToken, loadWax, saveWax } from "@/lib/tools-drive";

// 共有商品データの読み込み（Google Drive上の単一JSON）
export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await loadWax(token));
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}

// 共有商品データの保存（上書き）
export async function POST(req: Request) {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const { products, savedAt } = await req.json();
    if (!Array.isArray(products)) {
      return NextResponse.json({ error: "products must be an array" }, { status: 400 });
    }
    const r = await saveWax(token, products, typeof savedAt === "number" ? savedAt : undefined);
    return NextResponse.json({ ok: true, modifiedTime: r.modifiedTime ?? null });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
