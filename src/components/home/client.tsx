"use client";

import { useEffect, useRef, useState } from "react";
import { inquiryLabels, type HomeLang, type InquiryType } from "@/data/home";
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

const LANG_KEY = "baulife:lang";

/// 日本語のページで、まだ言語を選んだことがなく、ブラウザが日本語でない人だけ英語版へ移す。
/// サーバーは使わない(ブラウザの中だけで判断する)
export function LangAutoSwitch({ to }: { to: string }) {
  useEffect(() => {
    let chosen: string | null = null;
    try {
      chosen = localStorage.getItem(LANG_KEY);
    } catch {}
    if (chosen) return;
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    if (langs.some((l) => l?.toLowerCase().startsWith("ja"))) return;
    if (/bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) return;
    location.replace(to + location.search + location.hash);
  }, [to]);
  return null;
}

/// 言語の切り替えリンク。選んだ言語を覚えて、次から自動で移さない
export function LangLink({ href, lang, children }: { href: string; lang: HomeLang; children: React.ReactNode }) {
  return (
    <a
      href={href}
      hrefLang={lang}
      onClick={() => {
        try {
          localStorage.setItem(LANG_KEY, lang);
        } catch {}
      }}
    >
      {children}
    </a>
  );
}

const DOORS: Record<HomeLang, { type: InquiryType; who: string; label: string }[]> = {
  ja: [
    { type: "biz", who: "For Business", label: "AI活用・新規事業のご相談" },
    { type: "brand", who: "For Sellers", label: "物販のブランド化のご相談" },
    { type: "other", who: "Others", label: "取材・各事業・その他" },
  ],
  en: [
    { type: "biz", who: "For Business", label: "AI adoption & new businesses" },
    { type: "brand", who: "For Sellers", label: "Building your shop into a brand" },
    { type: "other", who: "Others", label: "Press, our businesses & other" },
  ],
};

const FORM_T = {
  ja: {
    failed: "送信できませんでした。時間をおいてもう一度お試しください。",
    offline: "通信できませんでした。電波の良い場所でもう一度お試しください。",
    sentH: "お問い合わせを送信しました。",
    sentP: "内容を確認のうえ、担当者からご連絡します。",
    website: "ウェブサイト",
    type: "ご用件",
    name: "お名前",
    company: "会社名・屋号（任意）",
    email: "メールアドレス",
    message: "内容",
    sending: "送信しています…",
    send: "送信する →",
  },
  en: {
    failed: "We couldn't send your message. Please try again in a little while.",
    offline: "We couldn't connect. Please check your connection and try again.",
    sentH: "Your message has been sent.",
    sentP: "We'll read it and get back to you. Replies may be in Japanese or English.",
    website: "Website",
    type: "Topic",
    name: "Name",
    company: "Company (optional)",
    email: "Email",
    message: "Message",
    sending: "Sending…",
    send: "Send →",
  },
} as const;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ lang = "ja" }: { lang?: HomeLang }) {
  const t = FORM_T[lang];
  const doors = DOORS[lang];
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
        setError((lang === "ja" && json.error) || t.failed);
      }
    } catch {
      setStatus("error");
      setError(t.offline);
    }
  }

  return (
    <>
      <div className={`${s.doors} ${s.rv}`} role="group" aria-label={t.type} data-reveal="">
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
            <strong>{t.sentH}</strong>
            <p>{t.sentP}</p>
          </div>
        </div>
      ) : (
        <form className={s.form} onSubmit={submit}>
          <div className={s.honeypot} aria-hidden="true">
            <label>
              {t.website}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label>
            {t.type}
            <select
              ref={selectRef}
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value as InquiryType)}
            >
              {Object.entries(inquiryLabels[lang]).map(([v, label]) => (
                <option key={v} value={v}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <div className={s.row}>
            <label>
              {t.name}
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              {t.company}
              <input name="company" autoComplete="organization" />
            </label>
          </div>
          <label>
            {t.email}
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            {t.message}
            <textarea name="message" required />
          </label>
          {status === "error" && (
            <p className={s.error} role="alert">
              {error}
            </p>
          )}
          <button className={s.send} disabled={status === "sending"}>
            {status === "sending" ? t.sending : t.send}
          </button>
        </form>
      )}
    </>
  );
}
