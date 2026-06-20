"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-[#e3ddd9] bg-white px-4 py-3 text-[15px] text-[#1a1a1a] placeholder:text-[#b3aca7] focus:border-[#e85d75] focus:outline-none focus:ring-2 focus:ring-[#f7d6dd] transition-colors";

const labelClass = "block text-[14px] font-bold text-[#333] mb-2";
const hintClass = "text-[12px] text-[#999] font-normal";

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error || "送信に失敗しました。");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "通信エラーが発生しました。電波の良い場所で再度お試しください。"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-[#f0d4da] rounded-2xl px-6 py-12 text-center">
        <div className="text-3xl mb-4">🕊</div>
        <h3 className="text-lg font-bold mb-3">応募ありがとうございます！</h3>
        <p className="text-sm text-[#666] leading-relaxed">
          内容を確認のうえ、ご連絡いたします。
          <br />
          少しお時間をいただく場合があります。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#eee] rounded-2xl px-6 sm:px-8 py-8 text-left space-y-6"
    >
      {/* honeypot（人間には見えない。ボット除け） */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          会社名
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className={labelClass} htmlFor="name">
          お名前 <span className="text-[#e85d75]">*</span>
        </label>
        <input id="name" name="name" required className={inputClass} placeholder="例：高橋 明日香" />
      </div>

      <div>
        <label className={labelClass} htmlFor="contact">
          連絡先 <span className="text-[#e85d75]">*</span>{" "}
          <span className={hintClass}>メール または X など（DM可）</span>
        </label>
        <input
          id="contact"
          name="contact"
          required
          className={inputClass}
          placeholder="例：you@example.com / @your_handle"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="sns">
          SNSで反応・売上をつくった事例 <span className="text-[#e85d75]">*</span>{" "}
          <span className={hintClass}>アカウントURLでもOK</span>
        </label>
        <textarea
          id="sns"
          name="sns"
          required
          rows={3}
          className={inputClass}
          placeholder="運用したアカウントのURL、または「どんな反応・売上をつくったか」を1つ"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="reason">
          この募集に興味を持った理由 <span className="text-[#e85d75]">*</span>{" "}
          <span className={hintClass}>3行ほどで</span>
        </label>
        <textarea
          id="reason"
          name="reason"
          required
          rows={3}
          className={inputClass}
          placeholder=""
        />
      </div>

      <div>
        <span className={labelClass}>
          成果報酬（固定給なし）で問題ないですか？{" "}
          <span className="text-[#e85d75]">*</span>
        </span>
        <div className="flex flex-col sm:flex-row gap-3">
          {["はい", "相談したい"].map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2.5 flex-1 cursor-pointer rounded-xl border border-[#e3ddd9] bg-white px-4 py-3 text-[15px] text-[#333] has-[:checked]:border-[#e85d75] has-[:checked]:bg-[#fff7f8] transition-colors"
            >
              <input
                type="radio"
                name="commission"
                value={opt}
                required
                className="accent-[#e85d75]"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="availability">
          月にどれくらい動けそうですか？{" "}
          <span className="text-[#e85d75]">*</span>
        </label>
        <input
          id="availability"
          name="availability"
          required
          className={inputClass}
          placeholder="例：週に5〜10時間／平日夜と週末 など"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="favorite">
          好きなクリエイター・キャラ <span className={hintClass}>任意</span>
        </label>
        <input id="favorite" name="favorite" className={inputClass} placeholder="" />
      </div>

      {status === "error" && (
        <p className="text-[14px] text-[#c0392b] bg-[#fdecea] border border-[#f5c6cb] rounded-xl px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center text-sm font-semibold text-white bg-[#e85d75] px-7 py-4 rounded-full hover:bg-[#d44d65] transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:scale-[1.02] active:enabled:scale-[0.98]"
      >
        {status === "sending" ? "送信中…" : "応募を送信する →"}
      </button>

      <p className="text-[12px] text-[#999] text-center leading-relaxed">
        送信いただいた内容は採用選考のためにのみ利用します。
      </p>
    </form>
  );
}
