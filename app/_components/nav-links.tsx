"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, services } from "../data";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation with the current page highlighted and a Services dropdown. */
export function NavLinks() {
  const pathname = usePathname();
  // set after a dropdown link is clicked so the menu closes even while the pointer is still over it
  const [dismissed, setDismissed] = useState(false);

  const close = () => {
    setDismissed(true);
    (document.activeElement as HTMLElement | null)?.blur(); // otherwise :focus-within would keep it open
  };

  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 text-[14.5px] font-medium lg:flex xl:gap-10">
      {nav.map((item) =>
        item.href === "/services" ? (
          <div key={item.href} className="group relative" onMouseLeave={() => setDismissed(false)}>
            <Link
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              aria-haspopup="true"
              className="nav-link inline-flex items-center gap-1 px-0.5 py-2.5 text-slate-body hover:text-gold-ink"
            >
              {item.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>
            <div
              className={`absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-3 transition duration-200 ${
                dismissed
                  ? "pointer-events-none invisible translate-y-1 opacity-0"
                  : "pointer-events-none invisible translate-y-1 opacity-0 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              <ul className="overflow-hidden rounded-md border border-navy/10 bg-white py-2 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.35)]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={close}
                      className="flex items-center justify-between gap-3 px-5 py-2.5 text-[14px] text-navy transition-colors hover:bg-cream hover:text-gold-ink"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-navy/10 pt-1">
                  <Link
                    href="/services"
                    onClick={close}
                    className="block px-5 py-2.5 text-[13px] font-semibold text-gold-ink hover:bg-cream"
                  >
                    View all services →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            className="nav-link px-0.5 py-2.5 text-slate-body hover:text-gold-ink"
          >
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}
