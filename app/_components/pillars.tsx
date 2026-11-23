import { credentials, pillars } from "../data";
import { ShowMore } from "./show-more";

export function Credentials() {
  return (
    <section aria-label="Credentials" className="border-b border-navy/10 bg-white">
      <ul data-stagger className="wrap flex flex-wrap items-center justify-center gap-3 py-8">
        {credentials.map((c) => (
          <li key={c} className="rounded-full border border-gold/50 bg-cream px-4 py-2 text-[13px] font-medium text-gold-ink">
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Pillars({ limit }: { limit?: number }) {
  const shown = limit ? pillars.slice(0, limit) : pillars;
  return (
    <section id="virtual-cfo" aria-labelledby="pillars-h" className="wrap scroll-mt-20 py-16 sm:py-24 lg:py-32">
      <div data-reveal className="mb-14 grid items-end gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">Virtual CFO</p>
          <h2 id="pillars-h" className="h2">
            Finance leadership, <span className="font-medium italic text-gold">without</span> the full-time hire
          </h2>
        </div>
        <p className="text-[17px] leading-relaxed text-slate-body lg:col-span-4 lg:col-start-9">
          Nine areas where we act as your outsourced finance team — for clarity, control and sustainable growth.
        </p>
      </div>

      <ol data-stagger className="grid border-l border-t border-navy/10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={p.title} className="group flex flex-col gap-4 border-b border-r border-navy/10 bg-white/60 p-7 transition-colors hover:bg-white sm:p-8">
            <span className="font-serif text-[22px] italic text-gold-mid transition-transform duration-300 group-hover:translate-x-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
            <p className="text-[15px] leading-relaxed text-slate-body">{p.text}</p>
            <ul className="mt-auto flex flex-col gap-2 border-t border-navy/10 pt-4 text-sm">
              {p.points.map((pt) => (
                <li key={pt}>— {pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {limit && limit < pillars.length && (
        <ShowMore href="/services#virtual-cfo" label="Show more Virtual CFO services" hint={`${pillars.length - limit} more areas we cover`} />
      )}
    </section>
  );
}
