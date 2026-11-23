import Link from "next/link";
import { SHOW_SAMPLE_LABEL, reviews } from "../data";
import { Marquee } from "./marquee";
import { NewsletterForm } from "./newsletter-form";

const tones = {
  navy: "bg-navy text-gold-light",
  gold: "bg-gold-deep text-white",
  sand: "bg-[#ede5d6] text-navy border border-gold/40",
} as const;

/** Initials avatar — a neutral stand-in until real client photos (with permission) are available. */
function Avatar({ name, tone }: { name: string; tone: keyof typeof tones }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-serif text-base font-semibold ${tones[tone]}`}>
      {initials}
    </span>
  );
}

export function Reviews() {
  return (
    <section aria-labelledby="reviews-h" className="overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">Client reviews</p>
          <h2 id="reviews-h" className="h2">
            Trusted by clients <span className="font-medium italic text-gold">across India</span>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-slate-body">
            What businesses, professionals and NRIs say about working with us.
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-lg border border-navy/10 bg-white px-6 py-4">
          <span className="font-serif text-4xl font-bold leading-none">[4.x]</span>
          <span className="flex flex-col gap-1 text-[13px] text-slate-body">
            <span aria-hidden="true" className="tracking-widest text-gold">★★★★★</span>
            <span>on Google Reviews · [n] reviews</span>
          </span>
        </div>
      </div>

      {/* Auto-drifts left → right; drag, swipe, trackpad, arrows and arrow keys also work. */}
      <Marquee label="Client reviews">
        {reviews.map((r) => (
          <li key={r.name} className="card flex w-[300px] shrink-0 flex-col gap-5 rounded-xl border border-navy/10 bg-white p-7 sm:w-[370px] sm:p-8">
            <div className="flex items-center justify-between">
              <span aria-label="5 out of 5 stars" role="img" className="tracking-widest text-gold">★★★★★</span>
              {SHOW_SAMPLE_LABEL && (
                <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-ink">Sample review</span>
              )}
            </div>
            <blockquote className="text-[16px] leading-relaxed text-slate-body">“{r.quote}”</blockquote>
            <div className="mt-auto flex items-center gap-3 border-t border-navy/10 pt-5">
              <Avatar name={r.name} tone={r.tone} />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-bold">{r.name}</span>
                <span className="text-[13px] text-slate-body">{r.meta}</span>
              </span>
            </div>
          </li>
        ))}
      </Marquee>
    </section>
  );
}

export function CtaBand() {
  return (
    <section aria-labelledby="cta-h" className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="grid-dark absolute inset-0" />
      <div aria-hidden="true" className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full border border-gold/30" />
      <div className="wrap relative grid gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div data-reveal>
          <p className="eyebrow on-dark mb-6">Get started</p>
          <h2 id="cta-h" className="h2">
            Ready to take control of your financial future?
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/75">
            Tailored guidance on cash flow, growth and long-term profitability — from a CA who knows your numbers.
          </p>
          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Link href="/contact" className="btn btn-gold w-full sm:w-auto">Schedule a Consultation</Link>
            <a href="tel:+910000000000" className="btn btn-outline-light w-full sm:w-auto">Call [+91 XXXXX XXXXX]</a>
          </div>
        </div>
        <div data-reveal className="flex flex-col justify-center rounded-xl border border-white/15 bg-white/5 p-7 sm:p-9">
          <h3 className="font-serif text-2xl font-semibold">Stay ahead with expert insights</h3>
          <p className="mb-6 mt-3 text-[15px] leading-relaxed text-white/75">
            A short monthly note on cash flow, tax, compliance and financial planning. No spam.
          </p>
          <NewsletterForm dark />
        </div>
      </div>
    </section>
  );
}
