import Link from "next/link";

/** Compact banner at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs = [],
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-navy/10 bg-sand">
      <div className="wrap py-14 sm:py-20 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[13px] text-slate-body">
          <Link href="/" className="hover:text-gold-ink">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              {c.href ? <Link href={c.href} className="hover:text-gold-ink">{c.label}</Link> : <span aria-current="page" className="font-semibold text-navy">{c.label}</span>}
            </span>
          ))}
        </nav>
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[56px]">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-slate-body">{text}</p>}
      </div>
    </section>
  );
}
