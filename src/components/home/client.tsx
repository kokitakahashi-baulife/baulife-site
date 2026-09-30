"use client";

import { useEffect, useRef, useState } from "react";
import { inquiryTypes, type InquiryType } from "@/data/home";
import s from "./home.module.css";

const PICK_EVENT = "home:inquiry-pick";

// data-reveal の付いた要素を、画面に入ったら data-shown で表示する
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -4% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

// 音なしのループ動画。動きを減らす設定の人にはポスター画像だけを見せる。
// 画面の切り替えなどで止まっても、見えている間は再生し直す
export function LoopVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }
    let visible = false;
    const resume = () => {
      if (visible && v.paused && document.visibilityState === "visible") v.play().catch(() => {});
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      resume();
    });
    io.observe(v);
    v.addEventListener("pause", resume);
    document.addEventListener("visibilitychange", resume);
    return () => {
      io.disconnect();
      v.removeEventListener("pause", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      autoPlay
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}

// 押すと、お問い合わせフォームの「ご用件」をその内容に合わせてから #contact へ移る
export function InquiryLink({
  type,
  children,
  ...rest
}: {
  type: InquiryType;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  return (
    <a
      {...rest}
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: type }))}
    >
      {children}
    </a>
  );
}

const doors: { type: InquiryType; who: string; label: string }[] = [
  { type: "biz", who: "For Business", label: "AI活用・新規事業のご相談" },
  { type: "brand", who: "For Sellers", label: "物販のブランド化のご相談" },
  { type: "other", who: "Others", label: "取材・各事業・その他" },
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [type, setType] = useState<InquiryType>("biz");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const onPick = (e: Event) => setType((e as CustomEvent<InquiryType>).detail);
    window.addEventListener(PICK_EVENT, onPick);
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  const pressed = type === "ai" ? "biz" : type;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error || "送信できませんでした。時間をおいてもう一度お試しください。");
      }
    } catch {
      setStatus("error");
      setError("通信できませんでした。電波の良い場所でもう一度お試しください。");
    }
  }

  return (
    <>
      <div className={`${s.doors} ${s.rv}`} role="group" aria-label="ご用件" data-reveal="">
        {doors.map((d) => (
          <button
            key={d.type}
            type="button"
            className={s.door}
            aria-pressed={pressed === d.type}
            onClick={() => {
              setType(d.type);
              selectRef.current?.focus();
            }}
          >
            <span className={s.mono}>{d.who}</span>
            <strong>{d.label}</strong>
            <span className={s.arr} aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>

      {status === "sent" ? (
        <div className={s.form}>
          <div className={s.done} role="status">
            <strong>お問い合わせを送信しました。</strong>
            <p>内容を確認のうえ、担当者からご連絡します。</p>
          </div>
        </div>
      ) : (
        <form className={s.form} onSubmit={submit}>
          <div className={s.honeypot} aria-hidden="true">
            <label>
              ウェブサイト
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label>
            ご用件
            <select
              ref={selectRef}
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value as InquiryType)}
            >
              {Object.entries(inquiryTypes).map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className={s.row}>
            <label>
              お名前
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              会社名・屋号（任意）
              <input name="company" autoComplete="organization" />
            </label>
          </div>
          <label>
            メールアドレス
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            内容
            <textarea name="message" required />
          </label>
          {status === "error" && (
            <p className={s.error} role="alert">
              {error}
            </p>
          )}
          <button className={s.send} disabled={status === "sending"}>
            {status === "sending" ? "送信しています…" : "送信する →"}
          </button>
        </form>
      )}
    </>
  );
}
