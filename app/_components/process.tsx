import { process, testimonials } from "../data";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="scroll-mt-20 relative overflow-hidden bg-navy text-white">
      <div className="grid-dark absolute inset-0" aria-hidden="true" />
      <div aria-hidden="true" className="absolute -right-44 -top-56 h-[560px] w-[560px] rounded-full border border-gold/35" />
      <div className="wrap relative py-16 sm:py-24 lg:py-32">
        <div data-reveal className="mb-16 grid items-end gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <p className="eyebrow on-dark mb-6">How we work</p>
            <h2 id="process-h" className="h2">
              A clear path from first call to filed
            </h2>
          </div>
          <p className="text-base leading-relaxed text-white/75 lg:col-span-4 lg:col-start-9">
            Four steps, one point of contact, and no surprises on fees or deadlines.
          </p>
        </div>
        <ol data-stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {process.map((p, i) => (
            <li key={p.n} className={`flex flex-col gap-3.5 border-t pt-7 ${i === 0 ? "border-gold/60" : "border-white/20"}`}>
              <span className="font-serif text-[40px] font-medium italic leading-none text-gold-light">{p.n}</span>
              <span className="text-[19px] font-bold">{p.title}</span>
              <span className="text-[15px] leading-relaxed text-white/75">{p.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Testimonial() {
  const t = testimonials[0];
  return (
    <section aria-label="Client testimonial" className="wrap py-16 sm:py-24 lg:py-32">
      <figure data-reveal className="mx-auto flex max-w-[920px] flex-col items-center text-center">
        <span aria-hidden="true" className="h-14 font-serif text-[120px] leading-[0.6] text-gold">“</span>
        <blockquote className="mt-6 font-serif text-2xl font-medium leading-[1.4] sm:text-[34px]">{t.quote}</blockquote>
        <figcaption className="mt-10 flex items-center gap-4 text-left">
          <span aria-hidden="true" className="h-[52px] w-[52px] rounded-full border border-gold/50 bg-[#ede5d6]" />
          <span className="flex flex-col gap-1">
            <span className="text-[15px] font-bold">{t.name}</span>
            <span className="text-[13px] text-slate-body">{t.role}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
