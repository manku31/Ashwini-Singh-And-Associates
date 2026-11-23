"use client";

import { useEffect } from "react";

/**
 * Site-wide scroll behaviour (no dependencies):
 *  - fades/slides `[data-reveal]` elements and children of `[data-stagger]` into view
 *  - toggles `data-scrolled` on the header and drives the scroll-progress bar
 * Elements already on screen at load are never hidden, and nothing is hidden
 * if JS is off or the user prefers reduced motion.
 */
export function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- scroll progress + header state
    const bar = document.getElementById("scroll-progress");
    const header = document.getElementById("site-header");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;
        header?.toggleAttribute("data-scrolled", window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- reveal on scroll
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      const targets: HTMLElement[] = [];
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => targets.push(el));
      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
        Array.from(parent.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 8) * 90}ms`);
          targets.push(child as HTMLElement);
        });
      });

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.remove("reveal-pending");
              e.target.classList.add("reveal-done");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );

      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) return; // already visible
        el.classList.add("reveal-pending");
        io!.observe(el);
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return null;
}
