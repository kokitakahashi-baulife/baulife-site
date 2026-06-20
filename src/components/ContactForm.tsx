"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-[#e3ddd9] bg-white px-4 py-3 text-[15px] text-[#1a1a1a] placeholder:text-[#b3aca7] focus:border-[#e85d75] focus:outline-none focus:ring-2 focus:ring-[#f7d6dd] transition-colors";

const labelClass = "block text-[14px] font-bold text-[#333] mb-2 text-left";

export default function ContactForm() {
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
      const res = await fetch("/api/contact", {
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
      <div className="bg-white border border-[#f0d4da] rounded-2xl px-6 py-10 text-center">
        <div className="text-3xl mb-4">🕊</div>
        <h3 className="text-lg font-bold mb-3">お問い合わせありがとうございます</h3>
        <p className="text-sm text-[#666] leading-relaxed">
          内容を確認のうえ、ご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#eee] rounded-2xl px-6 sm:px-8 py-8 space-y-5"
    >
      {/* honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          ウェブサイト
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className={labelClass} htmlFor="contact-name">
          お名前 <span className="text-[#e85d75]">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          required
          className={inputClass}
          placeholder="例：山田 太郎"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="contact-company">
          会社名・団体名 <span className="text-[12px] text-[#999] font-normal">任意</span>
        </label>
        <input
          id="contact-company"
          name="company"
          className={inputClass}
          placeholder="例：株式会社〇〇"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="contact-email">
          メールアドレス <span className="text-[#e85d75]">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="例：you@example.com"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="contact-message">
          お問い合わせ内容 <span className="text-[#e85d75]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="ご用件をご記入ください。"
        />
      </div>

      {status === "error" && (
        <p className="text-[14px] text-[#c0392b] bg-[#fdecea] border border-[#f5c6cb] rounded-xl px-4 py-3 text-left">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full inline-flex items-center justify-center text-sm font-semibold text-white bg-[#e85d75] px-7 py-4 rounded-full hover:bg-[#d44d65] transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:scale-[1.02] active:enabled:scale-[0.98]"
      >
        {status === "sending" ? "送信中…" : "送信する →"}
      </button>
    </form>
  );
}
