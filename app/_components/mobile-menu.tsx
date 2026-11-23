"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { nav } from "../data";

/**
 * Full-screen mobile menu (< lg). Rendered through a portal so the header's
 * backdrop-blur can't trap it. Closes on link tap, Esc, or when the screen grows.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  // false during SSR/hydration, true on the client — the portal needs `document`
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock page scroll behind the menu
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={open ? "mobile-nav" : undefined}
        onClick={() => setOpen((o) => !o)}
        className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white/70 transition-colors hover:bg-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div id="mobile-nav" className="menu-sheet fixed inset-x-0 bottom-0 top-[68px] z-[45] overflow-y-auto bg-cream sm:top-[76px]">
            <nav aria-label="Mobile" className="wrap flex min-h-full flex-col pb-8 pt-4">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <li key={item.href} className="menu-item border-b border-navy/10" style={{ animationDelay: `${80 + i * 60}ms` }}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-5 active:bg-sand"
                    >
                      <span className="w-7 font-serif text-sm italic text-gold-mid">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 font-serif text-[28px] font-semibold leading-none text-navy">{item.label}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9C8047" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-active:translate-x-1">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="menu-item mt-auto pt-10" style={{ animationDelay: `${80 + nav.length * 60}ms` }}>
                <a href="#contact" onClick={() => setOpen(false)} className="btn btn-gold w-full">
                  Book a Consultation
                </a>
                <p className="mt-5 text-center text-xs tracking-[0.2em] text-gold-ink">CHARTERED ACCOUNTANTS · ADVISORS</p>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
