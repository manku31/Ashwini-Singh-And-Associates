import Image from "next/image";
import Link from "next/link";
import { values } from "../data";
import { AboutCarousel } from "./about-carousel";

export function About({ showMore = true }: { showMore?: boolean }) {
  return (
    <section id="about" className="wrap scroll-mt-24 py-16 sm:py-24 lg:py-32">
      <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="relative h-[400px] sm:h-[480px] lg:sticky lg:top-28 lg:col-span-5 lg:h-[640px]">
          <div aria-hidden="true" className="absolute -left-4 -top-4 h-[70%] w-[70%] rounded-sm border border-gold/50 lg:-left-6 lg:-top-6" />
          <AboutCarousel />
          <div className="absolute -bottom-6 right-4 z-10 w-[190px] rounded-md bg-navy p-5 sm:w-[220px] sm:p-6 text-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.6)] lg:-right-10 lg:bottom-12">
            <span className="block font-serif text-[44px] font-medium leading-none text-gold-light">
              8<span className="italic">+</span>
            </span>
            <span className="mt-2.5 block text-[13px] leading-normal text-white/80">years advising families and businesses</span>
          </div>
        </div>

        <div data-reveal className="flex flex-col lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6">About the firm</p>
          <h2 className="h2 !text-[clamp(28px,3.2vw,40px)] !leading-[1.15]">A modern CA firm with today&rsquo;s technology and timeless precision</h2>
          <p className="mt-6 text-base leading-[1.75] text-slate-body sm:text-[17px]">
            Since 2019, Ashwini Singh And Associates, is an ICAI-registered Chartered Accountancy practice founded on the belief that compliance should be a strategic advantage, not a last-minute scramble. Led by proprietor CA Ashwini Santosh Singh, the firm started with a handful of businesses and a simple promise: never miss a deadline, never overcharge, and always explain the &lsquo;why&rsquo;.
          </p>
          <p className="mt-4 text-base leading-[1.75] text-slate-body sm:text-[17px]">
            Eight years on, that promise still runs the firm. We now serve over 500 clients across India, from first-time founders registering their private limited company to established SMEs, foreign company subsidiaries and NRIs managing Indian income from abroad.
          </p>
          <p className="mt-4 text-base leading-[1.75] text-slate-body sm:text-[17px]">
            What has not changed is who does the work. Every return, audit and advisory note is owned by a qualified Chartered Accountant. We invest in technology to remove drudgery, but judgement &mdash; the part that actually protects you &mdash; stays firmly human.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-navy/10 py-5">
            <Image
              src="/images/founder-portrait.jpg"
              alt="Portrait of CA Ashwini Singh"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border border-gold/50 object-cover object-[50%_25%]"
            />
            <span className="flex flex-col">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-ink">Founder</span>
              <span className="mt-1 font-serif text-3xl font-medium italic leading-tight">Ashwini Santosh Singh</span>
              <span className="mt-1.5 text-[13px] text-slate-body">ACP · LLB · B.Com</span>
            </span>
          </div>
          <ul className="mt-9 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <li key={v.n} className="flex flex-col gap-2">
                <span className="font-serif text-[22px] text-gold-mid">{v.n}</span>
                <span className="text-base font-bold">{v.title}</span>
                <span className="text-sm leading-relaxed text-slate-body">{v.text}</span>
              </li>
            ))}
          </ul>
          {showMore && (
            <div className="mt-10">
              <Link href="/about" className="btn btn-outline !h-[52px]">
                More About Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
