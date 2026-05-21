"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type State = "idle" | "submitting" | "ok" | "error";

const SUBJECTS = [
  { value: "general", labelKey: "subjectGeneral" },
  { value: "trip", labelKey: "subjectTrip" },
  { value: "partner", labelKey: "subjectPartner" },
  { value: "press", labelKey: "subjectPress" },
] as const;

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<typeof SUBJECTS[number]["value"]>("general");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (state === "ok") {
    return (
      <div role="status" className="bg-surface-raised border border-rule rounded-md p-6">
        <p className="font-display text-h3 text-ink-strong">{t("successHeading")}</p>
        <p className="text-body text-ink-soft mt-3 max-w-[55ch]">{t("successBody")}</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setState("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      setState("ok");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  const inputClass = cn(
    "w-full px-4 rounded-sm bg-surface-raised text-ink",
    "border border-rule placeholder:text-ink-muted",
    "focus:outline-none focus:ring-2 focus:ring-focus",
    "disabled:opacity-60",
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className="text-body-sm font-semibold text-ink-strong">
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={state === "submitting"}
            className={cn(inputClass, "h-12")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className="text-body-sm font-semibold text-ink-strong">
            {t("emailLabel")}
            <span aria-hidden="true" className="text-accent-strong ml-1">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === "submitting"}
            className={cn(inputClass, "h-12")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-subject" className="text-body-sm font-semibold text-ink-strong">
          {t("subjectLabel")}
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value as typeof subject)}
          disabled={state === "submitting"}
          className={cn(inputClass, "h-12")}
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {t(s.labelKey)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-body-sm font-semibold text-ink-strong">
          {t("messageLabel")}
          <span aria-hidden="true" className="text-accent-strong ml-1">*</span>
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          placeholder={t("messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={state === "submitting"}
          className={cn(inputClass, "py-3 min-h-[10rem] resize-y")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "submitting"}
          className={cn(
            "inline-flex items-center justify-center h-12 px-6 rounded-sm bg-accent text-on-accent",
            "font-semibold text-body active:scale-[0.97]",
            "transition-transform duration-[160ms] [transition-timing-function:var(--ease-out)]",
            "disabled:opacity-60",
          )}
        >
          {state === "submitting" ? t("submitting") : t("submit")}
        </button>
        {state === "error" && errorMsg ? (
          <p role="alert" className="text-body-sm text-danger">
            {t("errorPrefix")}: {errorMsg}
          </p>
        ) : null}
      </div>
    </form>
  );
}
