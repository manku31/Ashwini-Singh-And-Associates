"use client";

import { useState } from "react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to an email-list provider.
        setDone(true);
      }}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input
        id="nl-email"
        type="email"
        required
        placeholder="you@company.com"
        autoComplete="email"
        className={`field ${dark ? "!border-white/25 !bg-white/10 !text-white placeholder:text-white/60" : ""}`}
      />
      <button type="submit" className={`btn shrink-0 !h-[50px] ${dark ? "btn-gold" : "btn-dark"}`}>
        {done ? "Subscribed ✓" : "Subscribe"}
      </button>
    </form>
  );
}
