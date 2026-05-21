"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

type State = "idle" | "submitting" | "ok" | "error";

export function NewsletterForm() {
  const t = useTranslations("Home.newsletter");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      setState("ok");
      setEmail("");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "ok") {
    return (
      <p className="text-body-lg text-ink-inverse" role="status">
        Thank you. Look for the next letter from Romania in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        {t("placeholder")}
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder={t("placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === "submitting"}
        aria-invalid={state === "error"}
        aria-describedby={state === "error" ? "newsletter-error" : undefined}
        className={cn(
          "flex-1 h-12 px-4 rounded-sm bg-surface-raised text-ink",
          "border border-rule placeholder:text-ink-muted",
          "focus:outline-none focus:ring-2 focus:ring-focus",
          "disabled:opacity-60",
        )}
      />
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
        {state === "submitting" ? "Sending…" : t("submit")}
      </button>
      {state === "error" && errorMsg ? (
        <p id="newsletter-error" className="text-body-sm text-danger-bright sm:basis-full" role="alert">
          {errorMsg}
        </p>
      ) : null}
    </form>
  );
}
