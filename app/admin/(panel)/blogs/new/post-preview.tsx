import Image from "next/image";
import type { BlogPost } from "@/app/blog/data";
import { IMG_TOKEN, placedImages } from "@/lib/blog-content";

export type PreviewData = {
  title: string;
  category: string;
  author: string;
  excerpt: string;
  images: string[];
  date: string;
  readTime: string;
  sections: BlogPost["sections"] | null;
  hasBody: boolean;
};

const empty = (t: string) => <span className="text-slate-body/60">{t}</span>;

/** Mirrors the public /blog/[slug] layout so the admin sees what readers will see. */
export function PostPreview({ d }: { d: PreviewData }) {
  const placed = d.sections ? placedImages(d.sections) : new Set<string>();
  const unplaced = d.images.slice(1).filter((u) => !placed.has(u));
  return (
    <div className="overflow-hidden rounded-xl border border-navy/10 bg-cream">
      <div className="flex items-center gap-2 border-b border-navy/10 bg-white px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-3 text-xs font-semibold tracking-[0.14em] text-slate-body">LIVE PREVIEW</span>
      </div>

      <section className="border-b border-navy/10 bg-sand px-6 py-10">
        <p className="eyebrow mb-4">{d.category.trim() ? d.category : empty("Category")}</p>
        <h1 className="font-serif text-3xl font-bold leading-[1.15]">{d.title.trim() ? d.title : empty("Your title appears here")}</h1>
        <p className="mt-4 text-sm text-slate-body">
          {d.author.trim() || "Author"} · {d.date} · {d.readTime}
        </p>
      </section>

      <div className="px-6 pt-6">
        {d.images[0] ? (
          <Image src={d.images[0]} alt="" width={1200} height={750} className="aspect-[21/9] w-full rounded-xl object-cover shadow-lg" />
        ) : (
          <div className="flex aspect-[21/9] w-full items-center justify-center rounded-xl border-2 border-dashed border-navy/15 text-sm text-slate-body/70">
            Cover image appears here
          </div>
        )}
      </div>

      <article className="px-6 py-8">
        <p className="border-l-4 border-gold pl-5 font-serif text-xl leading-[1.5]">
          {d.excerpt.trim() ? d.excerpt : empty("Your summary appears here…")}
        </p>

        {unplaced.length > 0 && (
          <div className={`mt-8 grid gap-4 ${unplaced.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {unplaced.map((src) => (
              <Image key={src} src={src} alt="" width={800} height={500} className="aspect-[16/10] w-full rounded-xl border border-navy/10 object-cover" />
            ))}
          </div>
        )}

        {d.sections?.map((s, i) => (
          <section key={i} className="mt-10">
            <div className="flex items-baseline gap-4">
              <span aria-hidden="true" className="font-serif text-2xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-xl font-bold">{s.heading}</h2>
            </div>
            {s.paragraphs.map((t, j) => {
              const img = IMG_TOKEN.exec(t)?.[1];
              return img ? (
                <Image key={j} src={img} alt="" width={800} height={500} className="mt-5 aspect-[16/10] w-full rounded-xl border border-navy/10 object-cover" />
              ) : (
                <p key={j} className="mt-4 text-[16px] leading-[1.8] text-slate-body">{t}</p>
              );
            })}
            {s.images && s.images.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {s.images.map((im) => (
                  <figure key={im.src}>
                    <Image src={im.src} alt={im.alt} width={600} height={400} className="w-full rounded-lg border border-navy/10" />
                    {im.caption && <figcaption className="mt-1 text-xs text-slate-body">{im.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
            {s.points && (
              <ul className="mt-5 flex flex-col gap-2.5 rounded-xl bg-sand p-5">
                {s.points.map((pt, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-gold-mid" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {!d.sections && (
          <p className="mt-8 rounded-md bg-sand p-4 text-sm text-slate-body">
            {d.hasBody
              ? "Start with “## Heading”, then add a paragraph under every heading to see the article here."
              : "The article body appears here as you type."}
          </p>
        )}
      </article>
    </div>
  );
}
