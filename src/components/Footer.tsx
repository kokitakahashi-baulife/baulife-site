import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-[#eee] bg-white text-[13px] text-[#aaa]">
      <div className="mb-3 flex justify-center flex-wrap gap-x-6 gap-y-2">
        <Link
          href="/recruit"
          className="text-[#888] hover:text-[#1a1a1a] transition-colors"
        >
          採用情報
        </Link>
        <Link
          href="/privacy"
          className="text-[#888] hover:text-[#1a1a1a] transition-colors"
        >
          プライバシーポリシー
        </Link>
        <Link
          href="/terms"
          className="text-[#888] hover:text-[#1a1a1a] transition-colors"
        >
          利用規約
        </Link>
      </div>
      <div>&copy; 2026 BAULIFE Inc. All rights reserved.</div>
    </footer>
  );
}
