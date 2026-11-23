import Image from "next/image";
import { values } from "../data";

export function About() {
  return (
    <section id="about" className="wrap scroll-mt-24 py-24 lg:py-32">
      <div className="grid items-center gap-20 lg:grid-cols-12 lg:gap-6">
        <div data-reveal className="relative h-[480px] lg:col-span-5 lg:h-[600px]">
          <div aria-hidden="true" className="absolute -left-4 -top-4 h-[70%] w-[70%] rounded-sm border border-gold/50 lg:-left-6 lg:-top-6" />
          <div className="absolute inset-0 overflow-hidden rounded bg-[#d5c8b1] shadow-[0_30px_60px_-34px_rgba(15,23,42,0.45)]">
            <Image
              src="/images/founder-speaking.jpg"
              alt="CA Aswani Singh addressing a professional gathering"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover object-[40%_50%]"
            />
          </div>
          <div className="absolute -bottom-6 right-4 w-[220px] rounded-md bg-navy p-6 text-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.6)] lg:-right-10 lg:bottom-12">
            <span className="block font-serif text-[44px] font-medium leading-none text-gold-light">
              15<span className="italic">+</span>
            </span>
            <span className="mt-2.5 block text-[13px] leading-normal text-white/80">years advising families and businesses</span>
          </div>
        </div>

        <div data-reveal className="flex flex-col lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6">About the firm</p>
          <h2 className="h2">A partner-led practice built on diligence</h2>
          <p className="mt-7 text-lg leading-[1.7] text-slate-body">
            Aswani Singh &amp; Associates brings big-firm rigour with the attention of a boutique practice. Every engagement is led personally by our founder, so you work directly with the person accountable for your numbers.
          </p>
          <p className="mt-4 text-lg leading-[1.7] text-slate-body">
            From first-time founders to established enterprises, we help clients stay compliant, make sound financial decisions and grow with confidence.
          </p>
          <div className="mt-9 flex items-center gap-5 border-y border-navy/10 py-5">
            <Image
              src="/images/founder-portrait.jpg"
              alt="Portrait of CA Aswani Singh"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border border-gold/50 object-cover object-[50%_25%]"
            />
            <span className="font-serif text-3xl font-medium italic">Aswani Singh</span>
            <span className="flex flex-col gap-1">
              <span className="text-sm font-bold">CA Aswani Singh, Founder</span>
              <span className="text-[13px] text-slate-body">[Credentials — e.g. FCA, DISA (ICAI)]</span>
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
          <div className="mt-10">
            <a href="#contact" className="btn btn-outline !h-[52px]">
              More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
