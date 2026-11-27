"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPost } from "./data";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="arrow h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cats = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );

  const filtered = posts.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (q.trim() === "" ||
        `${p.title} ${p.excerpt} ${p.category}`
          .toLowerCase()
          .includes(q.trim().toLowerCase())),
  );
  const showFeatured = cat === "All" && q.trim() === "";
  const [featured, ...rest] = filtered;
  const grid = showFeatured ? rest : filtered;

  return (
    <section aria-label="Blog posts" className="wrap py-14 sm:py-20">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2"
        >
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                cat === c
                  ? "border-navy bg-navy text-white shadow-md"
                  : "border-navy/15 bg-white text-navy hover:border-gold hover:text-gold-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search articles</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-body"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-navy/15 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>

      {showFeatured && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="thumb-wrap group mb-14 grid overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl lg:grid-cols-2"
        >
          <div className="relative min-h-64 overflow-hidden lg:min-h-96">
            <Image
              src={featured.image}
              alt=""
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              priority
              className="thumb object-cover"
            />
            <span className="absolute left-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-[0.14em] text-navy">
              FEATURED
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
            <span className="text-xs font-semibold tracking-[0.18em] text-gold-ink">
              {featured.category.toUpperCase()}
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight group-hover:text-gold-ink sm:text-4xl">
              {featured.title}
            </h2>
            <p className="text-[17px] leading-relaxed text-slate-body">
              {featured.excerpt}
            </p>
            <p className="text-[13px] text-slate-body">
              {featured.author} · {fmt(featured.date)}
            </p>
            <span className="mt-2 inline-flex items-center gap-2 font-semibold text-navy group-hover:text-gold-ink">
              Read article <Arrow />
            </span>
          </div>
        </Link>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-navy/20 py-20 text-center">
          <p className="font-serif text-2xl font-semibold">No articles found</p>
          <p className="mt-2 text-slate-body">
            Try a different category or search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setCat("All");
              setQ("");
            }}
            className="btn btn-dark mt-6"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {grid.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{ animationDelay: `${i * 60}ms` }}
              className="thumb-wrap card group flex animate-[item-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both] flex-col overflow-hidden rounded-xl border border-navy/10 bg-white"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  className="thumb object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tracking-[0.12em] text-navy shadow-sm">
                  {p.category.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-[13px] text-slate-body">
                  {p.author} · {fmt(p.date)}
                </p>
                <h2 className="text-[21px] font-bold leading-snug group-hover:text-gold-ink">
                  {p.title}
                </h2>
                <p className="flex-1 text-[15px] leading-relaxed text-slate-body">
                  {p.excerpt}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold-ink">
                  Read more <Arrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
