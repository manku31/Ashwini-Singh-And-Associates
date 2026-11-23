import { faqs, resources } from "../data";

const tones = {
  navy: { bg: "bg-navy", text: "text-gold-light" },
  sand: { bg: "bg-[#ede5d6]", text: "text-navy" },
  gold: { bg: "bg-gold", text: "text-navy" },
} as const;

export function Resources() {
  return (
    <section id="resources" className="scroll-mt-20 border-y border-navy/5 bg-white">
      <div className="wrap py-24 lg:py-32">
        <div data-reveal className="mb-14">
          <p className="eyebrow mb-6">Resources</p>
          <h2 className="h2">
            Insights <span className="font-medium italic text-gold">&amp;</span> Guides
          </h2>
        </div>
        <div data-stagger className="grid gap-8 md:grid-cols-3">
          {resources.map((r) => (
            <article key={r.title} className="thumb-wrap flex flex-col gap-[18px]">
              <div aria-hidden="true" className={`relative h-60 overflow-hidden rounded-md ${tones[r.tone].bg}`}>
                <div className="thumb absolute inset-0">
                {r.tone === "navy" && <div className="grid-dark absolute inset-0" />}
                <div className="absolute -bottom-14 -right-10 h-[200px] w-[200px] rounded-full bg-white/15" />
                <span className={`absolute bottom-5 left-6 font-serif text-[52px] italic ${tones[r.tone].text}`}>{r.tag}</span>
                </div>
              </div>
              <span className="text-xs font-semibold tracking-[0.18em] text-gold-ink">{r.kind}</span>
              <h3 className="text-[21px] font-bold leading-snug">
                <a href="#contact" className="hover:text-gold-ink">{r.title}</a>
              </h3>
              <p className="text-[15px] leading-relaxed text-slate-body">{r.text}</p>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6">FAQ</p>
            <h3 className="h2 !text-4xl">Answers before you ask</h3>
          </div>
          <div className="divide-y divide-navy/10 border-y border-navy/10 lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl font-light text-gold-mid transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
