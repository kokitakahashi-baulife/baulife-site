import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// 許可ドメイン（既定）。@baulife.world のアカウントは許可。
const ALLOWED_DOMAIN = "baulife.world";

// 共有ドライブ保存のため Drive スコープを要求する。
const SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/drive",
].join(" ");

function allowedEmails(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

// アクセストークンを refresh_token で更新する
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID ?? "",
        client_secret: process.env.AUTH_GOOGLE_SECRET ?? "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken ?? "",
      }),
    });
    const r = await res.json();
    if (!res.ok) throw r;
    return {
      ...token,
      accessToken: r.access_token,
      expiresAt: Math.floor(Date.now() / 1000) + (r.expires_in ?? 3600),
      refreshToken: r.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Google({
      authorization: {
        params: { scope: SCOPES, access_type: "offline", prompt: "consent" },
      },
    }),
  ],
  pages: { signIn: "/tools/login" },
  callbacks: {
    // 許可されたメールアドレスだけログインを通す
    signIn({ profile }) {
      const email = profile?.email?.toLowerCase();
      if (!email || profile?.email_verified !== true) return false;
      const domainOk = email.endsWith(`@${ALLOWED_DOMAIN}`);
      return domainOk || allowedEmails().includes(email);
    },
    async jwt({ token, account }: any) {
      // 初回サインイン：Google のトークンを保存
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      }
      // 有効期限内ならそのまま
      if (token.expiresAt && Date.now() < Number(token.expiresAt) * 1000 - 60_000) {
        return token;
      }
      // 期限切れ → 更新
      if (!token.refreshToken) return token;
      return refreshAccessToken(token);
    },
    session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
