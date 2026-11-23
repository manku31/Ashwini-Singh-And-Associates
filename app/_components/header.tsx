import Image from "next/image";
import { nav } from "../data";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="group flex items-center gap-3.5" aria-hidden="true">
      {/* ICAI "CA India" mark */}
      <span className={`flex shrink-0 items-center transition-transform duration-300 group-hover:scale-105 ${dark ? "rounded-md bg-white px-2 py-1.5" : ""}`}>
        <Image src="/images/icai-logo.png" alt="" width={64} height={48} className="h-12 w-auto" priority />
      </span>
      {/* bold name + spaced gold descriptor */}
      <span className="flex flex-col leading-tight">
        <span className={`text-[17px] font-bold tracking-tight sm:text-xl ${dark ? "text-white" : "text-navy"}`}>
          Ashwini Singh and Associates
        </span>
        <span className={`mt-1 text-[11px] font-medium uppercase tracking-[0.28em] ${dark ? "text-gold-light" : "text-gold-ink"}`}>
          Chartered Accountants
        </span>
      </span>
    </span>
  );
}

export function Header() {
  return (
    <header id="site-header" className="sticky top-0 z-40 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="wrap flex h-[88px] items-center justify-between gap-6">
        <a href="#top" aria-label="Ashwini Singh and Associates — home">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 text-[14.5px] font-medium lg:flex">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={i === 0 ? "page" : undefined}
              className={`nav-link px-0.5 py-2.5 hover:text-gold-ink ${i === 0 ? "font-semibold text-navy" : "text-slate-body"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn-gold hidden !h-[46px] !px-[22px] !text-sm sm:inline-flex">
          Book a Consultation
        </a>

        {/* Mobile menu — no JS needed */}
        <details className="group relative lg:hidden">
          <summary
            aria-label="Open menu"
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-navy/20 [&::-webkit-details-marker]:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-14 flex w-64 flex-col rounded-lg border border-navy/10 bg-white p-2 shadow-xl"
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="rounded-md px-4 py-3 text-[15px] font-medium hover:bg-sand">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-gold mt-2 !h-12">
              Book a Consultation
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
