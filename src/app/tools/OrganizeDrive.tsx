"use client";

import { useState } from "react";

type Report = {
  dryRun: boolean;
  root: { from?: string; to?: string; action?: string };
  folders: Record<string, string>;
  moved: string[];
};

export default function OrganizeDrive() {
  const [report, setReport] = useState<Report | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function run(execute: boolean) {
    if (execute && !confirm("ドライブを社内ポータル構成に整理します（移動のみ・削除なし）。実行しますか？")) return;
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/tools/organize", { method: execute ? "POST" : "GET" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
      setReport(j);
    } catch (e: any) {
      setErr(String(e?.message ?? e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 rounded-2xl border border-[#eee] bg-[#fafafa] p-5">
      <p className="text-[13px] font-bold text-[#1a1a1a] mb-1">管理者：ドライブ整理</p>
      <p className="text-[12px] text-[#999] mb-3 leading-relaxed">
        共有ドライブを「社内ポータル」構成（コラボ企画書／WAXシミュレーター／売上ランク表）に整理します。移動のみで削除はしません。まず「確認」で内容を見てから「実行」してください。
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => run(false)}
          disabled={busy}
          className="text-[13px] rounded-lg border border-[#ddd] bg-white px-4 py-2 hover:border-[#e85d75] disabled:opacity-50"
        >
          確認（ドライ実行）
        </button>
        <button
          onClick={() => run(true)}
          disabled={busy}
          className="text-[13px] rounded-lg border border-[#e85d75] bg-[#e85d75] text-white px-4 py-2 hover:opacity-90 disabled:opacity-50"
        >
          実行する
        </button>
        {busy && <span className="text-[12px] text-[#999]">処理中…</span>}
      </div>

      {err && <p className="mt-3 text-[12px] text-[#c0392b]">エラー：{err}</p>}

      {report && (
        <div className="mt-4 text-[12px] text-[#444] leading-relaxed">
          <p className="font-bold mb-1">{report.dryRun ? "確認結果（未実行）" : "実行結果"}</p>
          <p>
            ルート：{report.root.from} → {report.root.to}（{report.root.action}）
          </p>
          <p>
            フォルダ：
            {Object.entries(report.folders).map(([k, v]) => (
              <span key={k} className="mr-2">
                {k}=<span className="text-[#888]">{v}</span>
              </span>
            ))}
          </p>
          <p>
            企画書の移動（{report.moved.length}件）：
            {report.moved.length ? report.moved.join("、 ") : "なし"}
          </p>
        </div>
      )}
    </div>
  );
}
