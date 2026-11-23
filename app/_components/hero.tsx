import Image from "next/image";
import Link from "next/link";
import { clientele, stats } from "../data";
import { CountUp } from "./count-up";

const Arrow = ({ size = 16, stroke = "currentColor" }: { size?: number; stroke?: string }) => (
  <svg aria-hidden="true" className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export { Arrow };

export function Hero() {
  return (
    <>
      <section id="top" className="wrap pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <div data-hero className="flex flex-col lg:col-span-6">
            <p className="eyebrow mb-8">Chartered Accountants · Advisors</p>
            <h1 className="max-w-[640px] font-serif text-4xl font-extrabold uppercase leading-[1.08] min-[400px]:text-[40px] sm:text-6xl lg:text-[68px]">
              Empowering Financial Growth &amp; Trust
            </h1>
            <span aria-hidden="true" className="mt-7 block h-1 w-[68px] rounded-sm bg-gold" />
            <p className="mt-7 max-w-[500px] text-[19px] leading-relaxed text-slate-body">
              Expert Chartered Accountancy, Audit, &amp; Advisory services tailored for businesses and individuals.
            </p>
            <div className="mt-9 flex flex-col gap-3.5 sm:mt-11 sm:flex-row sm:flex-wrap">
              <Link href="/services" className="btn btn-dark w-full sm:w-auto">
                Explore Our Services <Arrow />
              </Link>
              <Link href="/about" className="btn btn-outline w-full sm:w-auto">
                Meet Our Team
              </Link>
            </div>
            <dl className="mt-12 grid max-w-[560px] grid-cols-3 sm:mt-16 border-t border-navy/10 pt-8">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col gap-2 ${i > 0 ? "border-l border-navy/10 pl-4 sm:pl-6" : ""} ${i < 2 ? "pr-3 sm:pr-6" : ""}`}>
                  <dt className="order-2 text-[13px] font-medium text-slate-body">{s.label}</dt>
                  <dd className="order-1 font-serif text-3xl font-bold leading-none sm:text-[44px]">
                    <CountUp value={Number(s.value)} />
                    <span className="text-gold">{s.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Pre-composed hero visual (photo + gold/navy shapes baked into the image) */}
          <div className="hero-img mx-auto w-full max-w-[560px] lg:col-span-6 lg:max-w-none">
            <Image
              src="/images/founder-hero-new.jpg"
              alt="CA Ashwini Singh, founder, in a tailored dark blazer in a sunlit office"
              width={968}
              height={1156}
              priority
              sizes="(min-width: 1024px) 600px, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section aria-label="Who we serve" className="border-y border-navy/10 bg-white">
        <div data-stagger className="wrap flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-6 sm:justify-between sm:gap-x-8 sm:py-7">
          <span className="w-full text-center text-xs font-semibold tracking-[0.24em] text-gold-ink sm:w-auto">WE SERVE</span>
          {clientele.map((c, i) => (
            <span key={c} className="flex items-center gap-8 text-[17px] font-semibold">
              {c}
              {i < clientele.length - 1 && <span aria-hidden="true" className="hidden h-[5px] w-[5px] rounded-full bg-gold sm:block" />}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
