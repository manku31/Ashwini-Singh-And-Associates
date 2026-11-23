"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "../data";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation with the current page highlighted. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 text-[14.5px] font-medium lg:flex xl:gap-10">
      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isActive(pathname, item.href) ? "page" : undefined}
          className="nav-link px-0.5 py-2.5 text-slate-body hover:text-gold-ink"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
