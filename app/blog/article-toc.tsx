"use client";

import { useEffect, useState } from "react";

export function ArticleToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -60% 0px" },
    );
    els.forEach((el) => obs.observe(el));

    const article = document.getElementById("article-body");
    const onScroll = () => {
      if (!article) return;
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, -r.top / (total > 0 ? total : 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-navy/10 bg-white p-6"
    >
      <h3 className="text-sm font-bold tracking-[0.16em] text-slate-body">
        IN THIS ARTICLE
      </h3>
      <ul className="mt-4 flex flex-col">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={`block border-l-2 py-2 pl-4 text-[15px] transition-colors ${
                active === i.id
                  ? "border-gold font-semibold text-navy"
                  : "border-navy/10 text-slate-body hover:text-gold-ink"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
      <div
        className="mt-5 h-1 overflow-hidden rounded-full bg-navy/10"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left bg-gold transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-body">
        {Math.round(progress * 100)}% read
      </p>
    </nav>
  );
}
