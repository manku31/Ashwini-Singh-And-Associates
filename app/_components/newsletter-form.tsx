"use client";

import { useState, useTransition } from "react";
import { subscribe } from "../actions";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  if (done) {
    return (
      <div
        role="status"
        className={`flex w-full max-w-md items-start gap-4 rounded-xl border p-5 ${
          dark ? "border-gold-light/40 bg-white/10 text-white" : "border-navy/10 bg-white text-navy"
        }`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold">You’re subscribed!</span>
          <span className={`text-sm leading-relaxed ${dark ? "text-white/75" : "text-slate-body"}`}>
            Thank you for joining. Our latest tax, GST and compliance insights will land in your inbox.
          </span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setError("");
        startTransition(async () => {
          const res = await subscribe(data);
          if (res.ok) setDone(true);
          else setError(res.error);
        });
      }}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:flex-wrap"
    >
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        autoComplete="email"
        className={`field ${dark ? "!border-white/25 !bg-white/10 !text-white placeholder:text-white/60" : ""}`}
      />
      <button type="submit" disabled={pending} className={`btn shrink-0 !h-[50px] disabled:opacity-60 ${dark ? "btn-gold" : "btn-dark"}`}>
        {pending ? "Subscribing…" : "Subscribe"}
      </button>
      {error && (
        <p role="alert" className={`text-sm font-semibold sm:basis-full ${dark ? "text-red-300" : "text-red-700"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
