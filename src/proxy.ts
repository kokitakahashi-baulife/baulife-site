import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 社内ツール（/tools 配下）を Basic 認証で保護する。
// Next.js 16 では Middleware は Proxy にリネームされた（機能は同じ）。
// パスワード等は Vercel の環境変数 TOOLS_USER / TOOLS_PASSWORD で設定する。
export function proxy(request: NextRequest) {
  const user = process.env.TOOLS_USER ?? "baulife";
  const pass = process.env.TOOLS_PASSWORD;

  // パスワード未設定なら誤って全公開しないよう閉じる
  if (!pass) {
    return new NextResponse("Tools password not configured.", { status: 503 });
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const idx = decoded.indexOf(":");
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (u === user && p === pass) {
        return NextResponse.next();
      }
    } catch {
      // 不正なヘッダ → 401 へ
    }
  }

  return new NextResponse("認証が必要です", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="BAULIFE Tools", charset="UTF-8"' },
  });
}

export const config = {
  matcher: "/tools/:path*",
};
