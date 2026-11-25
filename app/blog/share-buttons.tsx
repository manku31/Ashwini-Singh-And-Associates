"use client";

import { useState } from "react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = () => window.location.href;
  const open = (href: string) =>
    window.open(href, "_blank", "noopener,noreferrer");

  async function copy() {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; ignore
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: url() });
      } catch {
        // user cancelled
      }
    } else {
      await copy();
    }
  }

  const btn =
    "rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold-ink";
  const enc = encodeURIComponent;

  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-navy/10 pt-6">
      <span className="text-sm font-bold tracking-[0.16em] text-slate-body">
        SHARE
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => open(`https://wa.me/?text=${enc(`${title} ${url()}`)}`)}
      >
        WhatsApp
      </button>
      <button
        type="button"
        className={btn}
        onClick={() =>
          open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url())}`,
          )
        }
      >
        LinkedIn
      </button>
      <button
        type="button"
        className={btn}
        onClick={() =>
          open(
            `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url())}`,
          )
        }
      >
        X
      </button>
      <button
        type="button"
        className={btn}
        onClick={() =>
          open(`https://www.facebook.com/sharer/sharer.php?u=${enc(url())}`)
        }
      >
        Facebook
      </button>
      <button type="button" className={btn} onClick={copy} aria-live="polite">
        {copied ? "Link copied ✓" : "Copy link"}
      </button>
      <button
        type="button"
        className={`${btn} sm:hidden`}
        onClick={nativeShare}
      >
        More…
      </button>
    </div>
  );
}
