import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// 許可ドメイン（既定）。@baulife.world のアカウントは許可。
const ALLOWED_DOMAIN = "baulife.world";

function allowedEmails(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // DB を使わず JWT セッション（運用費 $0・Edge 互換）
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [Google],
  pages: { signIn: "/tools/login" },
  callbacks: {
    // 許可されたメールアドレスだけログインを通す
    signIn({ profile }) {
      const email = profile?.email?.toLowerCase();
      if (!email || profile?.email_verified !== true) return false;
      const domainOk = email.endsWith(`@${ALLOWED_DOMAIN}`);
      return domainOk || allowedEmails().includes(email);
    },
  },
});
