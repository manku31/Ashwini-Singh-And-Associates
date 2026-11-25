import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getAdmin } from "@/lib/session";
import { MobileMenu } from "./mobile-menu";
import { NavLinks } from "./nav-links";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="group flex min-w-0 items-center gap-2.5 sm:gap-3.5" aria-hidden="true">
      {/* ICAI "CA India" mark */}
      <span className={`flex shrink-0 items-center transition-transform duration-300 group-hover:scale-105 ${dark ? "rounded-md bg-white px-2 py-1.5" : ""}`}>
        <Image src="/images/icai-logo.png" alt="" width={64} height={48} className="h-8 w-auto sm:h-10" priority />
      </span>
      {/* bold name + spaced gold descriptor */}
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={`text-[13px] font-bold tracking-tight min-[360px]:whitespace-nowrap min-[380px]:text-sm min-[400px]:text-[15px] sm:text-[17px] ${dark ? "text-white" : "text-navy"}`}>
          Ashwini Singh And Associates
        </span>
        <span className={`mt-0.5 whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[0.2em] sm:text-[9.5px] sm:tracking-[0.24em] ${dark ? "text-gold-light" : "text-gold-ink"}`}>
          Chartered Accountants
        </span>
      </span>
    </span>
  );
}

async function AdminLink() {
  if (!(await getAdmin())) return null;
  return (
    <Link
      href="/admin"
      className="inline-flex h-10 items-center gap-2 rounded-full border border-gold bg-white px-4 text-sm font-semibold text-gold-ink hover:bg-sand"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      Admin
    </Link>
  );
}

export function Header() {
  return (
    <header id="site-header" className="sticky top-0 z-40 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="wrap flex h-[68px] items-center justify-between gap-3 sm:h-[76px] sm:gap-6">
        <Link href="/" aria-label="Ashwini Singh and Associates — home" className="min-w-0">
          <Logo />
        </Link>

        <NavLinks />

        <div className="flex shrink-0 items-center gap-3">
        <Suspense fallback={null}>
          <AdminLink />
        </Suspense>

        {/* desktop-only: the wrapper (not the button) is what hides it on mobile */}
        <div className="hidden shrink-0 xl:block">
          <Link href="/contact" className="btn btn-gold !h-[44px] !px-[20px] !text-sm whitespace-nowrap">
            Book a Consultation
          </Link>
        </div>

        <MobileMenu />
        </div>
      </div>
    </header>
  );
}
