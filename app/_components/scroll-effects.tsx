"use client";

import { useEffect } from "react";

/**
 * Drives the scroll-progress bar and the header shadow.
 * It only touches `#scroll-progress` and `#site-header` (both in the layout);
 * page content is never modified here, so hydration stays clean.
 */
export function ScrollEffects() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const header = document.getElementById("site-header");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        header?.toggleAttribute("data-scrolled", window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
