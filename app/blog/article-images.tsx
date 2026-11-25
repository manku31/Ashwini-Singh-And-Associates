"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Img = { src: string; alt: string; caption?: string };

/** Adapts to the number of photos: 1 = wide figure, 2 = side by side, 3+ = feature + thumbnails. Click to enlarge. */
export function ArticleImages({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const n = images.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n)),
    [n],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const layout = n === 1 ? "" : "sm:grid-cols-2";

  return (
    <>
      <div className={`mt-8 grid gap-4 ${layout}`}>
        {images.map((img, i) => (
          <figure
            key={img.src + i}
            className={n >= 3 && i === 0 ? "sm:col-span-2" : ""}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Enlarge image: ${img.alt}`}
              className="thumb-wrap group relative block w-full cursor-zoom-in overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1200}
                height={750}
                sizes="(min-width:1024px) 60vw, 100vw"
                className={`thumb w-full object-cover ${n >= 3 && i === 0 ? "aspect-[2/1]" : n === 1 ? "aspect-[16/9]" : "aspect-[4/3]"}`}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Click to enlarge
              </span>
            </button>
            {img.caption && (
              <figcaption className="mt-2 text-sm italic text-slate-body">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4"
          onClick={close}
        >
          <figure
            className="max-h-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open].src}
              alt={images[open].alt}
              width={1200}
              height={750}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            {images[open].caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">
                {images[open].caption}
              </figcaption>
            )}
          </figure>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 h-10 w-10 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ×
          </button>
          {n > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous image"
                className="absolute left-4 h-11 w-11 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next image"
                className="absolute right-4 h-11 w-11 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
