import { redirect } from "next/navigation";

// 採用一覧は独立ページを廃止し、トップの採用ブロックへ集約。
// 旧 /recruit へのアクセスはトップの採用セクションへリダイレクト。
export default function Recruit() {
  redirect("/#recruit");
}
