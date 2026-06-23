import { NextResponse } from "next/server";
import { auth } from "@/auth";

// 社内ツール（/tools 配下）を Google SSO で保護する。
// 未ログインなら /tools/login へリダイレクト。許可アドレスの判定は src/auth.ts。
// Next.js 16 では Middleware は Proxy にリネーム（機能は同じ）。
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // ログインページ自体は通す（リダイレクトループ防止）
  if (pathname === "/tools/login") return;

  if (!req.auth) {
    const url = new URL("/tools/login", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/tools", "/tools/:path*"],
};
