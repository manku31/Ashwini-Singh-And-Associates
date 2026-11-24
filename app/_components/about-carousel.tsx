"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/founder-speaking.jpg", alt: "CA Ashwini Singh addressing a professional gathering", pos: "object-[40%_50%]" },
  { src: "/images/about-office.jpg", alt: "Ashwini Santosh Singh seated in her office", pos: "object-[50%_30%]" },
  { src: "/images/about-trio.jpg", alt: "Ashwini Santosh Singh with the senior team members in the office", pos: "object-[50%_35%]" },
  { src: "/images/about-team.jpg", alt: "The Ashwini Singh and Associates team together in the office", pos: "object-[50%_30%]" },
];

/** Fading image carousel: auto-advances, pauses on hover/focus, and has dot controls. */
export function AboutCarousel({ interval = 4500 }: { interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [paused, interval]);

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded bg-[#d5c8b1] shadow-[0_30px_60px_-34px_rgba(15,23,42,0.45)]"
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos of the firm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, n) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="(min-width: 1024px) 560px, 90vw"
          priority={n === 0}
          aria-hidden={n !== i}
          className={`object-cover transition-opacity duration-700 ${s.pos} ${n === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute left-4 top-4 flex gap-2">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setI(n)}
            aria-label={`Show photo ${n + 1} of ${slides.length}`}
            aria-current={n === i}
            className={`h-1.5 rounded-full transition-all ${n === i ? "w-7 bg-gold" : "w-3 bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}
