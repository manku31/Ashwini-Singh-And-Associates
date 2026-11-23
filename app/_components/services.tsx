import { services, whyUs, type IconName } from "../data";
import { Arrow } from "./hero";

const icons: Record<IconName, React.ReactNode> = {
  audit: (<><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="M9 12.5l2 2 4-4" /><path d="M9 17.5h6" /></>),
  tax: (<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9.5 14.5l5-5" /><circle cx="9.75" cy="9.75" r="0.9" /><circle cx="14.25" cy="14.25" r="0.9" /></>),
  finance: (<><path d="M4 20h16" /><path d="M6 16v-4M10 16V9M14 16v-6M18 16V6" /><path d="M5 9l5-4 4 3 5-4" /></>),
  gst: (<><path d="M4 7h16v12H4z" /><path d="M4 11h16" /><path d="M8 15h3" /><path d="M9 7V5h6v2" /></>),
  law: (<><path d="M3 21h18" /><path d="M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6" /></>),
  cfo: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>),
};

export function Services() {
  return (
    <>
      <section id="services" className="scroll-mt-20 border-t border-navy/5 bg-sand">
        <div className="wrap py-16 sm:py-24 lg:py-32">
          <div data-reveal className="mb-14 grid items-end gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-6">What we do</p>
              <h2 className="h2">
                Expertise <span className="font-medium italic text-gold">&amp;</span> Services
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:col-start-8">
              <p className="text-[17px] leading-relaxed text-slate-body">
                End-to-end accounting, assurance and advisory under one roof — so your compliance, tax and growth plans all speak to each other.
              </p>
              <a href="#contact" className="border-b border-gold pb-[3px] text-sm font-semibold">
                Discuss your requirement
              </a>
            </div>
          </div>

          <div data-stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.title} className="card flex flex-col gap-[18px] rounded-xl border border-navy/10 bg-white px-6 py-8 sm:px-8 sm:py-9">
                <span aria-hidden="true" className="icon-tile flex h-[52px] w-[52px] items-center justify-center rounded-[10px] bg-gold/15 text-gold-mid">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {icons[s.icon]}
                  </svg>
                </span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-body">{s.text}</p>
                <ul className="flex flex-col gap-2.5 border-t border-navy/10 pt-[18px] text-sm">
                  {s.points.map((p) => (
                    <li key={p}>— {p}</li>
                  ))}
                </ul>
                <a href="#contact" className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold">
                  Learn more <Arrow size={14} stroke="#9C8047" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="why-h" className="wrap py-16 sm:py-24 lg:py-32">
        <div data-reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-6">Why choose us</p>
          <h2 id="why-h" className="h2">
            The reasons clients stay for years
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-slate-body">
            Traditional CA rigour, combined with modern responsiveness.
          </p>
        </div>
        <ul data-stagger className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => (
            <li key={w.title} className="flex flex-col gap-3 border-t border-gold/60 pt-6">
              <span className="font-serif text-[22px] italic text-gold-mid">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-bold">{w.title}</h3>
              <p className="text-[15px] leading-relaxed text-slate-body">{w.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
